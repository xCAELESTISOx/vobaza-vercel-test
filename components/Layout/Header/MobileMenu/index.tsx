import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import type { IMenuItem } from 'src/models/IMenu';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import Search from '../Search';
import CitySelect from '../CitySelect';
import HeaderMobileSubMenuItem from './SubMenuItem';

import styles from './styles.module.scss';

type Props = {
  menu?: IMenuItem[];
  isOpen?: boolean;
  close: () => void;
};

export const HeaderMobileMenu: FC<Props> = ({ menu, isOpen, close }) => {
  const [currentMenuItem, setCurrentMenuItem] = useState<IMenuItem | null>(null);

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
    <div className={`${styles.headerMobileMenu} ${isOpen ? styles.active : ''}`}>
      <div className={`${styles.headerMobileMenuHeader}`}>
        {currentMenuItem && (
          <>
            <button className={styles.headerMobileMenuClose} onClick={resetMenuItem}>
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
              <Link href={currentMenuItem.link || '/'}>
                <a>Все товары раздела</a>
              </Link>
            </div>
            {currentMenuItem?.children?.map((child) => (
              <HeaderMobileSubMenuItem key={child.id} item={child} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.headerMobileMenuSearch}>
            <Search />
          </div>
          <div className={styles.headerMobileMenuCity}>
            <CitySelect withoutFetch />
          </div>
          <div className={styles.headerMobileMenuBlock}>
            {menu?.map((item) => (
              <div key={item.id} className={styles.headerMobileMenuList}>
                <div className={styles.headerMobileMenuListTitle}>{item.name}</div>
                <div className={styles.headerMobileMenuContent}>
                  {item.children?.map((menuItem) => (
                    <div
                      key={menuItem.id}
                      className={styles.headerMobileMenuItem}
                      onClick={() => setCurrentMenuItem(menuItem)}
                    >
                      <Icon name="Catalog" />
                      {menuItem.name}
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
