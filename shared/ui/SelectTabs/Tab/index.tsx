import React, { FC } from 'react';

import styles from './styles.module.scss';

interface Tab {
  text: string;
  active: boolean;
  onClick: () => void;
}

const Tab: FC<Tab> = ({ text, active, onClick = () => {} }) => {
  return (
    <button
      className={active ? styles.tabActive : styles.tab}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Tab };
