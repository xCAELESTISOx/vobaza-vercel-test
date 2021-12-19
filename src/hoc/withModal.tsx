import React, { useEffect } from 'react';

import styles from './withModal.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';

export interface IModalLayout {
  onClose(): void;
}

export default function ModalLayout({
  children,
  onClose,
}: IModalLayout & { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);

  const modalClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalLayout} onClick={onClose}>
      <div className={styles.modal} onClick={modalClick}>
        <div className={styles.modalClose} onClick={onClose}>
          <Icon name="Cross" />
        </div>
        {children}
      </div>
    </div>
  );
}
