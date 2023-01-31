import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { api } from 'app/api';
import axios from 'axios';
import { IFilter, IFilterFront, IFilterMeta } from 'entities/filters';
import type { ITag, ITagFitlerFront } from 'entities/tags';

import { getActiveFiltersFromQuery } from 'shared/lib/categories/filters/getActiveFiltersFromQuery';
import { getParamsFromQuery } from 'shared/lib/categories/getParamsFromQuery';
import { getTagsByUrl } from 'shared/lib/categories/getTagsByUrl';
import { formatAxiosError } from 'shared/lib/formatAxiosError';
import { ICategory } from '../model/ICategory';
import { ICategoryProps } from 'pages/[...id]';

const LIMIT = 40;

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

/** Получение SSR-пропсов страницы категории */
export const getCategoryProps = async ({
  res,
  resolvedUrl,
  query,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ICategoryProps>> => {
  const queryWithoutUtm = Object.fromEntries(
    Object.entries(query).filter(
      (item) => item[0] === 'sort' || item[0] === 'city' || item[0] === 'page' || item[0] === 'id' || !isNaN(+item[0])
    )
  );

  const { page, id, sort, city, ...activeFilters } = queryWithoutUtm;

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

      if (filter.type === 'NUMERIC_RANGE' && filter.value_type !== 'PRICE') {
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

    // paramsFromQuery = Object.fromEntries(
    //   Object.entries({ ...paramsFromQuery })?.filter(
    //     (item) => !item[0]?.includes('utm_') || !item[0]?.includes('_tm') || !item[0]?.includes('_c')
    //   )
    // );

    const location: string = typeof city === 'string' ? city : 'Москва';
    const [baseFiltersRes, filtersRes] = await Promise.all([
      api.getCategoryFilters(category.id),
      api.getCategoryFilters(category.id, location, paramsFromQuery),
    ]);

    // console.log(baseFiltersRes.data.data);

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
      if (min && max)
        filtersMeta[key] = filtersMeta[key].replace(priceStr, `цена - от ${+min / 100} ₽ до ${+max / 100} ₽`);
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
