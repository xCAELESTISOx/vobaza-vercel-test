import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { IMenuItem } from 'src/models/IMenu';
import { getLinkFromMenuItem } from 'assets/utils/getLinkFromMenuItem';

import MenuIcon from '../Icons/MenuIcon';

import styles from './styles.module.scss';

type Props = {
  withRoot?: boolean;
  menu: IMenuItem | IMenuItem[];
  closeMenu?: () => void;
};

export const CollapsingMenu: FC<Props> = ({ menu, withRoot, closeMenu }) => {
  const [currentMenuItem, setCurrentMenuItem] = useState<IMenuItem>(withRoot ? menu[0] : menu);

  const [allProducts, setAllProducts] = useState(false);

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
    setCurrentMenuItem(withRoot ? menu[0] : menu);
  }, [menu]);

  return (
    <div className={`${styles.collapsingMenu} container`}>
      <div className={styles.headerMenuContent}>
        {withRoot && (
          <div className={styles.rootMenu}>
            {(menu as IMenuItem[]).map((group, index) => (
              <div key={group.id} className={`${index > 0 ? styles.rootMenuItemDivided : ''} `}>
                {group.children?.map((item) => (
                  <div key={item.id}>
                    <Link href={getLinkFromMenuItem(item)}>
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
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {Boolean(currentMenuItem.children?.length) && (
          <div className={`${styles.collapsingMenuBody} ${withRoot ? styles.big : ''}`}>
            {currentMenuItem.children.map((block) => (
              <CollapsingMenuItem key={block.id} menuBlock={block} closeMenu={closeMenu} />
            ))}
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

  return (
    <div className={styles.collapsingMenuBlock}>
      {getLinkFromMenuItem(menuBlock) ? (
        <Link href={getLinkFromMenuItem(menuBlock)}>
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
              <Link key={item.id} href={getLinkFromMenuItem(item)}>
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
