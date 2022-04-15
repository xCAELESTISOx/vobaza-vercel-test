import React, { useEffect } from 'react';

import styles from './withModal.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

export interface IModalLayout {
  isWide?: boolean;
  onClose(): void;
}

export default function ModalLayout({
  isWide,
  children,
  onClose,
}: IModalLayout & { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const modalClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalLayout} onClick={onClose}>
      <div
        className={`${styles.modal} ${isWide ? styles.wide : ''}`}
        onClick={modalClick}
      >
        <div className={styles.modalClose} onClick={onClose}>
          <Icon name="Cross" />
        </div>
        {children}
      </div>
    </div>
  );
}
