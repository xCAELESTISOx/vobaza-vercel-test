import React, { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import Search from '../Search';

const MainHeader: FC = () => {
  return (
    <div className="container">
      <div className={`${styles.mainHeader}`}>
        <div className={styles.mainHeaderMobile}>
          <button className={styles.burgerMenu}>
            <Icon name="MenuBurger" />
          </button>
          <Link href="/">
            <a className={styles.logo}>
              <Icon name="VobazaLogo" />
            </a>
          </Link>
          <a href="tel:+74951725578" className={styles.phoneButton}>
            <Icon name="Phone" />
          </a>
        </div>
        <button className={styles.headerCity}>
          Ростов-на-Дону
          <Icon name="SmallArrowDown" />
        </button>
        <div className={styles.headerSearch}>
          <Search />
        </div>
        <div className={styles.phoneWraper}>
          <div className={styles.phone}>+7(495) 172-57-64</div>
          <Link href="/">
            <a className={styles.phoneLink}>Заказать звонок</a>
          </Link>
        </div>
        <div className={styles.headerButtons}>
          <div className={styles.headerButton}>
            <Icon name="Person"></Icon>
            <span>Войти</span>
          </div>
          <Link href="/wishlist">
            <a className={styles.headerButton}>
              <Icon name="Person"></Icon>
              <span>Избранное</span>
            </a>
          </Link>
          <Link href="/compare">
            <a className={styles.headerButton}>
              <Icon name="Person"></Icon>
              <span>Сравнение</span>
            </a>
          </Link>
          <Link href="/cart">
            <a className={styles.headerButton}>
              <Icon name="Person"></Icon>
              <span>Корзина</span>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.headerSearchFull}>
        <Search />
      </div>
    </div>
  );
};

export default MainHeader;
