import React from 'react';

import type { IFilterFront } from 'src/models/IFilter';

import GoodsFilterItemActive from './Item/Active';

import styles from './styles.module.scss';

type Props = {
  isLoading: boolean;
  currentFilters: { [key: number]: IFilterFront };
  removeAllFilters: () => void;
  removeFilter: (filter: IFilterFront, value?: string) => void;
};

const CategoryCurrentFilters = ({ isLoading, currentFilters, removeAllFilters, removeFilter }: Props) => {
  return (
    <>
      {currentFilters && Object.keys(currentFilters).length > 0 && (
        <div className={styles.filtersBlock} style={{ zIndex: 14 }}>
          <div className={styles.filters}>
            {Object.values(currentFilters).map((filter: IFilterFront) => (
              <GoodsFilterItemActive
                key={filter.id}
                filter={filter}
                removeFilter={removeFilter}
                isLoading={isLoading}
              />
            ))}
            <button
              className={`${styles.remove} ${styles.filtersButton}`}
              onClick={removeAllFilters}
              style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
            >
              Очистить все
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryCurrentFilters;
