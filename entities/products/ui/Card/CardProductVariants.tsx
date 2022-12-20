import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { IGoodCard, IVariantProduct } from 'entities/products/model/IGood';
import { useMatchMedia } from 'shared/lib/hooks/useMatchMedia';
import { getImageVariantProps } from 'shared/lib/images';

import PlaceholderImageSmall from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

type Props = {
  good?: IGoodCard;
  setCurrentImage: (value: IVariantProduct) => void;
};

const CardProductVariants = ({ good, setCurrentImage }: Props) => {
  const isMobile = useMatchMedia(500);

  const VARIANTS_LIMIT = isMobile ? 3 : 4;

  return (
    <>
      {good.variant_products?.length > 0 &&
        good.variant_products.slice(0, VARIANTS_LIMIT).map((item) => (
          <Link key={item.id} href={`/product/${item.slug}-${item.sku}`}>
            <a
              onMouseEnter={() => {
                setCurrentImage(item);
              }}
              target="_blank"
            >
              <div className={styles.cardVariant}>
                {item.main_image ? (
                  <Image
                    {...getImageVariantProps(item.main_image.variants, 'small')}
                    objectFit="contain"
                    alt={good.name}
                    className={styles.variantImg}
                    height="100%"
                    width="100%"
                  />
                ) : (
                  <Image
                    src={PlaceholderImageSmall}
                    className={styles.variantImg}
                    objectFit="contain"
                    alt=""
                    height="100%"
                    width="100%"
                    unoptimized
                  />
                )}
              </div>
            </a>
          </Link>
        ))}
      {good.variant_products?.length > VARIANTS_LIMIT && (
        <Link href={`/product/${good.slug}-${good.sku}`}>
          <a target="_blank" className={styles.moreVariants}>
            +{good.variant_products.length - VARIANTS_LIMIT}
          </a>
        </Link>
      )}
    </>
  );
};

export default CardProductVariants;
