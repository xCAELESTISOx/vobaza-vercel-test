import Image from 'next/image';
import React from 'react';

import type { ICartGood } from 'components/Cart/ListItem';
import { getImageVariantProps } from 'shared/lib/images';

import PlaceholderImage from 'assets/images/placeholder_small.png';
import styles from './../styles.module.scss';

const DeliveryItems = ({ goods }: { goods: ICartGood[] }) => {
  return (
    <div className={styles.orderDeliveryItems}>
      {goods
        .filter((item) => !!item.price)
        .map(({ product }) => (
          <div key={product.id} className={styles.orderDeliveryItem}>
            {product.main_image ? (
              <Image
                {...getImageVariantProps(product.main_image.variants, 'small')}
                objectFit="contain"
                alt={product.name}
              />
            ) : (
              <Image src={PlaceholderImage} objectFit="contain" alt={product.name} unoptimized />
            )}
          </div>
        ))}
    </div>
  );
};

export default DeliveryItems;
