import { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Cookies from 'js-cookie';

import type { ITag, ITagFitlerFront } from 'entities/tags';
import type { ICategory } from '../../entities/categories/model/ICategory';
import type { IGood } from 'entities/products/model/IGood';
import type { IFilter, IFilterFront } from '../../entities/filters/model/IFilter';
import { getActiveFiltersFromQuery } from 'shared/lib/categories/filters/getActiveFiltersFromQuery';
import { getCategoryBreadcrumps } from 'shared/lib/categories/getCategoryBreadcrumps';
import { getParamsFromQuery } from 'shared/lib/categories/getParamsFromQuery';
import { getProductsList } from 'shared/lib/products/getProductsList';
import { getTagsByUrl } from 'shared/lib/categories/getTagsByUrl';
import { formatAxiosError } from 'shared/lib/formatAxiosError';
import { useDispatch } from 'shared/lib/hooks/useDispatch';

import Breadcrumbs from 'shared/ui/Breadcrumbs';

import { markTagsAsInvalid, resetTags, setCurrentTags, setTags } from 'src/store/tags';
import { setBaseFilters, setFilters, setCurrentFilters, markFiltersAsInvalid, resetFilters } from 'src/store/filters';

import { GoodsBlock } from '../../templates/GoodsBlock';
import { CategoryHeader } from 'widgets/categories';

import styles from 'app/styles/Home.module.scss';
import { dadataApi } from 'app/api/dadata';
import { api } from '../../app/api';

const getFlatTagsFilters = (tags: ITag[]) => {
  return tags.reduce((acc, tagItem) => {
    return [...acc, ...tagItem.filters];
  }, [] as ITagFitlerFront[]);
};

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
  tags: ITag[];
  /** Базовые фильтры без учета примененных */
  baseFilters: IFilter[];
  currentTags: ITag[];
  /** Примененные фильтры */
  currentFilters: Record<number, IFilterFront> | null;
  params: Record<string, string | number | boolean | string[]>;
  backMeta: {
    list: {
      count: number;
      pages_count: number;
    };
    seo: {
      [key: string]: string;
    };
  };
  backProducts: IGood[];
  backErrors: boolean;
  isNeedSeoChange: boolean;
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
  backMeta,
  backProducts,
  backErrors,
  isNeedSeoChange,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);

  const dispatch = useDispatch();

  const router = useRouter();

  const isExpress = router.asPath.includes('/ekspress-dostavka');
  const breadcrumbs = getCategoryBreadcrumps([...category.ancestors, category], currentTags, isExpress);
  const currentTag = currentTags[currentTags.length - 1] || null;
  const filtersTitle = isNeedSeoChange ? backMeta.seo?.title : '';
  const filtersDescription = isNeedSeoChange ? backMeta.seo?.description : '';
  const filtersKeywords = isNeedSeoChange ? backMeta.seo?.keywords : '';
  const filtersH1 = isNeedSeoChange ? backMeta.seo?.h1 : '';

  const getProducts = async () => {
    setIsLoading(true);

    setProducts([]);
    hasInvalidFilters = backErrors;

    setProducts(backProducts);
    setMeta(backMeta);

    setIsLoading(false);
  };

  const setSeoCookie = () => {
    Cookies.remove('isNeedSeoChange');
  }

  /** Кука проверяется на фронтовом беке и вставляет сео только при прямом (или первом) заходе на страницу или перезагрузке*/
  useEffect(() => {
    Cookies.set('isNeedSeoChange', 'false');
    window.addEventListener("beforeunload", setSeoCookie);
    return () => {
      window.removeEventListener("beforeunload", setSeoCookie);
    };
  }, [])

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
        {(filtersTitle || category.seo_title || currentTag?.title) && <title>{filtersTitle || currentTag?.title || category.seo_title}</title>}
        {(filtersKeywords || category.keywords || currentTag?.keywords) && (
          <meta name="keywords" content={filtersKeywords || currentTag?.keywords || category.keywords} />
        )}
        {(filtersDescription || category.seo_description || currentTag?.description) && (
          <meta name="description" content={filtersDescription || currentTag?.description || category.seo_description} />
        )}
      </Head>
      <div className={styles.page}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <section>
          <div className="container container--for-cards">
            <CategoryHeader category={category} currentTag={currentTag} isExpress={isExpress} filtersTitle={filtersH1} />
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, resolvedUrl, query }) => {
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
  let backMeta = null;
  let backProducts = [];
  let backErrors = false;
  let isNeedSeoChange = false;
  let location = '';

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
    const filtersFromQuery = getParamsFromQuery(params, activeQueryFilters)

    const [baseFiltersRes, filtersRes] = await Promise.all([
      api.getCategoryFilters(category.id),
      api.getCategoryFilters(category.id, filtersFromQuery),
    ]);

    // const baseFiltersRes = await api.getCategoryFilters(category.id);
    baseFilters = convertFiltersIfPrice(baseFiltersRes.data.data);
    // const filtersRes = await api.getCategoryFilters(category.id, getParamsFromQuery(params, activeQueryFilters));
    filters = convertFiltersIfPrice(filtersRes.data.data);

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

  /** Получение города */
  try {
    const res = await dadataApi.getAddressByIp();
    const json = await res.json();
    location = json.location?.data.city;

    params = { ...params, location };
  } catch (errpr) {
    location = 'Москва';
  }

  /** Получение списка продуктов и сео при примененных фильтрах */
  try {
    const { products, meta, withError } = await getProductsList(params, activeTags);

    backMeta = meta;
    backProducts = products;
    backErrors = withError;
  } catch (error) {
    backErrors = true;
  }

  /** Проверка куки для проверки необходимости изменения сео */
  try {
    const cookies: string | undefined = req?.headers?.cookie || '';
    const cookiesObj: { [key: string]: string } = cookies.split('; ').reduce((prev, current) => {
      const [name, ...value] = current.split('=');
      prev[name] = value.join('=');
      return prev;
    }, {});

    isNeedSeoChange = cookiesObj.isNeedSeoChange !== 'false' || !cookiesObj.isNeedSeoChange;
  } catch (error) {
    isNeedSeoChange = false;
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
      backMeta,
      backProducts,
      backErrors,
      isNeedSeoChange,
    },
  };
};
