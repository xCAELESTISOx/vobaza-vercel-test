import { Icon } from '@nebo-team/vobaza.ui.icon';
import React, { FC, useEffect, useState } from 'react';

import styles from './styles.module.scss';

type Props = {
  minCount?: number;
  itemCount: number;
  setItemCount: (itemCount: number) => void;
  isLoading?: boolean;
  isWhite?: boolean;
};

const ItemCounter: FC<Props> = ({
  minCount = 1,
  itemCount,
  setItemCount,
  isLoading,
  isWhite,
}) => {
  const [value, setValue] = useState(itemCount);

  const setValueHandler = (e) => {
    if (
      Number(e.target.value) === 0 ||
      Number(e.target.value) ||
      e.target.value === ''
    ) {
      setValue(e.target.value);
    }
  };
  const removeItem = () => {
    if (itemCount <= minCount) return;
    setItemCount(+itemCount - 1);
  };
  const addItem = () => {
    setItemCount(+itemCount + 1);
  };
  const setCount = () => {
    if (!value || value < minCount) {
      setValue(minCount);
      setItemCount(minCount);
    } else {
      setItemCount(value);
    }
  };

  useEffect(() => {
    setValue(itemCount);
  }, [itemCount]);

  return (
    <div
      className={`${styles.itemCounter} ${isWhite ? styles.white : ''} ${
        isLoading ? styles.disabled : ''
      }`}
    >
      <Icon name="Minus" onClick={removeItem} />
      <input
        className={styles.itemCounterInput}
        type="text"
        id="count"
        name="count"
        value={value}
        onChange={setValueHandler}
        onBlur={setCount}
      />
      <Icon name="SmallPlus" onClick={addItem} />
    </div>
  );
};

export default ItemCounter;
