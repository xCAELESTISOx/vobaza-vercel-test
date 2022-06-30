import { FC, useEffect, useState } from 'react';

import type { IFilter, IFilterFront } from '../../../../src/models/IFilter';

import { IFilterSelectVariant } from '@nebo-team/vobaza.ui.filter-select/dist';
import { FilterSelect } from '@nebo-team/vobaza.ui.filter-select/dist';
import { RangeBlock } from '@nebo-team/vobaza.ui.range/dist';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';

import styles from './styles.module.scss';

type Props = {
  ref?: any;
  full?: boolean;
  filter: IFilter;
  baseFilter: IFilter;
  currentFilters: { [key: number]: IFilterFront };
  addFilters: (filters: IFilterFront[]) => void;
};

const GoodsFilterItemNumeric: FC<Props> = ({ filter, currentFilters, full = false, addFilters }) => {
  const [values, setValues] = useState<[number, number]>([filter.meta.min || 0, filter.meta.max || 100]);
  const [filterValues, setFilterValues] = useState<[number, number]>([filter.meta.min || 0, filter.meta.max || 100]);

  const onClick = (e) => {
    e.preventDefault();
    if (
      filter.meta.min === filter.meta.max ||
      (!currentFilters[filter.id] && filterValues[0] === filter.meta.min && filterValues[1] === filter.meta.max)
    )
      return;
    addFilters([
      {
        id: filter.id,
        name: filter.name,
        value_type: filter.value_type,
        type: filter.type,
        values: filterValues,
      },
    ]);
  };

  const onButtonClick = (newValues: [number, number]) => {
    addFilters([
      {
        id: filter.id,
        name: filter.name,
        value_type: filter.value_type,
        type: filter.type,
        values: newValues,
      },
    ]);
  };

  useEffect(() => {
    if (currentFilters && currentFilters[filter.id]) {
      setValues(currentFilters[filter.id].values as [number, number]);
    } else {
      setValues([filter.meta.min || 0, filter.meta.max || 100]);
    }
  }, [currentFilters, filter]);

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
          placeholder={filter.name}
          buttonText="Показать"
          onButtonClick={onButtonClick}
        />
      )}
    </div>
  );
};

const GoodsFilterItemListed: FC<Props> = ({ filter, baseFilter, full = false, currentFilters, addFilters }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [values, setValues] = useState<IFilterSelectVariant[]>(
    baseFilter.meta.items
      .map((item) => {
        return {
          code: item,
          value: item,
          isActive: false,
          disabled: !filter.meta.items.find((val) => val === item),
        };
      })
      .sort((a, b) => (a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1))
  );

  useEffect(() => {
    if (currentFilters && currentFilters[filter.id]) {
      const currentValues = currentFilters[filter.id].values;
      setValues((prevArray) =>
        prevArray.map((item) => {
          if (currentValues.includes(item.value))
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
  }, [currentFilters, filter]);

  const onClick = (e?) => {
    e && e.preventDefault();
    if (!isTouched) return;

    const newValues = [];
    values
      .filter((item) => item.isActive)
      .forEach((item) => {
        newValues.push(item.value);
      });

    addFilters([
      {
        id: filter.id,
        name: filter.name,
        type: filter.type,
        values: newValues,
      },
    ]);
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
        if (currentFilters && currentFilters[filter.id] && currentFilters[filter.id].values.includes(item))
          isActive = true;

        return {
          code: item,
          value: item,
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
        <div className={styles.filterCheckboxes}>
          {values.map((item) => (
            <InputCheckbox
              key={item.code}
              variation="secondary"
              label={item.value}
              initialValue={item.isActive}
              onChange={() => changeValues(item)}
              disabled={item.disabled}
            />
          ))}
          <button style={{ display: 'none' }} onClick={onClick} className="filtersJsButton" />
        </div>
      ) : (
        <FilterSelect
          variation="secondary"
          variants={values}
          type="checkbox"
          placeholder={filter.name}
          buttonText="Показать"
          onChange={changeValues}
          onButtonClick={onClick}
          // withSearch
        />
      )}
    </div>
  );
};

const GoodsFilterItem: FC<Props> = ({ filter, baseFilter, ...props }) => {
  return (
    <div className={styles.filter}>
      {filter.type === 'NUMERIC_RANGE' && <GoodsFilterItemNumeric filter={filter} baseFilter={baseFilter} {...props} />}
      {filter.type === 'LISTED' && <GoodsFilterItemListed filter={filter} baseFilter={baseFilter} {...props} />}
    </div>
  );
};

export default GoodsFilterItem;
