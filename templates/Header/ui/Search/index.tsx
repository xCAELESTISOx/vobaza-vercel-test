import React, { FC, FormEvent, SyntheticEvent, useState } from 'react';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { useRouter } from 'next/router';

const Search: FC = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const setValueHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      <button className={styles.searchButton} type="submit" aria-label="Искать товар или категорию">
        <Icon className={styles.searchIcon} name="Magnifier"></Icon>
      </button>
    </form>
  );
};
export default Search;
