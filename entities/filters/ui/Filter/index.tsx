import React, { FC, useEffect, useState, MouseEvent } from 'react';

import type { IFilter, IFilterFront } from 'entities/filters/model/IFilter';

import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';
import { IFilterSelectVariant } from '@nebo-team/vobaza.ui.filter-select/dist';
import { FilterSelect } from '@nebo-team/vobaza.ui.filter-select/dist';
import { RangeBlock } from '@nebo-team/vobaza.ui.range/dist';

import styles from './styles.module.scss';

type Props = {
  full?: boolean;
  filter: IFilter;
  baseFilter: IFilter;
  currentFilter?: IFilterFront;
  addFilter: (filter: IFilterFront) => void;
};

const NumericFilter: FC<Props> = React.memo(({ filter, full = false, currentFilter, addFilter }) => {
  const [filterValues, setFilterValues] = useState<[number, number]>([filter.meta.min || 0, filter.meta.max || 100]);
  const [rangeFilter, setRangeFilter] = useState<{ filter: IFilter; values: [number, number] } | null>(null);
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      filter.meta.min === filter.meta.max ||
      (filterValues[0] === filter.meta.min && filterValues[1] === filter.meta.max)
    )
      return;

    addFilter({
      id: filter.id,
      name: filter.display_name || filter.name,
      value_type: filter.value_type,
      display_type: filter.display_type,
      values: filterValues,
    });
  };

  const onButtonClick = (newValues: [number, number]) => {
    addFilter({
      id: filter.id,
      name: filter.display_name || filter.name,
      value_type: filter.value_type,
      display_type: filter.display_type,
      values: newValues,
    });
  };

  const handleIncomeValues = (values: [number, number]) => {
    setRangeFilter((prevRangeFilter) => ({
      ...prevRangeFilter,
      values,
    }));
  };

  useEffect(() => {
    if (currentFilter) {
      setRangeFilter({
        filter,
        values: [
          Math.max(currentFilter.values[0], filter.meta.min),
          Math.min(currentFilter.values[1], filter.meta.max),
        ] as [number, number],
      });
    } else {
      setRangeFilter({
        filter,
        values: [filter.meta.min || 0, filter.meta.max || 100] as [number, number],
      });
    }
  }, [filter, currentFilter]);

  return (
    <>
      {rangeFilter && (
        <div className={styles.filter}>
          {full ? (
            <div className={styles.filterNumeric}>
              <RangeBlock
                min={rangeFilter.filter.meta.min}
                max={rangeFilter.filter.meta.max}
                incomeValues={rangeFilter.values}
                setIncomeValue={handleIncomeValues}
                onChange={setFilterValues}
              />

              <button style={{ display: 'none' }} onClick={onClick} className="filtersJsButton" />
            </div>
          ) : (
            <FilterSelect
              variation="secondary"
              variants={[
                { code: 'min', value: rangeFilter.filter.meta.min },
                { code: 'max', value: rangeFilter.filter.meta.max },
              ]}
              type="range"
              incomeValues={rangeFilter.values}
              setIncomeValues={handleIncomeValues}
              placeholder={rangeFilter.filter.display_name || rangeFilter.filter.name}
              buttonText="Показать"
              onButtonClick={onButtonClick}
            />
          )}
        </div>
      )}
    </>
  );
});

const ListedFilter: FC<Props> = ({ filter, baseFilter, full = false, currentFilter, addFilter }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [values, setValues] = useState<IFilterSelectVariant[]>(
    baseFilter.meta.items
      .map((item) => {
        return {
          value: item === 'true' ? 'Да' : item === 'false' ? 'Нет' : item,
          code: item,
          isActive: false,
          disabled: !filter.meta.items.find((val) => val === item),
        };
      })
      .sort((a, b) => (a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1))
  );

  useEffect(() => {
    if (currentFilter) {
      const currentValues = currentFilter.values;
      setValues((prevArray) =>
        prevArray.map((item) => {
          if (currentValues.includes(item.code))
            return {
              ...item,
              isActive: true,
            };
          return { ...item, isActive: false };
        })
      );
    } else {
      setValues((prevArray) =>
        prevArray.map((item) => {
          return { ...item, isActive: false };
        })
      );
    }
    setIsTouched(false);
  }, [currentFilter, filter]);

  const onClick = (e?) => {
    e && e.preventDefault();
    if (!isTouched) return;

    const newValues = [];
    values
      .filter((item) => item.isActive)
      .forEach((item) => {
        newValues.push(item.code);
      });

    addFilter({
      id: filter.id,
      name: filter.display_name || filter.name,
      display_type: filter.display_type,
      values: newValues,
    });
  };

  const changeValues = (val) => {
    setIsTouched(true);
    setValues(
      values.map((value) => {
        if (value.code === val.code)
          return {
            ...val,
            isActive: !val.isActive,
          };
        return value;
      })
    );
  };

  useEffect(() => {
    const filteredBaseFilters = baseFilter.meta.items
      .map((item) => {
        let isActive = false;
        if (currentFilter?.values.includes(item)) isActive = true;

        return {
          value: item === 'true' ? 'Да' : item === 'false' ? 'Нет' : item,
          code: item,
          isActive,
          disabled: !filter.meta.items.find((val) => val === item),
        };
      })
      .sort((a, b) => (a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1));

    setValues(filteredBaseFilters);
  }, [baseFilter]);

  return (
    <div className={styles.filter}>
      {full ? (
        <div className={styles.filterList}>
          {values.map((item) => (
            <div className={styles.filterListItem} key={item.code}>
              <InputCheckbox
                variation="secondary"
                label={item.value}
                initialValue={item.isActive}
                onChange={() => changeValues(item)}
                disabled={item.disabled}
              />
            </div>
          ))}
          <button style={{ display: 'none' }} onClick={onClick} className="filtersJsButton" />
        </div>
      ) : (
        <FilterSelect
          variation="secondary"
          variants={values}
          type="checkbox"
          placeholder={filter.display_name || filter.name}
          buttonText="Показать"
          onChange={changeValues}
          onButtonClick={onClick}
          // withSearch
        />
      )}
    </div>
  );
};

export const Filter: FC<Props> = ({ filter, baseFilter, ...props }) => {
  return (
    <div className={styles.filter}>
      {
        {
          NUMERIC_RANGE: <NumericFilter filter={filter} baseFilter={baseFilter} {...props} />,
          MANY_FROM_MANY: <ListedFilter filter={filter} baseFilter={baseFilter} {...props} />,
        }[filter.display_type]
      }
    </div>
  );
};
