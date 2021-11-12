import { FC } from 'react';
import { FilterSelect } from '@nebo-team/vobaza.ui.filter-select';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';

const GoodsFilters: FC = () => {
  return (
    <div className={styles.filtersBlock}>
      <div className={styles.filters}>
        <FilterSelect
          variation="secondary"
          variants={[
            { code: 'min', value: '0' },
            { code: 'max', value: '264300' },
          ]}
          type="range"
          values={[0, 264300]}
          placeholder="Цена"
          buttonText="Показать"
          onButtonClick={() => {}}
        />
        <FilterSelect
          variation="secondary"
          variants={[
            { code: '1', value: 'Для детской', isActive: false },
            { code: '2', value: 'Для кабинета', isActive: false },
            { code: '3', value: 'Для прихожей', isActive: false },
          ]}
          type="checkbox"
          placeholder="Комната"
          buttonText="Показать"
          onButtonClick={() => {}}
        />
        <FilterSelect
          variation="secondary"
          variants={[
            { code: '1', value: '120x200', isActive: false },
            { code: '2', value: '140x200', isActive: false },
            { code: '3', value: '160x70', isActive: false },
            { code: '4', value: '160x80', isActive: false },
            { code: '5', value: '160x200', isActive: false },
            { code: '6', value: '190x80', isActive: false },
            { code: '7', value: '200x140', isActive: false },
          ]}
          type="checkbox"
          placeholder="Размер спального места"
          buttonText="Показать"
          onButtonClick={() => {}}
          withSearch
        />
        <button className={styles.filtersButton}>Еще фильтры</button>
      </div>
      <button className={styles.filtersMobileButton}>
        <Icon name="Filters" />
        Фильтры
        <span className={styles.filtersBadge}>1</span>
      </button>
      <div className={styles.sort}>
        <FilterSelect
          className={styles.sortItem}
          variation="secondary"
          variants={[
            { code: 'item1', value: 'По популярности' },
            { code: 'item2', value: 'Новинки выше' },
            { code: 'item3', value: 'Дешевые выше' },
            { code: 'item4', value: 'Дорогие выше' },
          ]}
          selected={{ code: 'item1', value: 'По популярности' }}
          isRightSide
        />
      </div>
    </div>
  );
};

export default GoodsFilters;
