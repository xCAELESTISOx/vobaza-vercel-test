import { FC } from 'react';

import styles from '../styles.module.scss';
import { IFilterFront } from '../../../../src/models/IFilter';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { toNumberWithSpaces } from '../../../../assets/utils/formatters';

type Props = {
  filter: IFilterFront;
  removeFilter: (id: number, value?: string) => void;
};

const renderNumericText = (filter: IFilterFront) => {
  if (filter.name === 'Цена')
    return `${filter.name}: ${toNumberWithSpaces(
      filter.values[0]
    )} ₽ - ${toNumberWithSpaces(filter.values[1])} ₽`;
  return `${filter.name}: ${filter.values[0]} - ${filter.values[1]}`;
};

const GoodsFilterItemActive: FC<Props> = ({ filter, removeFilter }) => {
  return (
    <>
      {filter.type === 'NUMERIC_RANGE' ? (
        <button
          className={`${styles.active} ${styles.filtersButton}`}
          onClick={() => removeFilter(filter.id)}
        >
          {renderNumericText(filter)}
          <Icon name="Cross" />
        </button>
      ) : (
        filter.values.map((value) => (
          <button
            key={value}
            className={`${styles.active} ${styles.filtersButton}`}
            onClick={() => removeFilter(filter.id, value)}
          >
            {`${filter.name}: ${value}`}
            <Icon name="Cross" />
          </button>
        ))
      )}
    </>
  );
};

export default GoodsFilterItemActive;
