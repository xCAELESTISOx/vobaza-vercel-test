import React, { FC, useState } from 'react';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import { useRouter } from 'next/router';

const Search: FC = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const setValueHandler = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: {
        text: value,
      },
    });
    setValue('');
  };

  return (
    <form className={styles.searchContainer} onSubmit={onSubmit}>
      <input
        name="text"
        className={styles.search}
        value={value}
        onChange={setValueHandler}
        title="Найти товар или категорию..."
        placeholder="Найти товар или категорию..."
      />
      <button className={styles.searchButton} type="submit">
        <Icon className={styles.searchIcon} name="Magnifier"></Icon>
      </button>
    </form>
  );
};
export default Search;
