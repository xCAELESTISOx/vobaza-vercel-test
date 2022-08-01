import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import type { ICategoryTag } from 'src/models/ICategoryTag';
import type { ICategory } from '../../src/models/ICategory';
import type { IGoodCard } from '../../src/models/IGood';
import type { IFilter, IFilterFront } from '../../src/models/IFilter';
import normalizeGoods from '../../assets/utils/normalizers/normalizeGoods';
import { getFiltersFromQuery } from 'assets/utils/Category/filters/getFiltersFromQuery';
import { getFiltersFromTags } from 'assets/utils/Category/filters/getFiltersFromTags';
import { getCategoryBreadcrumps } from 'assets/utils/Category/getCategoryBreadcrumps';
import { getParamsFromQuery } from 'assets/utils/Category/getParamsFromQuery';
import { getTagsByUrl } from 'assets/utils/Category/getTagsByUrl';

import Breadcrumbs from '../../components/Layout/Breadcrumbs';
import GoodsBlock from '../../components/Goods/GoodsBlock';
import CategoryHead from 'components/Category/CategoryHead';

import styles from '../../styles/Home.module.scss';
import { api } from '../../assets/api';

import { mockCategoryTags } from 'assets/mockData/mockCategoryTags';

const convertFiltersIfPrice = (filters: IFilter[]) => {
  return filters.map((filter) =>
    filter.value_type === 'PRICE'
      ? {
          ...filter,
          meta: {
            min: +(filter.meta.min / 100).toFixed(),
            max: +(filter.meta.max / 100).toFixed(),
          },
        }
      : filter
  );
};

interface Props {
  category: ICategory;
  filters: IFilter[];
  goods: IGoodCard[];
  tags: ICategoryTag[];
  baseFilters: IFilter[];
  currentTags: ICategoryTag[];
  currentFilters: { [key: number]: IFilterFront };
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
}

const LIMIT = 40;

export default function Catalog({
  category,
  filters,
  goods,
  tags,
  currentFilters,
  currentTags,
  baseFilters,
  meta,
}: Props) {
  const router = useRouter();

  const isExpress = router.asPath.indexOf('/ekspress-dostavka') !== -1;
  const breadcrumbs = getCategoryBreadcrumps([...category.ancestors, category], currentTags, isExpress);
  const currentTag = currentTags[currentTags.length - 1] || null;

  return (
    <>
      <Head>
        {category.seo_title && <title>{currentTag?.page_title || category.seo_title}</title>}
        {category.keywords && <meta name="keywords" content={currentTag?.keywords || category.keywords} />}
        {category.seo_description && (
          <meta name="description" content={currentTag?.description || category.seo_description} />
        )}
      </Head>
      <div className={styles.homePage}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <section>
          <div className="container">
            <CategoryHead category={category} currentTag={currentTag} isExpress={isExpress} />
            <GoodsBlock
              categorySlug={category.slug}
              currentFilters={currentFilters}
              isExpress={isExpress}
              filters={filters}
              tags={tags}
              baseFilters={baseFilters}
              goods={goods}
              meta={meta}
              currentTags={currentTags}
            />
            {category.description && (
              <div className="seoText" dangerouslySetInnerHTML={{ __html: category.description }} />
            )}
          </div>
        </section>
      </div>
    </>
  );
}

// TODO: Буквально весь этот кошмар необходимо переработать
export const getServerSideProps: GetServerSideProps<Props> = async ({ resolvedUrl, query }) => {
  let currentFilters: { [key: number]: IFilterFront } | null = null;

  const { page, id, sort, city, ...activeFilters } = query;
  const activeQueryFilters = { ...activeFilters };

  const isExpress = resolvedUrl.indexOf('/ekspress-dostavka') !== -1;

  try {
    const categoryRes = await api.getCategoryByPath(resolvedUrl.split('?')[0].replace('/ekspress-dostavka', ''));
    const category: ICategory = categoryRes.data.data;

    const { data: tagsData } = await api.getCategoryTags(category.id);
    // const tags: ICategoryTag[] = tagsData;
    const tags: ICategoryTag[] = resolvedUrl.includes('/pryamye_divany') ? mockCategoryTags : tagsData.data;

    // Получить по урлу массив всех активных тегов и уровень активных тегов
    const appliedTags = getTagsByUrl(resolvedUrl, tags, [...category.ancestors.map((i) => i.slug), category.slug]);
    const currentTags: ICategoryTag[] = appliedTags?.currentTags || [];
    const tagFilters = currentTags.map(({ filter }) => filter);

    tagFilters.forEach((filter) => {
      let value: string | string[] = filter.values as string[];
      if (filter.type === 'NUMERIC_RANGE') {
        let multiplier = filter.value_type === 'PRICE' ? 100 : 1;
        value = filter.values.map((i) => i * multiplier).join('%-%');
      }
      activeQueryFilters[filter.id] = value;
    });

    const initialParams = {
      limit: LIMIT,
      offset: page ? (Number(page) - 1) * LIMIT : 0,
      format: 'PUBLIC_LIST',
      'filter[category_id]': category.id,
      sort: sort || undefined,
      ...(isExpress && { 'filter[label]': 'EXPRESS-DELIVERY' }),
    };
    const params = getParamsFromQuery(initialParams, activeQueryFilters);

    const [goodsRes, filtersRes, baseFiltersRes] = await Promise.all([
      api.getGoods(params),
      api.getCategoryFilters(category.id, params),
      api.getCategoryFilters(category.id),
    ]);

    const goods: IGoodCard[] = normalizeGoods(goodsRes.data.data);
    const filters: IFilter[] = convertFiltersIfPrice(filtersRes.data.data);
    const baseFilters: IFilter[] = convertFiltersIfPrice(baseFiltersRes.data.data);
    const meta = goodsRes.data.meta;

    // Получение всех активных тегов
    if (Object.keys(activeQueryFilters).length && filters.length > 0) {
      currentFilters = getFiltersFromQuery(activeQueryFilters, filters);
    }
    const tagsFilters = getFiltersFromTags(currentTags, filters);
    currentFilters = { ...currentFilters, ...tagsFilters };

    // Добавление категорий и тегов в breadcrumps

    return {
      props: {
        category,
        filters,
        baseFilters,
        currentFilters,
        currentTags,
        goods,
        meta,
        tags,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
