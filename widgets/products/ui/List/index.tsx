import React, { FC } from 'react';

import type { IGoodCard } from '../../../../entities/products/model/IGood';

import { ProductCard } from '../../../../entities/products';

import styles from './styles.module.scss';

type Props = {
  goods: IGoodCard[];
};

const GoodsList: FC<Props> = ({ goods }) => {
  return (
    <div className={styles.goodsList}>
      {goods.map((good) => (
        <ProductCard key={good.id} good={good} />
      ))}
    </div>
  );
};

export { GoodsList };
