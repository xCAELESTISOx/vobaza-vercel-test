import React, { FC, useRef, useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import type { IMenuItem } from 'src/models/IMenu';
import { getLinkFromMenuItem } from 'shared/lib/getLinkFromMenuItem';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

type Props = {
  item?: IMenuItem;
  onClose?: () => void;
};

export const MobileMenuBlock: FC<Props> = ({ item, onClose = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const linkRef = useRef(null);

  const refPanel = useRef(null);
  const router = useRouter();
  const isExpress = router.asPath.includes('/ekspress-dostavka');

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (isLoading || !refPanel.current) return;
    if (e.target === linkRef.current) {
      onClose();
      return;
    }
    setIsLoading(true);
    if (isOpen) {
      refPanel.current.style.height = refPanel.current.scrollHeight + 'px';
      refPanel.current.style.overflow = 'hidden';
      setTimeout(() => {
        if (refPanel.current) {
          refPanel.current.style.height = 0;
        }
        setIsLoading(false);
      }, 100);
    } else {
      refPanel.current.style.height = refPanel.current.scrollHeight + 'px';
      setTimeout(() => {
        if (refPanel.current) {
          refPanel.current.style.overflow = 'visible';
          refPanel.current.style.height = 'auto';
        }
        setIsLoading(false);
      }, 400);
    }

    setIsOpen(!isOpen);
  };

  const onCloseHandler = () => {
    onClose();
  }

  return (
    <div className={styles.subMenuItem}>
      <div className={styles.subMenuHeader} onClick={clickHandler}>
        {getLinkFromMenuItem(item, isExpress) ? (
          <Link href={getLinkFromMenuItem(item, isExpress)}>
          <a className={styles.subMenuLink} >
            {item.icon && <Image src={item.icon} width={24} height={24} alt="" />}
            <span ref={linkRef}>{item.name}</span>
          </a>
          </Link>
        ) : (
          <div className={styles.subMenuLink}>
            {item.icon && <Image src={item.icon} width={24} height={24} alt="" />}
            <span>{item.name}</span>
          </div>
        )}
       
        {item.children && (
          <Icon name="SmallArrowUp" className={`${styles.subMenuArrow} ${isOpen ? styles.active : ''}`} />
        )}
      </div>
      {item.children?.length && (
        <div className={styles.subMenuList} ref={refPanel}>
          {item.children.map((menuItem) => (
            <div key={menuItem.id} className={styles.subMenuListItem}>
              <Link href={getLinkFromMenuItem(menuItem, isExpress)}>
                <a onClick={onCloseHandler}>{menuItem.name}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
