import React, { FC, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { IMenuItem } from 'src/models/IMenu';
import { getLinkFromMenuItem } from 'assets/utils/getLinkFromMenuItem';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

type Props = {
  item?: IMenuItem;
};

export const MobileMenuBlock: FC<Props> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const refPanel = useRef(null);

  const clickHandler = () => {
    if (isLoading || !refPanel.current) return;
    setIsLoading(true);
    if (isOpen) {
      refPanel.current.style.height = refPanel.current.scrollHeight + 'px';
      refPanel.current.style.overflow = 'hidden';
      setTimeout(() => {
        refPanel.current.style.height = 0;
        setIsLoading(false);
      }, 100);
    } else {
      refPanel.current.style.height = refPanel.current.scrollHeight + 'px';
      setTimeout(() => {
        refPanel.current.style.overflow = 'visible';
        refPanel.current.style.height = 'auto';
        setIsLoading(false);
      }, 400);
    }

    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.subMenuItem}>
      <div className={styles.subMenuHeader} onClick={clickHandler}>
        <Link href={getLinkFromMenuItem(item)}>
          <a className={styles.subMenuLink}>
            {item.icon && <Image src={item.icon} width={24} height={24} alt="" />}
            <span>{item.name}</span>
          </a>
        </Link>
        {item.children && (
          <Icon name="SmallArrowUp" className={`${styles.subMenuArrow} ${isOpen ? styles.active : ''}`} />
        )}
      </div>
      {item.children?.length && (
        <div className={styles.subMenuList} ref={refPanel}>
          {item.children.map((menuItem) => (
            <div key={menuItem.id} className={styles.subMenuListItem}>
              <Link href={getLinkFromMenuItem(menuItem)}>
                <a>{menuItem.name}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
