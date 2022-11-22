import { useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';

import type { ICategoryTag } from 'assets/api/modules/categories';
import type { ICategory } from '../../src/models/ICategory';
import type { IGoodCard } from '../../src/models/IGood';
import type { IFilter, IFilterFront } from '../../src/models/IFilter';
import normalizeGoods from '../../assets/utils/normalizers/normalizeGoods';
import { getActiveFiltersFromQuery } from 'assets/utils/Category/filters/getActiveFiltersFromQuery';
import { getCategoryBreadcrumps } from 'assets/utils/Category/getCategoryBreadcrumps';
import { getParamsFromQuery } from 'assets/utils/Category/getParamsFromQuery';
import { getTagsByUrl } from 'assets/utils/Category/getTagsByUrl';
import { formatAxiosError } from 'assets/utils/formatAxiosError';
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
  /** Доступные фильтры */
  filters: IFilter[];
  goods: IGoodCard[];
  tags: ICategoryTag[];
  /** Базовые фильтры без учета примененных */
  baseFilters: IFilter[];
  currentTags: ICategoryTag[];
  /** Примененные фильтры */
  currentFilters: Record<number, IFilterFront> | null;
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
            {(category.description || currentTag?.description) && (
              <div
                className="seoText"
                dangerouslySetInnerHTML={{ __html: currentTag?.description || category.description }}
              />
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
  let category: ICategory;
  let tags: ICategoryTag[] = [];
  let activeTags: ICategoryTag[] = [];
  let withInvalidTags: boolean;

  let baseFilters: IFilter[] = [];
  let filters: IFilter[] = [];
  let currentFilters: Record<number, IFilterFront> | null = null;
  let hasInvalidFilters = false;

  const isExpress = resolvedUrl.includes('/ekspress-dostavka');
  const initialParams = {
    limit: LIMIT,
    offset: page ? (Number(page) - 1) * LIMIT : 0,
    format: 'PUBLIC_LIST',
    sort: sort || undefined,
    ...(isExpress && { 'filter[label]': 'EXPRESS-DELIVERY' }),
  };

  let params: Record<string, string | number | boolean | string[]> = initialParams;
  let goods: IGoodCard[] = [];
  let meta: any = {};

  const tagsQueryFilters: { [key: string]: string | string[] } = {};
  // Получение категории и тегов товаров
  try {
    const categoryRes = await api.getCategoryByPath(resolvedUrl.split('?')[0].replace('/ekspress-dostavka', ''));
    category = categoryRes.data.data;

    const { data: tagsData } = await api.getCategoryTags(category.id);
    tags = tagsData.data;

    initialParams['filter[category_id]'] = category.id;

    // Получить по урлу массив всех активных тегов и уровень активных тегов
    const { currentTags, hasInvalidTags } = getTagsByUrl(resolvedUrl, tags, [
      ...category.ancestors.map((i) => i.slug),
      category.slug,
    ]);
    activeTags = currentTags;
    withInvalidTags = hasInvalidTags;

    const tagFilters = currentTags.map(({ filter }) => filter);
    tagFilters.forEach((filter) => {
      let value: string | string[] = filter.values;

      if (filter.type === 'NUMERIC_RANGE') {
        value = `${filter.min}%-%${filter.max}`;
      }

      if (filter.value_type === 'PRICE') {
        value = `${filter.min * 100}%-%${(filter.max + 1) * 100}`;
        filter.min = filter.min / 100;
        filter.max = filter.max / 100;
      }

      tagsQueryFilters[filter.id] = value;
      activeQueryFilters[filter.id] = value;
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const text = formatAxiosError(error);
      console.error(text);
    } else {
      console.error('Error has occured:', error);
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  //

  params = getParamsFromQuery(params, activeQueryFilters);

  try {
    const baseFiltersRes = await api.getCategoryFilters(category.id);
    baseFilters = convertFiltersIfPrice(baseFiltersRes.data.data);

    const filtersRes = await api.getCategoryFilters(category.id, getParamsFromQuery(params, activeQueryFilters));
    filters = convertFiltersIfPrice(filtersRes.data.data);

    const { activeFilters: newActiveFilters, hasInvalidFilters: newHasInvalidFilters } = getActiveFiltersFromQuery(
      activeFilters,
      filters
    );
    currentFilters = newActiveFilters;
    hasInvalidFilters = newHasInvalidFilters;

    filters = filters.filter((filter) => !activeTags.some((tag) => tag.filter.id === filter.id));
  } catch (error) {
    hasInvalidFilters = true;
  }

  if (hasInvalidFilters) {
    params = getParamsFromQuery(initialParams, tagsQueryFilters);
    currentFilters = null;
    filters = baseFilters;
  }

  try {
    let goodsRes = await api.getGoods(params);
    if (!goodsRes.data.data.length) {
      if (activeTags.length > 1) {
        Object.keys(params).forEach((key) => {
          if (key.includes(`[filters][${activeTags.length - 1}]`)) {
            delete params[key];
          }
        });
        activeTags.splice(activeTags.length - 1, 1);
      } else {
        activeTags = [];
        params = initialParams;
      }
      hasInvalidFilters = true;
      goodsRes = await api.getGoods(params);
    }
    goods = normalizeGoods(goodsRes.data.data || []);

    meta = goodsRes.data.meta;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const text = formatAxiosError(error);
      console.error(text);
    } else {
      console.error('Error has occured:', error);
    }
  }

  return {
    props: {
      category,
      filters,
      baseFilters,
      currentFilters,
      currentTags: activeTags,
      goods,
      meta,
      tags,
      hasInvalidTags: withInvalidTags,
      hasInvalidFilters,
    },
  };
};
