import { useEffect, useRef, useState } from 'react';

import type { Dispatch, FC, SetStateAction } from 'react';
import type { IFilter, IFilterFront } from '../../../src/models/IFilter';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { ICategoryTag } from 'src/models/ICategoryTag';
import { GoodsSortTypes } from 'src/models/IGood';
import { useAdvancedRouter } from 'assets/utils/useAdvancedRouter';
import { getQueryFromFilters } from 'assets/utils/Category/filters/getQueryFromFilters';
import { useToggle } from 'src/hooks/useToggle';

import CategoryCurrentFilters from './CategoryCurrentFilters';
import CategoryFiltersList from './CategoryFiltersList';
import FiltersModal from './Modal';

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
    delete query['page'];
    delete query['city'];
    delete query['id'];
    delete query[excludeFilterId];

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
    const newFilters = { ...currentFilters };

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
      if (value) {
        newValues = newFilters[id].values.filter((item) => item !== value);
        if (newValues.length > 0) {
          newFilters[id] = {
            ...newFilters[id],
            values: newValues,
          };
        } else {
          delete newFilters[id];
        }
      } else {
        delete newFilters[id];
      }

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
