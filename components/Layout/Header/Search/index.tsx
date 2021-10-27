import React, { FC } from 'react';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';

const Search: FC = () => {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.search}
        title="Найти товар или категорию..."
        placeholder="Найти товар или категорию..."
      />
      <button className={styles.searchButton}>
        <Icon className={styles.searchIcon} name="Magnifier"></Icon>
      </button>
    </div>
  );
};
export default Search;
