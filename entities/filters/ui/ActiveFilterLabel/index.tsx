import { CSSProperties, FC } from 'react';

import type { IFilterFront } from 'entities/filters/model/IFilter';
import { toNumberWithSpaces } from 'shared/lib/formatters';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

type Props = {
  filter: IFilterFront;
  removeFilter: (filter: IFilterFront, value?: string) => void;
  isLoading: boolean;
};

const renderNumericText = (filter: IFilterFront) => {
  if (filter.value_type === 'PRICE')
    return `${filter.display_name || filter.name}: ${toNumberWithSpaces(filter.values[0])} ₽ - ${toNumberWithSpaces(
      filter.values[1]
    )} ₽`;
  return `${filter.display_name || filter.name}: ${filter.values[0]} - ${filter.values[1]}`;
};

export const ActiveFilterLabel: FC<Props> = ({ filter, removeFilter, isLoading }) => {
  const blockClickStyle: CSSProperties = { pointerEvents: isLoading ? 'none' : 'auto' };

  return (
    <>
      {filter.type === 'NUMERIC_RANGE' ? (
        <div className={`${styles.active} ${styles.filtersButton}`}>
          {renderNumericText(filter)}
          <button
            className="filter-close-btn"
            type="button"
            onClick={() => removeFilter(filter)}
            style={blockClickStyle}
          >
            <Icon name="Cross" />
          </button>
        </div>
      ) : (
        filter.values.map((value) => (
          <div key={value} className={`${styles.active} ${styles.filtersButton}`}>
            {`${filter.display_name || filter.name}: ${value === 'true' ? 'Да' : value === 'false' ? 'Нет' : value}`}
            <button
              className="filter-close-btn"
              type="button"
              onClick={() => removeFilter(filter, value)}
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
