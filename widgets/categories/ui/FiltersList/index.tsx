import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IFilter, IFilterFront } from 'entities/filters/model/IFilter';
import { GoodsSortTypes } from 'entities/products/model/IGood';

import { FilterSelect } from '@nebo-team/vobaza.ui.filter-select';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Filter } from '../../../../entities/filters/ui/Filter';

import styles from './styles.module.scss';

const getSortVariants = () => {
  return Object.entries(GoodsSortTypes).map(([key, value]) => ({ code: key, value }));
};

const sortFiltersItems = (filters: IFilter[]) => {
  return filters.map((filterItem) => {
    if (filterItem.value_type !== 'PRICE' && filterItem?.meta?.items?.length > 0) {
      const metaItems = [...filterItem.meta.items];
      metaItems.sort((a, b) => (a > b ? 1 : -1));

      const newFilter = { ...filterItem, meta: { ...filterItem.meta, items: [...metaItems] } };

      return newFilter;
    } else {
      return filterItem;
    }
  });
};

type Props = {
  filters: IFilter[];
  baseFilters: IFilter[];
  currentSort: Variant<string>;
  currentFilters: { [key: number]: IFilterFront } | null;
  toggleMenu: () => void;
  setSort: (value: Variant<string>) => void;
  addFilter: (filters: IFilterFront) => void;
};

const CategoryFiltersList = ({
  filters,
  baseFilters,
  currentSort,
  currentFilters,
  toggleMenu,
  setSort,
  addFilter,
}: Props) => {
  const sortVariants = useMemo(getSortVariants, []);

  const router = useRouter();
  const { id, city, page, sort, text, ...activeFilters } = router.query;

  const sortedBaseFilters = sortFiltersItems(baseFilters);

  return (
    <div className={styles.filtersBlock}>
      <div className={styles.filters}>
        {filters.map(
          (filter) =>
            filter.visibility_type === 'MAIN' && (
              <Filter
                key={filter.id}
                filter={filter}
                baseFilter={sortedBaseFilters.find((item) => item.id === filter.id)}
                currentFilter={currentFilters?.[filter.id]}
                addFilter={addFilter}
              />
            )
        )}
        {filters.length > 0 && (
          <button className={styles.filtersButton} onClick={toggleMenu}>
            Еще фильтры
          </button>
        )}
      </div>
      <button className={styles.filtersMobileButton} onClick={toggleMenu}>
        <Icon name="Filters" />
        Фильтры
        {activeFilters && Object.keys(activeFilters).length > 0 && (
          <span className={styles.filtersBadge}>{Object.keys(activeFilters).length}</span>
        )}
      </button>
      <div className={styles.sort}>
        <FilterSelect
          className={styles.sortItem}
          variation="secondary"
          variants={sortVariants}
          onChange={setSort}
          selected={currentSort}
          isRightSide
        />
      </div>
    </div>
  );
};

export { CategoryFiltersList };
