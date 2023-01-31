import React, { FC } from 'react';

import { Tab } from './Tab';

import styles from './styles.module.scss';
import { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';

type SelectTabs = {
  label?: string;
  value: null | Variant;
  variants: Variant[];
  keyField?: string;
  onChange?: (item: Variant) => void;
};

const SelectTabs: FC<SelectTabs> = ({ label = '', value = null, variants = [], keyField = 'code', onChange }) => {
  const handleClickTab = (tab: Variant) => {
    onChange && onChange(tab);
    tab.onClick && tab.onClick();
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.itemList}>
        {variants.map((tab) => {
          const isActive = value && (tab[keyField] === value[keyField] || tab.value === value.value);

          return (
            <div key={tab[keyField] || tab.value} className={styles.item}>
              <Tab active={isActive} text={tab.value} onClick={!isActive ? () => handleClickTab(tab) : () => {}} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { SelectTabs };
