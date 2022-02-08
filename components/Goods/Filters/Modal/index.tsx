import { FC, useEffect } from 'react';

import styles from './styles.module.scss';
import { IFilter, IFilterFront } from '../../../../src/models/IFilter';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Button } from '@nebo-team/vobaza.ui.button';
import Accordeon from '../../../UI/Accordeon';
import GoodsFilterItem from '../Item';

type Props = {
  isOpen: boolean;
  filters: IFilter[];
  currentFilters: IFilterFront[];
  close: () => void;
  addFilter: (filter: IFilterFront) => void;
  removeAllFilters: () => void;
};

const FiltersModal: FC<Props> = ({
  isOpen,
  filters,
  currentFilters,
  removeAllFilters,
  addFilter,
  close,
}) => {
  const menuClickHandler = (e) => {
    e.stopPropagation();
  };

  const removeAll = () => {
    removeAllFilters();
    close();
  };

  const applyAll = () => {
    const filterItems = document.querySelectorAll('.filtersJsButton');
    filterItems.forEach((item: any) => item.click());
    close();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.filtersModal} ${isOpen && styles.filtersModalOpen}`}
      onClick={close}
    >
      <div className={styles.filtersContent} onClick={menuClickHandler}>
        <div className={styles.filterHeader}>
          <div className={styles.filtersClose} onClick={close}>
            <Icon name="Cross" />
          </div>
          <div className={styles.filtersTitle}>Сортировка и фильтры </div>
        </div>
        <div className={styles.filtersBlock}>
          {filters.map((filter) => (
            <Accordeon
              key={filter.id}
              title={filter.name}
              className={styles.filtersAccordeon}
            >
              <GoodsFilterItem
                filter={filter}
                currentFilters={currentFilters}
                addFilter={addFilter}
                full
              />
            </Accordeon>
          ))}
        </div>
        <div className={styles.filtersButtons}>
          <Button text="Показать все" isFullScreen onClick={applyAll}></Button>
          <Button
            text="Очистить фильтры"
            isFullScreen
            onClick={removeAll}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
