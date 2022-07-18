import { CSSProperties, FC } from 'react';

import type { IFilterFront } from '../../../../src/models/IFilter';
import { toNumberWithSpaces } from '../../../../assets/utils/formatters';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from '../styles.module.scss';

type Props = {
  filter: IFilterFront;
  removeFilter: (id: number, value?: string) => void;
  isLoading: boolean;
};

const renderNumericText = (filter: IFilterFront) => {
  if (filter.name === 'Цена')
    return `${filter.name}: ${toNumberWithSpaces(filter.values[0])} ₽ - ${toNumberWithSpaces(filter.values[1])} ₽`;
  return `${filter.name}: ${filter.values[0]} - ${filter.values[1]}`;
};

const GoodsFilterItemActive: FC<Props> = ({ filter, removeFilter, isLoading }) => {
  const blockClickStyle: CSSProperties = { pointerEvents: isLoading ? 'none' : 'auto' };

  return (
    <>
      {filter.type === 'NUMERIC_RANGE' ? (
        <div className={`${styles.active} ${styles.filtersButton}`}>
          {renderNumericText(filter)}
          <button
            className="filter-close-btn"
            type="button"
            onClick={() => removeFilter(filter.id)}
            style={blockClickStyle}
          >
            <Icon name="Cross" />
          </button>
        </div>
      ) : (
        filter.values.map((value) => (
          <div key={value} className={`${styles.active} ${styles.filtersButton}`}>
            {`${filter.name}: ${value === 'true' ? 'Да' : value === 'false' ? 'Нет' : value}`}
            <button
              className="filter-close-btn"
              type="button"
              onClick={() => removeFilter(filter.id, value)}
              style={blockClickStyle}
            >
              <Icon name="Cross" />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default GoodsFilterItemActive;
