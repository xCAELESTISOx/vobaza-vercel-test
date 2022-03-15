import type { FC } from 'react';

import { toNumberWithSpaces } from '../../../assets/utils/formatters';

import styles from './styles.module.scss';

interface ProductPrice {
  className?: string;
  price: number;
  beforeDiscountPrice?: number;
  discount?: number;
}

const ProductPrice: FC<ProductPrice> = (props) => {
  const { className = '', price, beforeDiscountPrice, discount } = props;

  const containerClasses = [className, styles.productPrice].join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.priceActual}>{toNumberWithSpaces(price)} ₽</div>
      {beforeDiscountPrice && (
        <div className={styles.priceOld}>
          {toNumberWithSpaces(beforeDiscountPrice)} ₽
        </div>
      )}
      {discount && (
        <div className={styles.priceDiscount}>
          <span>{discount}%</span>
        </div>
      )}
    </div>
  );
};

export { ProductPrice };
