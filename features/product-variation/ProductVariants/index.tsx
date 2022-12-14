import React, { FC, useRef } from 'react';
import Tooltip from 'rc-tooltip';
import Image from 'next/image';
import Link from 'next/link';

import { useCollapse } from '../../../src/hooks/useCollapse';
import { useMatchMedia } from '../../../src/hooks/useMatchMedia';
import type { IProductVariant, IVariantProduct } from 'entities/products/model/IGood';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';
import { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';

interface VariantProps {
  item: IVariantProduct & { color: string };
  active: boolean;
}

const ProductVariantTile: FC<VariantProps> = ({ item, active = false }) => {
  return (
    <Link href={`/product/${item.slug}-${item.sku}`} passHref>
      <Tooltip placement="top" overlay={<span>{item.color}</span>}>
        <a className={`${styles.variant} ${active ? styles.variantActive : ''}`} title={item.slug}>
          <div className={styles.variantImg}>
            <Image
              src={item.main_image?.variants?.small?.url || PlaceholderImage}
              objectFit="contain"
              alt=""
              height="100%"
              width="100%"
            />
          </div>
        </a>
      </Tooltip>
    </Link>
  );
};

const getProductVariants = (
  products: IVariantProduct[],
  attributesVariants: IProductVariant[],
  selectedOptions: Record<number, Variant>
): (IVariantProduct & { color: string })[] => {
  const displayableAttribute = attributesVariants.find(({ display }) => display?.display_type === 'IMAGE');

  if (!displayableAttribute) return [];

  const parameters = Object.values(selectedOptions).map(({ code }) => code);

  const newProducts = products
    .filter(({ attributes }) => {
      return attributes.every((attr) => {
        if (displayableAttribute.attribute.id === attr.id) return true;
        return (
          Object.keys(selectedOptions).includes(attr.id.toString()) &&
          parameters.includes(Array.isArray(attr.value) ? String(attr.value[0]) : attr.value.toString())
        );
      });
    })
    .map((product) => {
      const color = product.attributes.find((attr) => attr.id === displayableAttribute.attribute.id);
      return { ...product, color: color.value.toString() };
    });

  return newProducts;
};

interface ProductVariantsProps {
  productId: number;
  selectedOptions: Record<number, Variant>;
  productVariants: IVariantProduct[];
  attributesVariants: IProductVariant[];
}

const ProductVariants: FC<ProductVariantsProps> = ({
  productId,
  selectedOptions,
  productVariants = [],
  attributesVariants,
}) => {
  const hiddenVariantsRef = useRef(null);
  const [isOpen, toggleOpen] = useCollapse(hiddenVariantsRef, {
    duration: 300,
  });

  const items = getProductVariants(productVariants, attributesVariants, selectedOptions);

  const isMobile = useMatchMedia(500);

  const ITEMS_PER_ROW = isMobile ? 4 : 5;

  const isOverLimit = items.length > ITEMS_PER_ROW;

  if (!items.length) return null;

  return (
    <div className={styles.variantsContainer}>
      <div className={styles.variantsGrid}>
        {items.slice(0, ITEMS_PER_ROW).map((item) => (
          <ProductVariantTile key={item.id} item={item} active={item.id === productId} />
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
              <ProductVariantTile key={item.id} item={item} active={item.id === productId} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { ProductVariants };
