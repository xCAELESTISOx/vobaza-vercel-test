import { Icon } from '@nebo-team/vobaza.ui.icon';
import React, { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  minCount?: number;
  itemCount: number;
  setItemCount: (itemCount: number) => void;
};

const ItemCounter: FC<Props> = ({ minCount = 1, itemCount, setItemCount }) => {
  const removeItem = () => {
    if (itemCount <= minCount) return;
    setItemCount(itemCount - 1);
  };
  const addItem = () => {
    setItemCount(itemCount + 1);
  };

  return (
    <div className={styles.itemCounter}>
      <Icon name="Minus" onClick={removeItem} />
      <input
        className={styles.itemCounterInput}
        type="text"
        id="count"
        name="count"
        value={itemCount}
      />
      <Icon name="SmallPlus" onClick={addItem} />
    </div>
  );
};

export default ItemCounter;
