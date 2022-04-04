import { FC, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { IFilter, IFilterFront } from '../../../../src/models/IFilter';

import { FilterSelect } from '@nebo-team/vobaza.ui.filter-select';
import { RangeBlock } from '@nebo-team/vobaza.ui.range';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox';

type Props = {
  filter: IFilter;
  currentFilters: IFilterFront[];
  full?: boolean;
  ref?: any;
  addFilter: (filter: IFilterFront) => void;
};

const GoodsFilterItemNumeric: FC<Props> = ({
  filter,
  currentFilters,
  full = false,
  addFilter,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [values, setValues] = useState<any>([
    filter.meta.min || 0,
    filter.meta.max || 100,
  ]);

  const onClick = (e?) => {
    if (e) {
      e.preventDefault();
    }
    if (!isTouched) return;
    addFilter({
      id: filter.id,
      name: filter.name,
      value_type : filter.value_type,
      type: filter.type,
      values: values,
    });
  };

  const setValuesHandler = (value) => {
    setIsTouched(true);
    setValues(value);
  };

  useEffect(() => {
    if (currentFilters[filter.id]) {
      setValues(currentFilters[filter.id].values);
    } else {
      setValues([filter.meta.min || 0, filter.meta.max || 100]);
    }
    setIsTouched(false);
  }, [currentFilters, filter]);

  return (
    <div className={styles.filter}>
      {full ? (
        <>
          <button
            style={{ display: 'none' }}
            onClick={onClick}
            className="filtersJsButton"
          />
          <RangeBlock
            min={filter.meta.min}
            max={filter.meta.max}
            values={values}
            onChange={setValuesHandler}
          />
        </>
      ) : (
        <FilterSelect
          variation="secondary"
          variants={[
            { code: 'min', value: filter.meta.min },
            { code: 'max', value: filter.meta.max },
          ]}
          type="range"
          values={values}
          onChange={setValuesHandler}
          placeholder={filter.name}
          buttonText="Показать"
          onButtonClick={onClick}
        />
      )}
    </div>
  );
};
const GoodsFilterItemListed: FC<Props> = ({
  filter,
  full = false,
  currentFilters,
  addFilter,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [values, setValues] = useState<any>(
    filter.meta.items.map((item) => {
      return {
        code: item,
        value: item,
        isActive: false,
      };
    })
  );

  useEffect(() => {
    if (currentFilters[filter.id]) {
      const currentValues = currentFilters[filter.id].values;
      setValues((prevArray) =>
        prevArray.map((item) => {
          if (currentValues.includes(item.value)) {
            return {
              ...item,
              isActive: true,
            };
          }
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
    if (e) {
      e.preventDefault();
    }
    if (!isTouched) return;
    const newValues = [];
    values
      .filter((item) => item.isActive)
      .forEach((item) => {
        newValues.push(item.value);
      });
    addFilter({
      id: filter.id,
      name: filter.name,
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

  return (
    <div className={styles.filter}>
      {full ? (
        <div className={styles.filterCheckboxes}>
          <button
            style={{ display: 'none' }}
            onClick={onClick}
            className="filtersJsButton"
          />
          {values.map((item) => (
            <InputCheckbox
              key={item.code}
              variation="secondary"
              label={item.value}
              initialValue={item.isActive}
              onChange={() => changeValues(item)}
            />
          ))}
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

const GoodsFilterItem: FC<Props> = ({ filter, ...props }) => {
  return (
    <div className={styles.filter}>
      {filter.type === 'NUMERIC_RANGE' && (
        <GoodsFilterItemNumeric filter={filter} {...props} />
      )}
      {filter.type === 'LISTED' && (
        <GoodsFilterItemListed filter={filter} {...props} />
      )}
    </div>
  );
};

export default GoodsFilterItem;
