import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import type { IMenuItem } from 'src/models/IMenu';
import { getLinkFromMenuItem } from 'shared/lib/getLinkFromMenuItem';

import MenuIcon from '../Icons/MenuIcon';

import styles from './styles.module.scss';

type Props = {
  withRoot?: boolean;
  menu: IMenuItem | IMenuItem[];
  closeMenu?: () => void;
  isSideMenu: boolean;
};

// Разделяет категории по полю is_sticky для переноса
const getGroupedCategories = (list: IMenuItem[] = []) => {
  const res: IMenuItem[][] = [];
  list.forEach((category) => {
    if (!category.is_sticky) {
      res.push([category]);
    } else {
      if (!res.length) res.push([]);
      res[(res.length || 1) - 1].push(category);
    }
  });

  return res;
};

export const CollapsingMenu: FC<Props> = ({ menu, withRoot, closeMenu, isSideMenu }) => {
  const [currentMenuItem, setCurrentMenuItem] = useState<IMenuItem>(withRoot ? menu[0] : menu);
  const [groupedCategories, setGroupedCategories] = useState<IMenuItem[][]>([]);

  const [allProducts, setAllProducts] = useState(false);

  const router = useRouter();
  const isExpress = router.asPath.includes('/ekspress-dostavka');

  const menuTabHover = (e, parentId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setAllProducts(false);
    if (e.target.dataset.id) {
      const currentGroup = (menu as IMenuItem[]).find(({ id }) => id === parentId);
      const newCurrentItem = currentGroup.children.find((item) => item.id === +e.target.dataset.id);

      setCurrentMenuItem(newCurrentItem || menu[0]);
    } else {
      setCurrentMenuItem(menu[0]);
    }
  };

  useEffect(() => {
    setCurrentMenuItem(withRoot ? menu[0].children[0] : menu);
  }, [menu]);

  useEffect(() => {
    if (!!currentMenuItem.children?.length) {
      setGroupedCategories(getGroupedCategories(currentMenuItem.children));
    }
  }, [currentMenuItem]);

  return (
    <div className={`${styles.collapsingMenu} container`}>
      <div className={styles.collapsingMenuIn}></div>
      <div className={styles.headerMenuContent}>
        {withRoot && (
          <div className={styles.rootMenu}>
            {(menu as IMenuItem[]).map((group, index) => (
              <div key={group.id} className={`${index > 0 ? styles.rootMenuItemDivided : ''} `}>
                {group.children?.map((item) => (
                  <div key={item.id}>
                    {getLinkFromMenuItem(item, isExpress) ? (
                      <Link href={getLinkFromMenuItem(item, isExpress)}>
                        <a
                          data-id={item.id}
                          onMouseEnter={(e) => menuTabHover(e, group.id)}
                          onClick={closeMenu}
                          className={`${styles.rootMenuLink}
                      ${!allProducts && currentMenuItem.id === item.id ? styles.active : ''}`}
                        >
                          {item.icon && (
                            <Image className={styles.rootMenuItemIcon} src={item.icon} alt="" width={32} height={32} />
                          )}
                          <span>{item.name}</span>
                        </a>
                      </Link>
                    ) : (
                      <div
                        data-id={item.id}
                        onMouseEnter={(e) => menuTabHover(e, group.id)}
                        onClick={closeMenu}
                        className={`${styles.rootMenuLink}
                     ${!allProducts && currentMenuItem.id === item.id ? styles.active : ''}`}
                      >
                        {item.icon && (
                          <Image className={styles.rootMenuItemIcon} src={item.icon} alt="" width={32} height={32} />
                        )}
                        <span>{item.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {Boolean(currentMenuItem.children?.length) && (
          <div
            className={`${styles.collapsingMenuBody} ${withRoot ? styles.big : ''} ${
              isSideMenu ? styles.sideMenu : ''
            }`}
          >
            <>
              {groupedCategories.map((block, index) => {
                return (
                  <div key={'collapsingMenublock' + index} className={styles.collapsingMenuItem}>
                    {block.map((item) => (
                      <CollapsingMenuItem key={item.id} menuBlock={item} closeMenu={closeMenu} />
                    ))}
                  </div>
                );
              })}
            </>
          </div>
        )}
      </div>
    </div>
  );
};

type ICollapsingMenuItemProps = {
  menuBlock: IMenuItem;
  closeMenu: () => void;
};

export const CollapsingMenuItem = ({ menuBlock, closeMenu }: ICollapsingMenuItemProps) => {
  const items = menuBlock.children || [];
  const router = useRouter();
  const isExpress = router.asPath.includes('/ekspress-dostavka');

  return (
    <div className={styles.collapsingMenuBlock}>
      {getLinkFromMenuItem(menuBlock) ? (
        <Link href={getLinkFromMenuItem(menuBlock, isExpress)}>
          <a className={styles.collapsingMenuBlockTitle} onClick={closeMenu}>
            {menuBlock.name}
            <MenuIcon name="arrow" />
          </a>
        </Link>
      ) : (
        <div className={styles.collapsingMenuBlockTitle}>{menuBlock.name}</div>
      )}
      {Boolean(items?.length) && (
        <div className={styles.collapsingMenuBlockItems}>
          {items.map((item) =>
            getLinkFromMenuItem(item) ? (
              <Link key={item.id} href={getLinkFromMenuItem(item, isExpress)}>
                <a className={styles.collapsingMenuBlockItem} onClick={closeMenu}>
                  {item.name}
                </a>
              </Link>
            ) : (
              <div key={item.id} className={styles.collapsingMenuBlockItem} onClick={closeMenu}>
                {item.name}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
