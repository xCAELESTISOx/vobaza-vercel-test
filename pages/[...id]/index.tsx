import { useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import type { ICategoryTag } from 'src/models/ICategoryTag';
import type { ICategory } from '../../src/models/ICategory';
import type { IGoodCard } from '../../src/models/IGood';
import type { IFilter, IFilterFront } from '../../src/models/IFilter';
import normalizeGoods from '../../assets/utils/normalizers/normalizeGoods';
import { getActiveFiltersFromQuery } from 'assets/utils/Category/filters/getActiveFiltersFromQuery';
import { getCategoryBreadcrumps } from 'assets/utils/Category/getCategoryBreadcrumps';
import { getParamsFromQuery } from 'assets/utils/Category/getParamsFromQuery';
import { getTagsByUrl } from 'assets/utils/Category/getTagsByUrl';
import { useDispatch } from 'src/hooks/useDispatch';

import { markTagsAsInvalid, resetTags, setCurrentTags, setTags } from 'src/store/tags';
import { setBaseFilters, setFilters, setCurrentFilters, markFiltersAsInvalid, resetFilters } from 'src/store/filters';

import Breadcrumbs from '../../components/Layout/Breadcrumbs';
import { GoodsBlock } from '../../components/Goods/GoodsBlock';
import CategoryHead from 'components/Category/CategoryHead';

import styles from '../../styles/Home.module.scss';
import { api } from '../../assets/api';

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
  hasInvalidFilters: boolean;
  hasInvalidTags: boolean;
  category: ICategory;
  filters: IFilter[];
  goods: IGoodCard[];
  tags: ICategoryTag[];
  baseFilters: IFilter[];
  currentTags: ICategoryTag[];
  currentFilters: Record<number, IFilterFront>;
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
}

const LIMIT = 40;

export default function Catalog({
  hasInvalidFilters,
  hasInvalidTags,
  category,
  filters,
  goods,
  tags,
  currentFilters,
  currentTags,
  baseFilters,
  meta,
}: Props) {
  const dispatch = useDispatch();

  const router = useRouter();

  const isExpress = router.asPath.includes('/ekspress-dostavka');
  const breadcrumbs = getCategoryBreadcrumps([...category.ancestors, category], currentTags, isExpress);
  const currentTag = currentTags[currentTags.length - 1] || null;

  useEffect(() => {
    dispatch(setBaseFilters(baseFilters));
    dispatch(setFilters(filters));
    dispatch(setCurrentFilters(currentFilters));
    if (hasInvalidFilters) dispatch(markFiltersAsInvalid());

    return () => {
      dispatch(resetFilters());
    };
  }, [filters]);

  useEffect(() => {
    dispatch(setTags(tags));
    dispatch(setCurrentTags(currentTags));
    if (hasInvalidTags) dispatch(markTagsAsInvalid());

    return () => {
      dispatch(resetTags());
    };
  }, [tags]);

  return (
    <>
      <Head>
        {category.seo_title && <title>{currentTag?.title || category.seo_title}</title>}
        {category.keywords && <meta name="keywords" content={currentTag?.keywords || category.keywords} />}
        {category.seo_description && (
          <meta name="description" content={currentTag?.description || category.seo_description} />
        )}
      </Head>
      <div className={styles.page}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <section>
          <div className="container container--for-cards">
            <CategoryHead category={category} currentTag={currentTag} isExpress={isExpress} />
            <GoodsBlock
              withFilters={Boolean(filters)}
              categorySlug={category.slug}
              isExpress={isExpress}
              goods={goods}
              meta={meta}
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ resolvedUrl, query }) => {
  const { page, id, sort, city, ...activeFilters } = query;
  const activeQueryFilters = { ...activeFilters };

  const isExpress = resolvedUrl.indexOf('/ekspress-dostavka') !== -1;

  try {
    const categoryRes = await api.getCategoryByPath(resolvedUrl.split('?')[0].replace('/ekspress-dostavka', ''));
    const category: ICategory = categoryRes.data.data;

    const { data: tagsData } = await api.getCategoryTags(category.id);
    const tags: ICategoryTag[] = tagsData.data;

    // Получить по урлу массив всех активных тегов и уровень активных тегов
    const { currentTags, hasInvalidTags } = getTagsByUrl(resolvedUrl, tags, [
      ...category.ancestors.map((i) => i.slug),
      category.slug,
    ]);

    const tagFilters = currentTags.map(({ filter }) => filter);
    tagFilters.forEach((filter) => {
      let value: string | string[] = filter.values as string[];

      if (filter.type === 'NUMERIC_RANGE') {
        value = `${filter.min}%-%${filter.max}`;
      }

      if (filter.value_type === 'PRICE') {
        filter.min = filter.min / 100;
        filter.max = filter.max / 100;
      }

      activeQueryFilters[filter.id] = value;
    });

    // Формирование параметров для получения товаров и фильтров
    const initialParams = {
      limit: LIMIT,
      offset: page ? (Number(page) - 1) * LIMIT : 0,
      format: 'PUBLIC_LIST',
      'filter[category_id]': category.id,
      sort: sort || undefined,
      ...(isExpress && { 'filter[label]': 'EXPRESS-DELIVERY' }),
    };
    const params = getParamsFromQuery(initialParams, activeQueryFilters);
    //

    const [goodsRes, filtersRes, baseFiltersRes] = await Promise.all([
      api.getGoods(params),
      api.getCategoryFilters(category.id, params),
      api.getCategoryFilters(category.id),
    ]);

    const goods = normalizeGoods(goodsRes.data.data);
    let filters = convertFiltersIfPrice(filtersRes.data.data);
    const baseFilters = convertFiltersIfPrice(baseFiltersRes.data.data);
    const { meta } = goodsRes.data;

    const { activeFilters: currentFilters, hasInvalidFilters } = getActiveFiltersFromQuery(activeFilters, filters);

    filters = filters.filter((filter) => !currentTags.some((tag) => tag.filter.id === filter.id));

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
        hasInvalidTags,
        hasInvalidFilters,
      },
    };
  } catch (error) {
    console.error('Error has occured:', error.request?.res, error.response?.data, error.response?.status);
    // console.error(error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
