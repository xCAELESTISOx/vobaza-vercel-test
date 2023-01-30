import React, { FC, useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import type { IMenuItem } from 'src/models/IMenu';
import { getLinkFromMenuItem } from 'shared/lib/getLinkFromMenuItem';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { CollapsingMenu } from '../CollapsingMenu';

import styles from './styles.module.scss';

type Props = {
  mainMenu?: IMenuItem[];
  sideMenu?: IMenuItem[];
};

export const HeaderMenu: FC<Props> = ({ mainMenu, sideMenu }) => {
  const [currentMenu, setCurrentMenu] = useState<IMenuItem | IMenuItem[]>(null);
  const [withRoot, setWithRoot] = useState(false);

  const router = useRouter();
  const isExpress = router.asPath.includes('/ekspress-dostavka');
  const katalogLink = isExpress ? '/katalog/ekspress-dostavka' : '/katalog';

  const openMenuAll = () => {
    setWithRoot(true);
    setCurrentMenu(sideMenu);
  };

  const openFullMenu = (e: any) => {
    setWithRoot(false);
    if (mainMenu[e.target.dataset.index]) {
      setCurrentMenu(mainMenu[e.target.dataset.index]);
    } else {
      setCurrentMenu(null);
    }
  };

  const closeMenu = () => {
    setWithRoot(false);
    setCurrentMenu(null);
  };

  const isSideMenu = currentMenu instanceof Array;

  return (
    <div className={`${styles.menuContainer}`} onMouseLeave={closeMenu}>
      {(isSideMenu || (!isSideMenu && currentMenu?.children)) && (
        <CollapsingMenu menu={currentMenu} withRoot={isSideMenu} closeMenu={closeMenu} isSideMenu={isSideMenu} />
      )}
      <nav className={styles.menu}>
        <Link href={katalogLink}>
          <a
            className={`${styles.headerCategory} ${styles.headerCategoryAll} ${withRoot ? styles.active : ''}`}
            onMouseEnter={openMenuAll}
            onClick={() => {
              closeMenu();
            }}
          >
            <Icon name="MenuBurger" /> Каталог
          </a>
        </Link>
        <div className={styles.headerMenuItems}>
          {mainMenu?.map((item, index) => (
            <HeaderMenuItem key={item.id} index={index} item={item} openFullMenu={openFullMenu} closeMenu={closeMenu} />
          ))}
        </div>
      </nav>
    </div>
  );
};

type MainMenuItemProps = {
  index: number;
  item: IMenuItem;
  openFullMenu: (e: MouseEvent<HTMLAnchorElement>) => void;
  closeMenu: () => void;
};

const HeaderMenuItem = ({ index, item, openFullMenu, closeMenu }: MainMenuItemProps) => {
  const router = useRouter();
  const isExpress = router.asPath.includes('/ekspress-dostavka');
  const link = getLinkFromMenuItem(item, isExpress);

  return (
    <Link href={link}>
      <a
        className={` ${styles.headerCategory} ${router.asPath.includes(link) ? styles.active : ''}`}
        data-index={index}
        onMouseEnter={openFullMenu}
        onClick={() => {
          closeMenu();
        }}
      >
        {item.name}
      </a>
    </Link>
  );
};
