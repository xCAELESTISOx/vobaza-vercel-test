import React, { useEffect } from 'react';

import styles from './withDrawer.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';

export interface IModalLayout {
  isOpen: boolean;
  title?: string;
  buttonText?: string;
  isFullHeight?: boolean;
  onButtonClick?(): void;
  onClose(): void;
}

export default function Drawer({
  isOpen,
  title,
  buttonText,
  isFullHeight,
  children,
  onClose,
  onButtonClick,
}: IModalLayout & { children: React.ReactNode }) {
  const drawerClickHandler = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.drawer} ${isOpen ? styles.active : ''} ${
        isFullHeight ? styles.fullHeight : ''
      }`}
      onClick={onClose}
    >
      <div className={styles.drawerContent} onClick={drawerClickHandler}>
        <button type="button" className={styles.drawerClose} onClick={onClose}>
          <Icon name="Cross" />
        </button>
        {title && (
          <div className={styles.drawerHeader}>
            <div className={styles.drawerTitle}>{title}</div>
          </div>
        )}
        <div className={styles.drawerBlock}>{children}</div>
        <div className={styles.drawerButton}>
          <Button
            text={buttonText}
            size="big"
            isFullScreen
            onClick={onButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
