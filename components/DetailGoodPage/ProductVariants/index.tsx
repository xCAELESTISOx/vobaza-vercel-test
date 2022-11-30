import React, { FC, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useCollapse } from '../../../src/hooks/useCollapse';
import { useMatchMedia } from '../../../src/hooks/useMatchMedia';

import type { IProductVariants, IVariantProduct } from 'src/models/IGood';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

// TODO: Next-image
interface VariantProps {
  item: IVariantProduct & { color: string };
  active: boolean;
}

const Variant: FC<VariantProps> = ({ item, active = false }) => {
  return (
    <Link href={`/product/${item.slug}-${item.sku}`} passHref>
      <div className={`${styles.variant} ${active ? styles.variantActive : ''}`} title={item.slug}>
        <div className={styles.variantImg}>
          <Image
            src={item.main_image?.variants?.small?.url || PlaceholderImage}
            objectFit="contain"
            alt={item.color}
            height={48}
            width={48}
          />
        </div>
      </div>
    </Link>
  );
};

const getProductVariants = (
  productVariants: IProductVariants['variant_products'],
  attributesVariants: IProductVariants['variants']
): (IVariantProduct & { color: string })[] => {
  const displayableAttribute = attributesVariants.find(({ display }) => display?.display_type === 'IMAGE');

  if (!displayableAttribute) return [];

  const productIds = displayableAttribute.values.map(({ product }) => product.id);
  const newProducts = productVariants
    .filter(({ id }) => productIds.includes(id))
    .map((product) => {
      const value = displayableAttribute.values.find((value) => value.product.id === product.id);
      return { ...product, color: value?.value.toString() };
    });

  return newProducts;
};

interface ProductVariantsProps {
  id: number;
  productVariants: IProductVariants['variant_products'];
  attributesVariants: IProductVariants['variants'];
}

const ProductVariants: FC<ProductVariantsProps> = ({ id, productVariants = [], attributesVariants }) => {
  const hiddenVariantsRef = useRef(null);
  const [isOpen, toggleOpen] = useCollapse(hiddenVariantsRef, {
    duration: 300,
  });

  const items = getProductVariants(productVariants, attributesVariants);

  const isMobile = useMatchMedia(500);

  const ITEMS_PER_ROW = isMobile ? 4 : 5;

  const isOverLimit = items.length > ITEMS_PER_ROW;

  return (
    <div className={styles.variantsContainer}>
      <div className={styles.variantsGrid}>
        {items.slice(0, ITEMS_PER_ROW).map((item) => (
          <Variant key={item.id} item={item} active={item.id === id} />
        ))}
      </div>

      {isOverLimit && (
        <button className={styles.variantsToggleBtn} onClick={toggleOpen}>
          {!isOpen ? (
            <>
              +{items.length - ITEMS_PER_ROW}
              <span>цветов</span>
            </>
          ) : (
            <Icon name="Cross" />
          )}
        </button>
      )}

      {isOverLimit && (
        <div ref={hiddenVariantsRef} className={styles.variantsDrawer}>
          <div className={styles.variantsGrid}>
            {items.slice(ITEMS_PER_ROW).map((item) => (
              <Variant key={item.id} item={item} active={item.id === id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { ProductVariants };
