import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { IFilter, IFilterFront } from '../../../src/models/IFilter';

import { FilterSelect } from '@nebo-team/vobaza.ui.filter-select';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import FiltersModal from './Modal';
import GoodsFilterItem from './Item';
import GoodsFilterItemActive from './Item/Active';

type Props = {
  filters: IFilter[];
};

const GoodsFilters: FC<Props> = ({ filters }) => {
  const router = useRouter();
  const { page, id, ...activeFilters } = router.query;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<IFilterFront[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const addFilter = (filter: IFilterFront) => {
    setCurrentFilters((prevArray) => {
      return {
        ...prevArray,
        [filter.id]: filter,
      };
    });

    let query = { ...router.query };
    delete query['page'];

    query[filter.id] =
      filter.type === 'NUMERIC_RANGE'
        ? `${filter.values[0]}%-%${filter.values[1]}`
        : filter.values;

    router.replace(
      {
        query,
      },
      undefined,
      { scroll: false }
    );
  };
  const removeFilter = (id: number, value?: string) => {
    const newFilters = { ...currentFilters };

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
    setCurrentFilters(newFilters);

    let query = { ...router.query };
    delete query['page'];

    if (newValues && newValues.length > 0) {
      query[id] = newValues;
    } else {
      delete query[id];
    }

    router.replace(
      {
        query,
      },
      undefined,
      { scroll: false }
    );
  };
  const removeAllFilters = () => {
    setCurrentFilters([]);

    router.replace(
      {
        query: {
          id: router.query.id,
        },
      },
      undefined,
      { scroll: false }
    );
  };

  useEffect(() => {
    if (activeFilters) {
      Object.keys(activeFilters).forEach((key) => {
        const filter = filters.find((item) => item.id.toString() === key);

        let values = null;
        if (filter.type === 'NUMERIC_RANGE') {
          values = activeFilters[key].toString().split('%-%');
        } else {
          if (typeof activeFilters[key] === 'string') {
            values = [activeFilters[key]];
          } else {
            values = Array.from(activeFilters[key]);
          }
        }
        addFilter({
          id: filter.id,
          name: filter.name,
          type: filter.type,
          values,
        });
      });
    }
  }, []);

  return (
    <>
      <FiltersModal
        isOpen={isMenuOpen}
        filters={filters}
        currentFilters={currentFilters}
        close={toggleMenu}
        addFilter={addFilter}
        removeAllFilters={removeAllFilters}
      />
      <div className={styles.filtersBlock}>
        <div className={styles.filters}>
          {filters.map(
            (filter) =>
              filter.visibility_type === 'MAIN' && (
                <GoodsFilterItem
                  key={filter.id}
                  filter={filter}
                  currentFilters={currentFilters}
                  addFilter={addFilter}
                />
              )
          )}
          <button className={styles.filtersButton} onClick={toggleMenu}>
            Еще фильтры
          </button>
        </div>
        <button className={styles.filtersMobileButton} onClick={toggleMenu}>
          <Icon name="Filters" />
          Фильтры
          {activeFilters && Object.keys(activeFilters).length > 0 && (
            <span className={styles.filtersBadge}>
              {Object.keys(activeFilters).length}
            </span>
          )}
        </button>
        <div className={styles.sort}>
          <FilterSelect
            className={styles.sortItem}
            variation="secondary"
            variants={[
              { code: 'item1', value: 'По популярности' },
              { code: 'item2', value: 'Новинки выше' },
              { code: 'item3', value: 'Дешевые выше' },
              { code: 'item4', value: 'Дорогие выше' },
            ]}
            selected={{ code: 'item1', value: 'По популярности' }}
            isRightSide
          />
        </div>
      </div>
      {currentFilters && Object.values(currentFilters).length > 0 && (
        <div className={styles.filtersBlock}>
          <div className={styles.filters}>
            {Object.values(currentFilters).map((filter: IFilterFront) => (
              <GoodsFilterItemActive
                key={filter.id}
                filter={filter}
                removeFilter={removeFilter}
              />
            ))}
            <button
              className={`${styles.remove} ${styles.filtersButton}`}
              onClick={removeAllFilters}
            >
              Очистить все
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GoodsFilters;
