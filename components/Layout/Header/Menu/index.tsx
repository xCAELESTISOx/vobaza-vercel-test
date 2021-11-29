import React, { FC, Fragment, useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';

type Props = {
  rootMenu?: any;
  withRoot?: boolean;
};

const HeaderMenu: FC<Props> = ({ rootMenu, withRoot }) => {
  const [currentMenuItem, setCurrentMenuItem] = useState(
    withRoot ? rootMenu[0] : rootMenu
  );

  const menuTabHover = (e) => {
    if (e.target.dataset.tag) {
      setCurrentMenuItem(
        rootMenu.find((item) => item.tag === e.target.dataset.tag)
      );
    } else {
      setCurrentMenuItem(rootMenu[0]);
    }
  };

  useEffect(() => {
    setCurrentMenuItem(withRoot ? rootMenu[0] : rootMenu);
  }, [rootMenu]);

  return (
    <div className={`${styles.headerMenu} container`}>
      {rootMenu.menuTitle && (
        <Link href={rootMenu.menuTitle.href}>
          <a className={styles.headerMenuTitle}>{rootMenu.menuTitle.title}</a>
        </Link>
      )}
      <div className={styles.headerMenuContent}>
        {withRoot && (
          <div className={styles.rootMenu}>
            {rootMenu.map((menu) => (
              <Link key={menu.title} href={menu.href}>
                <a
                  data-tag={menu.tag}
                  onMouseEnter={menuTabHover}
                  className={`${styles.rootMenuLink} ${
                    menu.isDivided ? styles.rootMenuLinkDivided : ''
                  } 
                  ${currentMenuItem.tag === menu.tag ? styles.active : ''}`}
                >
                  <Icon name="Catalog" />
                  {menu.title}
                </a>
              </Link>
            ))}
            <Link href="/katalog">
              <a
                className={`${styles.rootMenuLink} ${styles.rootMenuLinkDivided}`}
              >
                Все товары
              </a>
            </Link>
          </div>
        )}
        <div className={styles.subMenu}>
          {currentMenuItem &&
            currentMenuItem.menu.map((menuList, index) => (
              <div key={index} className={styles.subMenuBlock}>
                {menuList.map((menu) => (
                  <Fragment key={menu.title}>
                    <Link href={menu.href}>
                      <a
                        className={`${styles.subMenuItem} ${
                          menu.children && styles.subMenuItemGray
                        }`}
                      >
                        {menu.title}
                      </a>
                    </Link>
                    {menu.children &&
                      menu.children.map((menu) => (
                        <Link key={menu.title} href={menu.href}>
                          <a className={styles.subMenuItem}>{menu.title}</a>
                        </Link>
                      ))}
                  </Fragment>
                ))}
              </div>
            ))}
        </div>
      </div>
      {rootMenu.allLink && (
        <div className={styles.headerMenuBottom}>
          <Link href={rootMenu.allLink.href}>
            <a className={styles.headerMenuBottomLink}>
              {rootMenu.allLink.title}
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderMenu;
