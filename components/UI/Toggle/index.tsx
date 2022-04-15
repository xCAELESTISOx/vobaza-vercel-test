import React, { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
};

const Toggle: FC<Props> = ({ children, isActive = false, onClick }) => {
  return (
    <div
      className={`${styles.toggleBlock} ${
        isActive && styles.toggleBlockActive
      }`}
      onClick={onClick}
    >
      <div className={styles.toggle} />
      <div className={styles.toggleText}>{children}</div>
    </div>
  );
};

export default Toggle;
