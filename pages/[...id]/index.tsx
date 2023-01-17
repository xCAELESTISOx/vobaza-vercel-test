import { useEffect, useState, useRef } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';

import type { ITag, ITagFitlerFront } from 'entities/tags';
import type { ICategory } from '../../entities/categories/model/ICategory';
import type { IFilter, IFilterFront, IFilterMeta } from '../../entities/filters/model/IFilter';
import { getActiveFiltersFromQuery } from 'shared/lib/categories/filters/getActiveFiltersFromQuery';
import { getCategoryBreadcrumps } from 'shared/lib/categories/getCategoryBreadcrumps';
import { getParamsFromQuery } from 'shared/lib/categories/getParamsFromQuery';
import { getProductsList } from 'shared/lib/products/getProductsList';
import { getTagsByUrl } from 'shared/lib/categories/getTagsByUrl';
import { formatAxiosError } from 'shared/lib/formatAxiosError';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { useSelector } from 'shared/lib/hooks/useSelector';

import Breadcrumbs from 'shared/ui/Breadcrumbs';

import { markTagsAsInvalid, resetTags, setCurrentTags, setTags } from 'src/store/tags';
import { setBaseFilters, setFilters, setCurrentFilters, markFiltersAsInvalid, resetFilters } from 'src/store/filters';

import { GoodsBlock } from '../../templates/GoodsBlock';
import { CategoryHeader } from 'widgets/categories';

import styles from 'app/styles/Home.module.scss';
import { api } from '../../app/api';

const getFlatTagsFilters = (tags: ITag[] = []) => {
  return tags.reduce((acc, tagItem) => {
    return [...acc, ...tagItem.filters];
  }, [] as ITagFitlerFront[]);
};

const convertFiltersIfPrice = (filters: IFilter[] = []) => {
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
  tags: ITag[];
  /** Базовые фильтры без учета примененных */
  baseFilters: IFilter[];
  currentTags: ITag[];
  /** Примененные фильтры */
  currentFilters: Record<number, IFilterFront> | null;
  params: Record<string, string | number | boolean | string[]>;
  filtersMeta: IFilterMeta;
}

const LIMIT = 40;

export default function Catalog({
  hasInvalidFilters,
  hasInvalidTags,
  category,
  filters,
  tags,
  currentFilters,
  currentTags,
  baseFilters,
  params,
  filtersMeta,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const initialCity = useRef(null);
  const isInitialRender = useRef(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const city = useSelector((state) => state.auth.city);

  const isExpress = router.asPath.includes('/ekspress-dostavka');
  const breadcrumbs = getCategoryBreadcrumps([...category.ancestors, category], currentTags, isExpress);
  const currentTag = currentTags[currentTags?.length - 1] || null;

  const getProducts = async () => {
    setIsLoading(true);

    setProducts([]);
    const { products, meta, withError } = await getProductsList(params, currentTags);
    hasInvalidFilters = withError;

    setProducts(products);
    setMeta(meta);

    setIsLoading(false);
  };

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  useEffect(() => {
    dispatch(setTags(tags));
    dispatch(setCurrentTags(currentTags));
    if (hasInvalidTags) dispatch(markTagsAsInvalid());

    return () => {
      dispatch(resetTags());
    };
  }, [tags]);

  useEffect(() => {
    getProducts();
  }, [params]);

  useEffect(() => {
    if (!isInitialRender.current && initialCity.current !== city && currentFilters) {
      router.replace(router.asPath);
      initialCity.current = city;
    }
  }, [city]);

  useEffect(() => {
    dispatch(setBaseFilters(baseFilters));
    dispatch(setFilters(filters));
    dispatch(setCurrentFilters(currentFilters));

    if (hasInvalidFilters) dispatch(markFiltersAsInvalid());

    return () => {
      dispatch(resetFilters());
    };
  }, [filters]);

  return (
    <>
      <Head>
        {(filtersMeta.title || category.seo_title || currentTag?.title) && (
          <title>{filtersMeta.title || currentTag?.title || category.seo_title}</title>
        )}
        {(filtersMeta.keywords || category.keywords || currentTag?.keywords) && (
          <meta name="keywords" content={filtersMeta.keywords || currentTag?.keywords || category.keywords} />
        )}
        {(filtersMeta.description || category.seo_description || currentTag?.description) && (
          <meta
            name="description"
            content={filtersMeta.description || currentTag?.description || category.seo_description}
          />
        )}
      </Head>
      <div className={styles.page}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <section>
          <div className="container container--for-cards">
            <CategoryHeader
              category={category}
              currentTag={currentTag}
              isExpress={isExpress}
              filtersTitle={filtersMeta.h1}
            />
            <GoodsBlock
              withFilters={Boolean(filters)}
              categorySlug={category.slug}
              isExpress={isExpress}
              isListLoading={isLoading}
              goods={products}
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ res, resolvedUrl, query }) => {
  const { page, id, sort, city, ...activeFilters } = query;
  const activeQueryFilters = { ...activeFilters };
  let category: ICategory;
  let tags: ITag[] = [];
  let activeTags: ITag[] = [];
  let withInvalidTags = false;

  let baseFilters: IFilter[] = [];
  let filters: IFilter[] = [];
  let currentFilters: Record<number, IFilterFront> | null = null;
  let hasInvalidFilters = false;
  const filtersMeta: IFilterMeta = {
    h1: '',
    title: '',
    description: '',
    keywords: '',
  };

  const isExpress = resolvedUrl.includes('/ekspress-dostavka');
  const initialParams = {
    limit: LIMIT,
    offset: page ? (Number(page) - 1) * LIMIT : 0,
    format: 'PUBLIC_LIST',
    ...(sort && { sort }),
    ...(isExpress && { 'filter[label]': 'EXPRESS-DELIVERY' }),
  };

  let params: Record<string, string | number | boolean | string[]> = initialParams;

  const tagsQueryFilters: { [key: string]: string | string[] } = {};

  res.setHeader('Cache-Control', 'public, max-age=180, immutable');

  // Получение категории и тегов товаров
  try {
    const categoryRes = await api.getCategoryByPath(resolvedUrl.split('?')[0].replace('/ekspress-dostavka', ''));
    category = categoryRes.data.data;
    initialParams['filter[category_id]'] = category.id;
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

  try {
    const { data: tagsData } = await api.getCategoryTags(category.id);

    tags = tagsData.data;

    // Получить по урлу массив всех активных тегов и уровень активных тегов
    const { currentTags, hasInvalidTags } = getTagsByUrl(resolvedUrl, tags, [
      ...category.ancestors.map((i) => i.slug),
      category.slug,
    ]);
    activeTags = currentTags;

    withInvalidTags = hasInvalidTags;

    const tagFilters = getFlatTagsFilters(currentTags);
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
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const text = formatAxiosError(err);
      console.error(text);
    } else {
      console.error('Error has occured:', err);
    }
    if (err.response?.status != 500) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  params = getParamsFromQuery(params, activeQueryFilters);

  try {
    const paramsFromQuery = getParamsFromQuery(params, activeQueryFilters);
    const location: string = typeof city === 'string' ? city : 'Москва';
    const [baseFiltersRes, filtersRes] = await Promise.all([
      api.getCategoryFilters(category.id),
      api.getCategoryFilters(category.id, location, paramsFromQuery),
    ]);

    // const baseFiltersRes = await api.getCategoryFilters(category.id);
    baseFilters = convertFiltersIfPrice(baseFiltersRes.data.data);
    // const filtersRes = await api.getCategoryFilters(category.id, getParamsFromQuery(params, activeQueryFilters));
    filters = convertFiltersIfPrice(filtersRes.data.data);

    filtersMeta.h1 = filtersRes.data.meta?.h1 || '';
    filtersMeta.title = filtersRes.data.meta?.title || '';
    filtersMeta.description = filtersRes.data.meta?.description || '';
    filtersMeta.keywords = filtersRes.data.meta?.keywords || '';

    // Переводит в рубли цены в сео
    Object.keys(filtersMeta).forEach((key) => {
      let min = '';
      let max = '';
      // Ищется строка цена - от <digits> до <digits>
      const priceStr = (filtersMeta[key].match(/цена - от (\d+) до (\d+)/g) || [''])[0];
      // В строках ищутся числовые строки min и max
      if (priceStr) {
        min = (priceStr.match(/от (\d+)/g) || [''])[0].replace(/[^0-9]+/g, '');
        max = (priceStr.match(/до (\d+)/g) || [''])[0].replace(/[^0-9]+/g, '');
      }
      // Заменяем всю строку цена - от <digits> до <digits> на новую
      if (min && max) filtersMeta[key] = filtersMeta[key].replace(priceStr, `цена - от ${+min / 100} до ${+max / 100}`);
    });

    const { activeFilters: newActiveFilters, hasInvalidFilters: newHasInvalidFilters } = getActiveFiltersFromQuery(
      activeFilters,
      filters
    );

    currentFilters = newActiveFilters;
    hasInvalidFilters = newHasInvalidFilters;

    // filters = filters.filter((filter) => !activeTags.some((tag) => tag.filter.id === filter.id));
    filters = filters.filter(
      (filter) => !getFlatTagsFilters(activeTags).some((tagFilter) => tagFilter.id === filter.id)
    );
  } catch (error) {
    hasInvalidFilters = true;
  }

  if (hasInvalidFilters) {
    params = getParamsFromQuery(initialParams, tagsQueryFilters);
    currentFilters = null;
    filters = baseFilters;
  }

  return {
    props: {
      category,
      filters,
      baseFilters,
      currentFilters,
      currentTags: activeTags,
      tags,
      hasInvalidTags: withInvalidTags,
      hasInvalidFilters,
      params,
      filtersMeta,
    },
  };
};
