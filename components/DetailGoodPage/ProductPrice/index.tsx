import type { FC } from 'react';

import styles from './styles.module.scss';

interface ProductPrice {
  className?: string;
  price: number;
  discountPrice?: number;
  discount?: number;
}

const ProductPrice: FC<ProductPrice> = (props) => {
  const { className = '', price, discountPrice, discount } = props;

  const currentPrice = discountPrice || price;

  const containerClasses = [className, styles.productPrice].join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.priceActual}>{currentPrice} ₽</div>
      {discountPrice && <div className={styles.priceOld}>{price} ₽</div>}
      {discount && (
        <div className={styles.priceDiscount}>
          <span>{discount}%</span>
        </div>
      )}
    </div>
  );
};

export { ProductPrice };
