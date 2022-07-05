import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';

import type { IFilter, IFilterFront } from '../../../src/models/IFilter';
import { GoodsSortTypes } from 'src/models/IGood';

import { FilterSelect } from '@nebo-team/vobaza.ui.filter-select/dist';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import FiltersModal from './Modal';
import GoodsFilterItem from './Item';
import GoodsFilterItemActive from './Item/Active';

import styles from './styles.module.scss';

type Props = {
  filters: IFilter[];
  baseFilters: IFilter[];
  setIsLoading?: (value: boolean) => void;
};

const getSortVariants = () => {
  return Object.keys(GoodsSortTypes).map((key) => {
    return { code: key, value: GoodsSortTypes[key] };
  });
};

const GoodsFilters: FC<Props> = ({ filters, baseFilters, setIsLoading }) => {
  const router = useRouter();
  const { page, id, sort, text, city, ...activeFilters } = router.query;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState({
    code: 'POPULARITY',
    value: GoodsSortTypes.POPULARITY,
  });
  const [currentFilters, setCurrentFilters] = useState<{ [key: number]: IFilterFront }>(null);
  const sortVariants = useMemo(() => getSortVariants(), []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //Sort
  const setSort = (value) => {
    setIsLoading(true);
    setCurrentSort(value);

    let query = { ...router.query };
    delete query['page'];

    if (value.code !== 'POPULARITY') {
      query.sort = value.code;
    } else {
      delete query['sort'];
    }
    router.replace(
      {
        query,
      },
      undefined,
      { scroll: false }
    );
  };

  // Filters
  const addFilters = (filters: IFilterFront[]) => {
    // Добавляем новые фильтры, заменяем старые на новые
    setCurrentFilters((prevArray) => {
      const newValues = { ...prevArray };

      filters.forEach((filter) => {
        newValues[filter.id] = filter;
      });

      return newValues;
    });

    let query = { ...router.query };
    delete query['page'];
    delete query['city'];

    filters.forEach((filter) => {
      if (filter.type === 'NUMERIC_RANGE') {
        if (filter.value_type === 'PRICE') {
          query[filter.id] = `${filter.values[0] * 100}%-%${filter.values[1] * 100}`;
        } else {
          query[filter.id] = `${filter.values[0]}%-%${filter.values[1]}`;
        }
      } else {
        query[filter.id] = filter.values;
      }
    });

    setIsLoading(true);

    router.replace({ query }, undefined, { scroll: false });
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

    const query = { ...router.query };
    delete query['page'];

    if (newValues && newValues.length > 0) {
      query[id] = newValues;
    } else {
      delete query[id];
    }
    setIsLoading(true);

    router.replace({ query }, undefined, { scroll: false });
  };

  const removeAllFilters = () => {
    setCurrentFilters(null);

    setIsLoading(true);
    if (router.query.id)
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
    const newFilters: IFilterFront[] = [];
    if (activeFilters && filters.length > 0) {
      Object.keys(activeFilters).forEach((key) => {
        const filter = filters.find((item) => item.id.toString() === key);

        let values = null;
        if (filter.type === 'NUMERIC_RANGE') {
          values = activeFilters[key].toString().split('%-%');
          if (filter.value_type === 'PRICE') {
            values = values.map((value) => value / 100);
          }
        } else {
          if (typeof activeFilters[key] === 'string') {
            values = [activeFilters[key]];
          } else {
            values = Array.from(activeFilters[key]);
          }
        }

        newFilters.push({
          id: filter.id,
          name: filter.name,
          type: filter.type,
          value_type: filter.value_type,
          values,
        });
      });
    }

    addFilters(newFilters);

    if (sort) {
      setCurrentSort({
        code: sort.toString(),
        value: GoodsSortTypes[sort.toString()],
      });
    }
  }, []);

  useEffect(() => {
    let newFilters: IFilterFront[] = [];
    if (activeFilters && filters.length > 0) {
      Object.keys(activeFilters).forEach((key) => {
        const filter = filters.find((item) => item.id.toString() === key);

        let values = null;
        if (filter.type === 'NUMERIC_RANGE') {
          let activeValues = (activeFilters[key] as string).split('%-%').map((i) => +i);

          if (filter.value_type === 'PRICE') {
            activeValues = activeValues.map((item) => +item / 100);
          }

          if (activeValues[0] !== filter.meta.min || activeValues[1] !== filter.meta.max) {
            values = [];
            values[0] = filter.meta.min;
            values[1] = filter.meta.max;

            newFilters.push({
              id: filter.id,
              name: filter.name,
              type: filter.type,
              value_type: filter.value_type,
              values,
            });
          }
        }
      });
    }

    if (newFilters.length) {
      addFilters(newFilters);
    }
  }, [filters]);

  useEffect(() => {
    removeAllFilters();
  }, [router.asPath.split('?')[0]]);

  return (
    <>
      <FiltersModal
        isOpen={isMenuOpen}
        filters={filters}
        baseFilters={baseFilters}
        currentFilters={currentFilters}
        close={toggleMenu}
        addFilters={addFilters}
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
                  baseFilter={baseFilters.find((item) => item.id === filter.id)}
                  currentFilters={currentFilters}
                  addFilters={addFilters}
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
      {currentFilters && Object.keys(currentFilters).length > 0 && (
        <div className={styles.filtersBlock}>
          <div className={styles.filters}>
            {Object.values(currentFilters).map((filter: IFilterFront) => (
              <GoodsFilterItemActive key={filter.id} filter={filter} removeFilter={removeFilter} />
            ))}
            <button className={`${styles.remove} ${styles.filtersButton}`} onClick={removeAllFilters}>
              Очистить все
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GoodsFilters;
