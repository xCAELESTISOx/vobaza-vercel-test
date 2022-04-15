import type { FC } from 'react';

import { toNumberWithSpaces } from '../../../assets/utils/formatters';

import styles from './styles.module.scss';

interface ProductPrice {
  className?: string;
  price: number;
  list_price?: number;
  beforeDiscountPrice?: number;
}

const ProductPrice: FC<ProductPrice> = ({
  className = '',
  price,
  list_price,
  beforeDiscountPrice,
}) => {
  const containerClasses = [className, styles.productPrice].join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.priceActual}>{toNumberWithSpaces(price)} ₽</div>
      {beforeDiscountPrice && (
        <div className={styles.priceOld}>
          {toNumberWithSpaces(beforeDiscountPrice)} ₽
        </div>
      )}
      {list_price && (
        <div className={styles.priceDiscount}>
          <span>{Math.round((price / list_price) * 100 - 100)}%</span>
        </div>
      )}
    </div>
  );
};

export { ProductPrice };
