import React, { FC, MouseEvent, useEffect } from 'react';

import type { IFilter, IFilterFront } from '../../../../entities/filters/model/IFilter';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import Accordeon from '../../../../shared/ui/Accordeon';
import { Filter } from '../../../../entities/filters';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  filters: IFilter[];
  baseFilters: IFilter[];
  currentFilters: { [key: number]: IFilterFront };
  close: () => void;
  addFilter: (filters: IFilterFront) => void;
  removeAllFilters: () => void;
};

const FiltersModal: FC<Props> = ({
  isOpen,
  filters,
  baseFilters,
  currentFilters,
  removeAllFilters,
  addFilter,
  close,
}) => {
  const menuClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const removeAll = () => {
    removeAllFilters();
    close();
  };

  const applyAll = () => {
    const filterItems = document.querySelectorAll('.filtersJsButton');
    filterItems.forEach((item: HTMLElement) => item.click());
    close();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  // const additionalFilters = filters.filter((item) => item.visibility_type === 'ADDITIONAL');

  return (
    <div className={`${styles.filtersModal} ${isOpen && styles.filtersModalOpen}`} onClick={close}>
      <div className={styles.filtersContent} onClick={menuClickHandler}>
        <div className={styles.filterHeader}>
          <div className={styles.filtersClose} onClick={close}>
            <Icon name="Cross" />
          </div>
          <div className={styles.filtersTitle}>Сортировка и фильтры </div>
        </div>
        <div className={styles.filtersBlock}>
          {filters.map((filter) => (
            <Accordeon key={filter.id} title={filter.name} className={styles.filtersAccordeon}>
              <div className={filter.type === 'LISTED' ? styles.listWrapper : ''}>
                <Filter
                  filter={filter}
                  baseFilter={baseFilters.find((item) => item.id === filter.id)}
                  currentFilter={currentFilters?.[filter.id]}
                  addFilter={addFilter}
                  full
                />
              </div>
            </Accordeon>
          ))}
        </div>
        <div className={styles.filtersButtons}>
          <Button text="Показать все" isFullScreen onClick={applyAll}></Button>
          <Button text="Очистить фильтры" isFullScreen onClick={removeAll}></Button>
        </div>
      </div>
    </div>
  );
};

export { FiltersModal };
