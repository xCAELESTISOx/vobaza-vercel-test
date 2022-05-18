import React, { FC, useRef } from 'react';

import { useCollapse } from '../../../src/hooks/useCollapse';
import { useMatchMedia } from '../../../src/hooks/useMatchMedia';

import type { IVariantProduct } from 'src/models/IGood';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

// TODO: Next-image

interface VariantProps {
  item: IVariantProduct;
  active: boolean;
}

const Variant: FC<VariantProps> = ({ item, active = false }) => {
  return (
    <Link href={`/product/${item.slug}_${item.id}_${item.sku}`}>
      <div
        className={`${styles.variant} ${active ? styles.variantActive : ''}`}
        title={item.slug}
      >
        <div className={styles.variantImg}>
          <Image width={48} height={48} src={item.main_image?.variants.small.url || PlaceholderImage} alt={item.slug} />
        </div>
      </div>
    </Link>
  );
};

interface ProductVariantsProps {
  id: number;
  items: IVariantProduct[];
}

const ProductVariants: FC<ProductVariantsProps> = ({
  id,
  items = [],
}) => {
  const hiddenVariantsRef = useRef(null);
  const [isOpen, toggleOpen] = useCollapse(hiddenVariantsRef, {
    duration: 300,
  });

  const isMobile = useMatchMedia(500);

  const ITEMS_PER_ROW = isMobile ? 4 : 5;

  const isOverLimit = items.length > ITEMS_PER_ROW;

  return (
    <div className={styles.variantsContainer}>
      <div className={styles.variantsGrid}>
        {items.slice(0, ITEMS_PER_ROW).map((item) => (
          <Variant
            key={item.id}
            item={item}
            active={item.id === id}
          />
        ))}
      </div>

      {isOverLimit && (
        <button
          className={styles.variantsToggleBtn}
          onClick={toggleOpen as any}
        >
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
              <Variant
                key={item.id}
                item={item}
                active={item.id === id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { ProductVariants };
