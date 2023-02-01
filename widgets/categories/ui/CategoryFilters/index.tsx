import { useEffect, useRef, useState } from 'react';

import type { Dispatch, FC, SetStateAction } from 'react';
import type { IFilterFront } from '../../../../entities/filters/model/IFilter';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { GoodsSortTypes } from 'entities/products/model/IGood';
import { useAdvancedRouter } from 'shared/lib/useAdvancedRouter';
import { useToggle } from 'shared/lib/hooks/useToggle';
import { useSelector } from 'shared/lib/hooks/useSelector';
import { getQueryFromFilters } from '../../../filters/lib/getQueryFromFilters';

import { CurrentFiltersList } from 'widgets/filters';
import { FiltersModal } from 'widgets/filters';
import { CategoryFiltersList } from '../FiltersList';

type Props = {
  categorySlug?: string;
  isLoading: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
};

const CategoryFilters: FC<Props> = ({ isLoading, setIsLoading }) => {
  const { router, replaceRouterQuery } = useAdvancedRouter();
  const { page, id, sort, text, city, ...activeFilters } = router.query;

  const baseFilters = useSelector((state) => state.filters.baseFilters);
  const filters = useSelector((state) => state.filters.filters);
  const currentFilters = useSelector((state) => state.filters.currentFilters);
  const currentTags = useSelector((state) => state.tags.currentTags);

  const hasInvalidFilters = useSelector((state) => state.filters.hasInvalidFilters);

  const [isMenuOpen, toggleMenu] = useToggle(false);
  const [currentSort, setCurrentSort] = useState<Variant<keyof typeof GoodsSortTypes>>({
    code: 'POPULARITY',
    value: GoodsSortTypes.POPULARITY,
  });

  const isInitialized = useRef(false);

  const query = { ...router.query };

  //Sort
  const setSort = (value: Variant<keyof typeof GoodsSortTypes>) => {
    setIsLoading(true);
    setCurrentSort(value);

    const queryWithoutUtm = Object.fromEntries(
      Object.entries(query).filter((item) => item[0] === 'city' || !isNaN(+item[0]))
    );

    const newQuery = { ...(!hasInvalidFilters && queryWithoutUtm) };

    const href = router.asPath.split('?')[0];

    if (value.code !== 'POPULARITY') {
      router.push({ pathname: href, query: { ...newQuery, sort: value.code } }, undefined, {
        scroll: false,
      });
    } else {
      router.push({ pathname: href, query: { ...newQuery } }, undefined, {
        scroll: false,
      });
    }
  };

  /** Добавление фильтра в query параметры урла. Оттуда их достает NEXT и выдает currentFilters */
  const addFilter = (filter: IFilterFront) => {
    setIsLoading(true);

    let href = router.asPath.split('?')[0];

    const queryWithoutUtm = Object.fromEntries(
      Object.entries(query).filter(
        (item) => item[0] === 'sort' || item[0] === 'city' || item[0] === 'page' || !isNaN(+item[0])
      )
    );

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

    const newQuery = { ...(!hasInvalidFilters && queryWithoutUtm), ...queryFilters };

    router.push({ pathname: href, query: newQuery }, undefined, {
      scroll: false,
    });
  };

  // Удаляет фильтр целиком, либо одно из значений фильтра
  const removeFilter = (filter: IFilterFront, val: string) => {
    const { id, tag_slug, display_type } = filter;

    const queryWithoutUtm = Object.fromEntries(
      Object.entries(query).filter(
        (item) => item[0] === 'sort' || item[0] === 'city' || item[0] === 'page' || !isNaN(+item[0])
      )
    );
    let href = router.asPath.split('?')[0];

    if (tag_slug) {
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
      // let newValues = null;
      // if (value) newValues = currentFilters[id].values.filter((item) => item !== value || isNaN(+item));

      const newQuery = { ...(!hasInvalidFilters && queryWithoutUtm) };

      display_type === 'MANY_FROM_MANY' && typeof newQuery[id] !== 'string' && !!newQuery[id].length
        ? (newQuery[id] = (newQuery[id] as string[])?.filter((el) => el !== val))
        : delete newQuery[id];

      router.push({ pathname: href, query: { ...newQuery } }, undefined, {
        scroll: false,
      });

      // if (newValues && newValues.length > 0) {
      //   delete newQuery[id];
      //   // replaceRouterQuery({ [id]: newValues }, ['page']);

      //   router.push({ pathname: href, query: { ...newQuery } }, undefined, {
      //     scroll: false,
      //   });
      // } else {
      //   delete newQuery[id];

      //   router.push({ pathname: href, query: { ...newQuery } }, undefined, {
      //     scroll: false,
      //   });
      // }
    }
    setIsLoading(true);
  };

  // Очистка всех фильтровы
  const removeAllFilters = () => {
    setIsLoading(true);
    const excludeFilters = Object.keys(activeFilters);
    if (router.query.id) replaceRouterQuery({}, excludeFilters);
  };

  // useEffect(() => {
  //   // Очистка фильтров при изменении категории
  //   if (isInitialized.current) removeAllFilters();
  // }, [categorySlug]);

  useEffect(() => {
    isInitialized.current = true;

    return () => {
      // if (isInitialized.current) removeAllFilters();
      isInitialized.current = false;
    };
  }, []);

  useEffect(() => {
    toggleMenu(false);
  }, [router.asPath]);

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
      <CurrentFiltersList
        isLoading={isLoading}
        currentFilters={currentFilters}
        removeAllFilters={removeAllFilters}
        removeFilter={removeFilter}
      />
    </>
  );
};

export { CategoryFilters };
