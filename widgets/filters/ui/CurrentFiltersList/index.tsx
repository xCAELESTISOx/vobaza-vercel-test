import React, { FC } from 'react';

import type { IFilterFront } from 'entities/filters/model/IFilter';

import { ActiveFilterLabel } from '../../../../entities/filters/ui/ActiveFilterLabel';

import styles from './styles.module.scss';

type Props = {
  isLoading: boolean;
  currentFilters: Record<number, IFilterFront>;
  removeAllFilters: () => void;
  removeFilter: (filter: IFilterFront, value?: string) => void;
};

const CurrentFiltersList: FC<Props> = ({ isLoading, currentFilters, removeAllFilters, removeFilter }) => {
  return (
    <>
      {currentFilters && Object.keys(currentFilters).length > 0 && (
        <div className={styles.filtersBlock} style={{ zIndex: 14 }}>
          <div className={styles.filters}>
            {Object.values(currentFilters).map((filter: IFilterFront) => (
              <ActiveFilterLabel key={filter.id} filter={filter} removeFilter={removeFilter} isLoading={isLoading} />
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

export { CurrentFiltersList };
