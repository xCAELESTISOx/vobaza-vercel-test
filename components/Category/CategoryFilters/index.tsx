import { useEffect, useRef, useState } from 'react';

import type { Dispatch, FC, SetStateAction } from 'react';
import type { IFilterFront, ITagFitlerFront } from '../../../src/models/IFilter';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { ICategoryTag } from 'assets/api/modules/categories';
import { GoodsSortTypes } from 'src/models/IGood';
import { useAdvancedRouter } from 'assets/utils/useAdvancedRouter';
import { useToggle } from 'src/hooks/useToggle';
import { useSelector } from 'src/hooks/useSelector';

import CategoryCurrentFilters from './CategoryCurrentFilters';
import CategoryFiltersList from './FiltersList';
import FiltersModal from './Modal';

const getQueryFromFilters = (filters: (IFilterFront | ITagFitlerFront)[]) => {
  const queryFilters: { [key: string]: string | string[] } = {};
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
  currentTags: ICategoryTag[];
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
};

const CategoryFilters: FC<Props> = ({ categorySlug, isLoading, currentTags, setIsLoading }) => {
  const { router, replaceRouterQuery } = useAdvancedRouter();
  const { page, id, sort, text, city, ...activeFilters } = router.query;

  const baseFilters = useSelector((state) => state.filters.baseFilters);
  const filters = useSelector((state) => state.filters.filters);
  const currentFilters = useSelector((state) => state.filters.currentFilters);

  const hasInvalidFilters = useSelector((state) => state.filters.hasInvalidFilters);

  const [isMenuOpen, toggleMenu] = useToggle(false);
  const [currentSort, setCurrentSort] = useState<Variant<keyof typeof GoodsSortTypes>>({
    code: 'POPULARITY',
    value: GoodsSortTypes.POPULARITY,
  });

  const isInitialized = useRef(false);

  //Sort
  const setSort = (value: Variant<keyof typeof GoodsSortTypes>) => {
    setIsLoading(true);
    setCurrentSort(value);

    if (value.code !== 'POPULARITY') {
      replaceRouterQuery({ sort: value.code }, ['page']);
    } else {
      replaceRouterQuery({}, ['page', 'sort']);
    }
  };

  /** Добавление фильтра в query параметры урла. Оттуда их достает NEXT и выдает currentFilters */
  const addFilter = (filter: IFilterFront) => {
    setIsLoading(true);

    let href = router.asPath.split('?')[0];
    const query = { ...router.query };
    const { queryFilters, excludeFilterId } = getQueryFromFilters([filter]);
    ['page', 'city', 'id', excludeFilterId].forEach((item) => delete query[item]);

    // Если фильтр относится к тегам, помимо фильтра включаем соответствующий тег
    if (currentFilters && currentFilters[filter.id]?.tag_slug) {
      currentTags.forEach((tag, index) => {
        if (tag.slug === currentFilters[filter.id].tag_slug) {
          const excludingTags = currentTags.splice(index);
          excludingTags.forEach(({ slug }) => {
            href = href.replace('/' + slug, '');
          });
        }
      });
    }
    //

    const newQuery = { ...(!hasInvalidFilters && query), ...queryFilters };

    router.push({ pathname: href, query: newQuery }, undefined, {
      scroll: false,
    });
  };

  // Удаляет фильтр целиком, либо одно из значений фильтра
  const removeFilter = ({ id, tag_slug }: IFilterFront, value?: string) => {
    if (tag_slug) {
      let href = router.asPath;

      currentTags.forEach((tag, index) => {
        if (tag.slug === tag_slug) {
          const excludingTags = currentTags.splice(index);
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

  // Очистка всех фильтровы
  const removeAllFilters = () => {
    setIsLoading(true);
    const excludeFilters = Object.keys(activeFilters);
    if (router.query.id) replaceRouterQuery({}, excludeFilters);
  };

  useEffect(() => {
    // Очистка фильтров при изменении категории
    if (isInitialized.current) removeAllFilters();
  }, [categorySlug]);

  useEffect(() => {
    isInitialized.current = true;

    return () => {
      isInitialized.current = false;
    };
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
