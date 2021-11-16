import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import Search from '../Search';
import CitySelect from '../CitySelect';
import HeaderMobileSubMenuItem from './SubMenuItem';

type Props = {
  rootMenu?: any;
  isOpen?: boolean;
  close: () => void;
};

const HeaderMobileMenu: FC<Props> = ({ rootMenu, isOpen, close }) => {
  const [currentMenuItem, setCurrentMenuItem] = useState(null);

  const menuClickHandler = (items) => {
    setCurrentMenuItem(items);
  };
  const resetMenuItem = () => {
    setCurrentMenuItem(null);
  };
  const closeHandler = () => {
    resetMenuItem();
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
      className={`${styles.headerMobileMenu} ${isOpen ? styles.active : ''}`}
    >
      <div className={`${styles.headerMobileMenuHeader}`}>
        {currentMenuItem && (
          <>
            <button
              className={styles.headerMobileMenuClose}
              onClick={resetMenuItem}
            >
              <Icon name="ArrowLeft" />
            </button>
            <div className={styles.headerMobileMenuTitle}>Диваны и кресла</div>
          </>
        )}
        <button className={styles.headerMobileMenuClose} onClick={closeHandler}>
          <Icon name="Cross" />
        </button>
        {!currentMenuItem && (
          <>
            <Link href="/">
              <a className={styles.headerMobileMenuLogo}>
                <Icon name="VobazaLogo" />
              </a>
            </Link>
            <a className={styles.headerMobileMenuPhone} href="tel:+74951725625">
              <Icon name="Phone" />
            </a>
          </>
        )}
      </div>
      {currentMenuItem ? (
        <>
          <div className={styles.headerMobileMenuSubBlock}>
            <div className={styles.headerMobileMenuSubTitle}>
              <Link href={currentMenuItem.href}>
                <a>Все товары раздела</a>
              </Link>
            </div>
            {currentMenuItem.menu.map((menu) => (
              <HeaderMobileSubMenuItem
                key={menu.title}
                item={menu}
              ></HeaderMobileSubMenuItem>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.headerMobileMenuSearch}>
            <Search />
          </div>
          <div className={styles.headerMobileMenuCity}>
            <CitySelect />
          </div>
          <div className={styles.headerMobileMenuBlock}>
            {rootMenu.map((item) => (
              <div key={item.title} className={styles.headerMobileMenuList}>
                <div className={styles.headerMobileMenuListTitle}>
                  {item.title}
                </div>
                <div className={styles.headerMobileMenuContent}>
                  {item.menu.map((menuItem) => (
                    <div
                      key={menuItem.title}
                      className={styles.headerMobileMenuItem}
                      onClick={() => menuClickHandler(menuItem)}
                    >
                      <Icon name="Catalog" />
                      {menuItem.title}
                      <Icon name="SmallArrowUp" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderMobileMenu;
