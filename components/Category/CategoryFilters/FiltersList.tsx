import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IFilter, IFilterFront } from 'src/models/IFilter';
import { GoodsSortTypes } from 'src/models/IGood';

import { FilterSelect } from '@nebo-team/vobaza.ui.filter-select';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Filter } from './Filter';

import styles from './styles.module.scss';

const getSortVariants = () => {
  return Object.keys(GoodsSortTypes).map((key) => {
    return { code: key, value: GoodsSortTypes[key] };
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

  return (
    <div className={styles.filtersBlock}>
      <div className={styles.filters}>
        {filters.map(
          (filter) =>
            filter.visibility_type === 'MAIN' && (
              <Filter
                key={filter.id}
                filter={filter}
                baseFilter={baseFilters.find((item) => item.id === filter.id)}
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

export default CategoryFiltersList;
