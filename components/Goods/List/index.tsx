import React, { FC } from 'react';
import GoodsCard from '../Card';

import styles from './styles.module.scss';

const GoodsList: FC = () => {
  return (
    <div className="container">
      <div className={styles.goodsList}>
        {[1, 2, 3, 4, 5, 6].map((good) => (
          <GoodsCard key={good} />
        ))}
      </div>
    </div>
  );
};

export default GoodsList;
