import React, { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

const categories = [
  {
    title: 'Диваны',
  },
  {
    title: 'Кресла',
  },
  {
    title: 'Кровати',
  },
  {
    title: 'Матрасы',
  },
  {
    title: 'Шкафы',
  },
  {
    title: 'Тумбы',
  },
  {
    title: 'Столы',
  },
  {
    title: 'Текстиль',
  },
];

const MainHeader: FC = () => {
  return (
    <div className={`${styles.subHeaderContainer} container`}>
      <nav className={styles.subHeader}>
        <button
          className={`${styles.headerCategory} ${styles.headerCategoryAll}`}
        >
          <Icon name="MenuBurger" className={styles.categoryAllIcon} /> Все
          товары
        </button>
        {categories.map((category) => (
          <Link href="/" key={category.title}>
            <a className={styles.headerCategory}>{category.title}</a>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainHeader;
