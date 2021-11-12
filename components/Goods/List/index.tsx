import React, { FC } from 'react';
import GoodsCard from '../Card';

import styles from './styles.module.scss';

type Props = {
  goods: any[];
};

const GoodsList: FC<Props> = ({ goods }) => {
  return (
    <div className={styles.goodsList}>
      {goods.map((good) => (
        <GoodsCard key={good} />
      ))}
    </div>
  );
};

export default GoodsList;
