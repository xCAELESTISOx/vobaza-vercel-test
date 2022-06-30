import React, { FC } from 'react';

import type { IGoodCard } from '../../../src/models/IGood';

import GoodsCard from '../Card';

import styles from './styles.module.scss';

type Props = {
  goods: IGoodCard[];
};

const GoodsList: FC<Props> = ({ goods }) => {
  return (
    <div className={styles.goodsList}>
      {goods.map((good) => (
        <GoodsCard key={good.id} good={good} />
      ))}
    </div>
  );
};

export default GoodsList;
