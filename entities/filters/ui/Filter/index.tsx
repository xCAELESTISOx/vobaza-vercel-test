import { FC, useEffect, useState, MouseEvent } from 'react';

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

const NumericFilter: FC<Props> = ({ filter, full = false, currentFilter, addFilter }) => {
  const [values, setValues] = useState<[number, number]>([filter.meta.min || 0, filter.meta.max || 100]);
  const [filterValues, setFilterValues] = useState<[number, number]>([filter.meta.min || 0, filter.meta.max || 100]);
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
      type: filter.type,
      values: filterValues,
    });
  };

  const onButtonClick = (newValues: [number, number]) => {
    addFilter({
      id: filter.id,
      name: filter.display_name || filter.name,
      value_type: filter.value_type,
      type: filter.type,
      values: newValues,
    });
  };

  useEffect(() => {
    if (currentFilter) {
      const newValues = [...currentFilter.values] as [number, number];

      newValues[0] = Math.max(currentFilter.values[0], filter.meta.min);
      newValues[1] = Math.min(currentFilter.values[1], filter.meta.max);

      setValues(newValues);
    } else {
      setValues([filter.meta.min || 0, filter.meta.max || 100]);
    }
  }, [currentFilter, filter]);

  return (
    <div className={styles.filter}>
      {full ? (
        <div className={styles.filterNumeric}>
          <RangeBlock
            min={filter.meta.min}
            max={filter.meta.max}
            incomeValues={values}
            setIncomeValue={setValues}
            onChange={setFilterValues}
          />
          <button style={{ display: 'none' }} onClick={onClick} className="filtersJsButton" />
        </div>
      ) : (
        <FilterSelect
          variation="secondary"
          variants={[
            { code: 'min', value: filter.meta.min },
            { code: 'max', value: filter.meta.max },
          ]}
          type="range"
          incomeValues={values}
          setIncomeValues={setValues}
          placeholder={filter.display_name || filter.name}
          buttonText="Показать"
          onButtonClick={onButtonClick}
        />
      )}
    </div>
  );
};

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
      type: filter.type,
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
