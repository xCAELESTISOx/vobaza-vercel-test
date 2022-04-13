import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';

import styles from './styles.module.scss';
import { IFilter, IFilterFront } from '../../../src/models/IFilter';

import { FilterSelect } from '@nebo-team/vobaza.ui.filter-select';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import FiltersModal from './Modal';
import GoodsFilterItem from './Item';
import GoodsFilterItemActive from './Item/Active';
import { GoodsSortTypes } from 'src/models/IGood';

type Props = {
  filters: IFilter[];
  setIsLoading?: (value: boolean) => void;
};

const getSortVariants = () => {
  return Object.keys(GoodsSortTypes).map((key) => {
    return { code: key, value: GoodsSortTypes[key] };
  });
};

const GoodsFilters: FC<Props> = ({ filters, setIsLoading }) => {
  const router = useRouter();
  const { page, id, sort, text, ...activeFilters } = router.query;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState({
    code: 'POPULARITY',
    value: GoodsSortTypes.POPULARITY,
  });
  const [currentFilters, setCurrentFilters] = useState<IFilterFront[]>([]);
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
        ? filter.value_type === 'PRICE'
          ? `${filter.values[0] * 100}%-%${filter.values[1] * 100}`
          : `${filter.values[0]}%-%${filter.values[1]}`
        : filter.values;
    setIsLoading(true);

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
    setIsLoading(true);

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

    setIsLoading(true);
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

        addFilter({
          id: filter.id,
          name: filter.name,
          type: filter.type,
          value_type: filter.value_type,
          values,
        });
      });
    }
    if (sort) {
      setCurrentSort({
        code: sort.toString(),
        value: GoodsSortTypes[sort.toString()],
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
            <span className={styles.filtersBadge}>
              {Object.keys(activeFilters).length}
            </span>
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
