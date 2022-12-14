import React from 'react';
import styles from './styles.module.scss';

interface IVariant {
  code: string;
  value?: string;
}

interface ITarget {
  target: {
    name: string;
    value?: IVariant;
  };
}

type Props = {
  value: IVariant;
  options: IVariant[];
  name: string;
  onChange: (event: ITarget) => void;
};

const RadioTabsGroup = ({ value, options, name, onChange }: Props) => {
  const onChangeHandler = (val: IVariant) => {
    onChange({ target: { name, value: val } });
  };

  return (
    <div className={styles.tabsGroupWrapper}>
      <div className={styles.tabsGroup}>
        {options.map((variant) => {
          const isChecked = variant.code === value.code;
          return (
            <div
              key={variant.code}
              className={`${styles.tabsGroupItem} ${isChecked ? styles.checked : ''}`}
              onClick={() => onChangeHandler(variant)}
            >
              {variant.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export type { IVariant, ITarget };

export { RadioTabsGroup };
