import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { IGoodCard } from 'entities/products/model/IGood';
import { getImageVariantProps } from 'shared/lib/images';

import PlaceholderImageSmall from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

type Props = {
  good?: IGoodCard;
  setCurrentImage: (value: any) => void;
};

const CardProductVariants = ({ good, setCurrentImage }: Props) => {
  return (
    <>
      {good.variant_products?.length > 0 &&
        good.variant_products.slice(0, 4).map((item) => (
          <Link key={item.id} href={`/product/${item.slug}-${item.sku}`} passHref>
            <a
              onMouseEnter={() => {
                setCurrentImage(item);
              }}
              target="_blank"
            >
              <div className={styles.cardVariant}>
                {item.main_image ? (
                  <Image
                    {...getImageVariantProps(item.main_image.variants, 'extra_small')}
                    objectFit="contain"
                    alt={good.name}
                  />
                ) : (
                  <Image src={PlaceholderImageSmall} objectFit="contain" alt="" unoptimized />
                )}
              </div>
            </a>
          </Link>
        ))}
      {good.variant_products && good.variant_products.length > 4 && (
        <Link href={`/product/${good.slug}-${good.sku}`} passHref>
          <a target="_blank">
            <div className={styles.cardVariant}>+{good.variant_products.length - 4}</div>
          </a>
        </Link>
      )}
    </>
  );
};

export default CardProductVariants;
