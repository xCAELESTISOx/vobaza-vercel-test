import React, { FC } from 'react';
import GoodsCard from '../Card';

import styles from './styles.module.scss';
import { IGood } from '../../../src/models/IGood';

type Props = {
  goods: IGood[];
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
