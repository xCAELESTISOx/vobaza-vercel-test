import React, { FC, useRef, useState } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';

type Props = {
  item?: any;
};

const HeaderMobileSubMenuItem: FC<Props> = ({ item }) => {
  const refPanel = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = () => {
    if (isLoading) return;
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
        <Link href={item.href}>
          <a className={styles.subMenuLink}>
            <Icon className={styles.subMenuImage} name="Catalog" />
            {item.title}
          </a>
        </Link>
        {item.children && (
          <Icon
            name="SmallArrowUp"
            className={`${styles.subMenuArrow} ${isOpen ? styles.active : ''}`}
          />
        )}
      </div>
      {item.children && (
        <div className={styles.subMenuList} ref={refPanel}>
          {item.children.map((menuItem) => (
            <div key={menuItem.title} className={styles.subMenuListItem}>
              <Link href={item.href}>
                <a>{menuItem.title}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderMobileSubMenuItem;
