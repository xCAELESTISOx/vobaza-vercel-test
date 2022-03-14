import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import MenuIcon from '../Icons/MenuIcon';

type Props = {
  rootMenu?: any;
  withRoot?: boolean;
  closeMenu?: () => void;
};

const HeaderMenu: FC<Props> = ({ rootMenu, withRoot, closeMenu }) => {
  const [isAllTags, setIsAllTags] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState(
    withRoot ? rootMenu[0] : rootMenu
  );

  const showAllMenuTags = () => {
    setIsAllTags(true);
  };
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
    setIsAllTags(false);
  }, [rootMenu]);

  return (
    <div className={`${styles.headerMenu} container`}>
      <div className={styles.headerMenuContent}>
        {withRoot && (
          <div className={styles.rootMenu}>
            {rootMenu.map((menu) => (
              <div
                key={menu.title}
                className={`${
                  menu.isDivided ? styles.rootMenuItemDivided : ''
                } `}
              >
                <Link href={menu.href}>
                  <a
                    data-tag={menu.tag}
                    onMouseEnter={menuTabHover}
                    onClick={closeMenu}
                    className={`${styles.rootMenuLink}
                  ${currentMenuItem.tag === menu.tag ? styles.active : ''}`}
                  >
                    <MenuIcon name={menu.icon} />
                    {menu.title}
                  </a>
                </Link>
              </div>
            ))}
            <div className={styles.rootMenuItemDivided}>
              <Link href="/katalog">
                <a className={`${styles.rootMenuLink}`}>Все товары</a>
              </Link>
            </div>
          </div>
        )}
        {withRoot ? (
          <div className={styles.subMenuRoot}>
            {currentMenuItem &&
              currentMenuItem.menu.map((rootMenuItem, index) => (
                <div key={index}>
                  <Link href={rootMenuItem.href || '/'}>
                    <a className={styles.subMenuRootTitle} onClick={closeMenu}>
                      {rootMenuItem.title}
                    </a>
                  </Link>
                  {rootMenuItem.children && (
                    <div className={styles.subMenuRootBlockList}>
                      {rootMenuItem.children.map((menuList, index) => (
                        <div key={index} className={styles.subMenuBlock}>
                          {menuList &&
                            menuList.length > 0 &&
                            menuList.map((menu) => (
                              <Link key={menu.title} href={menu.href}>
                                <a
                                  className={styles.subMenuItem}
                                  onClick={closeMenu}
                                >
                                  {menu.title}
                                </a>
                              </Link>
                            ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className={styles.subMenu}>
            {currentMenuItem &&
              currentMenuItem.menu.map((menuList, index) => (
                <div key={index} className={styles.subMenuBlock}>
                  {menuList &&
                    menuList.length > 0 &&
                    menuList.map((menu) => (
                      <Link key={menu.title} href={menu.href}>
                        <a className={styles.subMenuItem} onClick={closeMenu}>
                          {menu.title}
                        </a>
                      </Link>
                    ))}
                </div>
              ))}
          </div>
        )}
      </div>
      {rootMenu.tags && (
        <div className={styles.headerMenuTags}>
          {(isAllTags ? rootMenu.tags : rootMenu.tags.slice(0, 11)).map(
            (tag) => (
              <div key={tag.title} className={styles.headerMenuTagItem}>
                <Link href={tag.href}>
                  <a
                    className={`${styles.headerMenuTagLink} ${
                      false ? styles.active : ''
                    }`}
                  >
                    {tag.title}
                  </a>
                </Link>
              </div>
            )
          )}
          {rootMenu.tags.length > 11 && !isAllTags && (
            <div className={styles.headerMenuTagItem} onClick={showAllMenuTags}>
              <div className={`${styles.headerMenuTagLink} ${styles.lined}`}>
                Показать еще
              </div>
            </div>
          )}
        </div>
      )}
      {rootMenu.links && (
        <div className={styles.headerMenuBottom}>
          {rootMenu.links.map((link) => (
            <div key={link.title} className={styles.headerMenuBottomItem}>
              <Link href={link.href}>
                <a className={styles.headerMenuBottomLink}>{link.title}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderMenu;
