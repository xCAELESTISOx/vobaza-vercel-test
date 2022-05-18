import React, { FC } from 'react';

import { Tab } from './Tab';

import styles from './styles.module.scss';

export interface Variant {
  code?: string;
  id?: string;
  text: string;
  onClick?: () => void;
}

interface SelectTabs {
  label: string;
  value: null | Variant;
  variants: Variant[];
  keyField?: string;
  onChange: (item: Variant) => void;
}

const SelectTabs: FC<SelectTabs> = ({
  label = '',
  value = null,
  variants = [],
  keyField = 'code',
  onChange,
}) => {
  const handleClickTab = (tab: Variant) => {
    onChange && onChange(tab);
    tab.onClick && tab.onClick()
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.itemList}>
        {variants.map((tab) => {
          const isActive =
            value &&
            (tab[keyField] === value[keyField] || tab.text === value.text);

          return (
            <div key={tab[keyField] || tab.text} className={styles.item}>
              <Tab
                active={isActive}
                text={tab.text}
                onClick={() => handleClickTab(tab)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { SelectTabs };
