import { useEffect, useRef, useState } from 'react';

import type { Dispatch, FC, SetStateAction } from 'react';
import type { IFilter, IFilterFront, ITagFitlerFront } from '../../../src/models/IFilter';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { ICategoryTag } from 'src/models/ICategoryTag';
import { GoodsSortTypes } from 'src/models/IGood';
import { useAdvancedRouter } from 'assets/utils/useAdvancedRouter';
import { useToggle } from 'src/hooks/useToggle';

import CategoryCurrentFilters from './CategoryCurrentFilters';
import CategoryFiltersList from './CategoryFiltersList';
import FiltersModal from './Modal';

const getQueryFromFilters = (filters: (IFilterFront | ITagFitlerFront)[]) => {
  let queryFilters: { [key: string]: string | string[] } = {};
  /** ID фильтра на случай, если при редактировании будет выбрано 0 вариантов */
  let excludeFilterId: number | null = null;

  filters.forEach((filter) => {
    if (filter.values && filter.values.length) {
      if (filter.type === 'NUMERIC_RANGE') {
        const multiplier = filter.value_type === 'PRICE' ? 100 : 1;
        const newValues = filter.values.map((i) => i * multiplier);
        queryFilters[filter.id] = `${newValues[0]}%-%${newValues[1]}`;
      } else {
        queryFilters[filter.id] = filter.values;
      }
    } else {
      excludeFilterId = filter.id;
    }
  });

  return { queryFilters, excludeFilterId };
};

type Props = {
  categorySlug?: string;
  isLoading: boolean;
  filters: IFilter[];
  baseFilters: IFilter[];
  currentTags: ICategoryTag[];
  currentFilters: { [key: number]: IFilterFront };
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
};

const CategoryFilters: FC<Props> = ({
  categorySlug,
  isLoading,
  filters,
  baseFilters,
  currentTags,
  currentFilters,
  setIsLoading,
}) => {
  const { router, replaceRouterQuery } = useAdvancedRouter();
  const { page, id, sort, text, city, ...activeFilters } = router.query;

  const [isMenuOpen, toggleMenu] = useToggle(false);
  const [currentSort, setCurrentSort] = useState({
    code: 'POPULARITY',
    value: GoodsSortTypes.POPULARITY as string,
  });

  const isInitialized = useRef(false);

  //Sort
  const setSort = (value: Variant<string>) => {
    setIsLoading(true);
    setCurrentSort(value);

    if (value.code !== 'POPULARITY') {
      replaceRouterQuery({ sort: value.code }, ['page']);
    } else {
      replaceRouterQuery({}, ['page', 'sort']);
    }
  };

  const addFilter = (filter: IFilterFront) => {
    setIsLoading(true);

    let href = router.asPath.split('?')[0];
    const query = { ...router.query };
    const { queryFilters, excludeFilterId } = getQueryFromFilters([filter]);
    ['page', 'city', 'id', excludeFilterId].forEach((item) => delete query[item]);

    if (currentFilters[filter.id]?.tag_slug) {
      currentTags.forEach((tag, index) => {
        if (tag.slug === currentFilters[filter.id].tag_slug) {
          let excludingTags = currentTags.splice(index);
          excludingTags.forEach(({ slug }) => {
            href = href.replace('/' + slug, '');
          });
        }
      });
    }

    router.push({ pathname: href, query: { ...query, ...queryFilters } }, undefined, { scroll: false });
  };

  // Удаляет фильтр целиком, либо одно из значений фильтра
  const removeFilter = ({ id, tag_slug }: IFilterFront, value?: string) => {
    if (tag_slug) {
      let href = router.asPath;

      currentTags.forEach((tag, index) => {
        if (tag.slug === tag_slug) {
          let excludingTags = currentTags.splice(index);
          excludingTags.forEach(({ slug }) => {
            href = href.replace('/' + slug, '');
          });
        }
      });

      router.push(href, undefined, { scroll: false });
    } else {
      let newValues = null;
      if (value) newValues = currentFilters[id].values.filter((item) => item !== value);

      if (newValues && newValues.length > 0) {
        replaceRouterQuery({ [id]: newValues }, ['page']);
      } else {
        replaceRouterQuery({}, ['page', id]);
      }
    }

    setIsLoading(true);
  };

  const removeAllFilters = () => {
    setIsLoading(true);
    const excludeFilters = Object.keys(activeFilters);
    if (router.query.id) replaceRouterQuery({}, excludeFilters);
  };

  useEffect(() => {
    if (isInitialized.current) removeAllFilters();
  }, [categorySlug]);

  useEffect(() => {
    isInitialized.current = true;
  }, []);

  return (
    <>
      <FiltersModal
        isOpen={isMenuOpen}
        filters={filters}
        baseFilters={baseFilters}
        currentFilters={currentFilters}
        close={toggleMenu}
        addFilter={addFilter}
        removeAllFilters={removeAllFilters}
      />
      <CategoryFiltersList
        filters={filters}
        baseFilters={baseFilters}
        currentSort={currentSort}
        currentFilters={currentFilters}
        toggleMenu={toggleMenu}
        setSort={setSort}
        addFilter={addFilter}
      />
      <CategoryCurrentFilters
        isLoading={isLoading}
        currentFilters={currentFilters}
        removeAllFilters={removeAllFilters}
        removeFilter={removeFilter}
      />
    </>
  );
};

export { CategoryFilters };
