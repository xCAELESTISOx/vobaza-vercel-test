import Link from 'next/link';

import type { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

interface ProductDelivery {
  className?: string;
  // pickup?: any;
  delivery?: any;
}

interface ProductDeliveryItem {
  children: ReactNode;
  title?: string;
  // link?: string;
}

const ProductDeliveryItem: FC<ProductDeliveryItem> = ({ title, children }) => {
  // Экспресс-доставка
  const deliveryAnchor =
    title.toLocaleLowerCase() === 'доставка'
      ? '#delivery'
      : title.toLocaleLowerCase() === 'экспресс-доставка'
      ? '#express'
      : '';
  return (
    <div className={styles.productDeliveryItem}>
      <Link href={`/dostavka${deliveryAnchor}`}>
        <a target="_blank" className={styles.productDeliveryItemType}>
          {title}
        </a>
      </Link>
      {children}
    </div>
  );
};

const ProductDelivery: FC<ProductDelivery> = ({ className = '', delivery }) => {
  return (
    <div className={className || ''}>
      <h3 className={styles.productDeliveryTitle}>Доставит ВоБаза</h3>

      {/* {pickup && (
        <ProductDeliveryItem title="Самовывоз">
          {` из ${pickup.places_count} пункта ВоБаза`}
          {pickup.nearest_date && ` с ${pickup.nearest_date}`}
        </ProductDeliveryItem>
      )} */}

      {delivery && delivery.default && (
        <ProductDeliveryItem title="Доставка">
          {` от ${delivery.default.start_price} рублей`}
          {/* {delivery.default.nearest_date &&
            ` с ${delivery.default.nearest_date}`} */}
        </ProductDeliveryItem>
      )}

      {delivery && delivery.express && (
        <ProductDeliveryItem title="Экспресс-доставка">
          {` от ${delivery.express.start_price} рублей`}
          {/* {delivery.default.nearest_date &&
            ` с ${delivery.express.nearest_date}`} */}
        </ProductDeliveryItem>
      )}
    </div>
  );
};

export { ProductDelivery };
