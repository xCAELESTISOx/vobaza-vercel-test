import React, { FC, useRef } from 'react';
import { useCollapse } from '../../../src/hooks/useCollapse';
import { useMatchMedia } from '../../../src/hooks/useMatchMedia';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

// TODO: Next-image

interface VariantProps {
  item: any;
  active: boolean;
  onClick: (item: any) => void;
}

const Variant: FC<VariantProps> = ({ item, active = false, onClick }) => {
  const handleClick = () => {
    onClick && onClick(item);
  };

  return (
    <div
      className={`${styles.variant} ${active ? styles.variantActive : ''}`}
      title={item.title}
      onClick={handleClick}
    >
      <div className={styles.variantImg}>
        <img src={item.src} alt={item.title} />
      </div>
    </div>
  );
};

interface ProductVariantsProps {
  items: any[];
  selected: any;
  onChange?: (item: any) => void;
}

const ProductVariants: FC<ProductVariantsProps> = ({
  items = [],
  selected = null,
  onChange = () => {},
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
        {items.slice(0, ITEMS_PER_ROW).map((item, index) => (
          <Variant
            key={item.id}
            item={item}
            active={selected && selected.id === item.id}
            onClick={onChange}
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
            {items.slice(ITEMS_PER_ROW).map((item, index) => (
              <Variant
                key={item.id}
                item={item}
                active={selected && selected.id === item.id}
                onClick={onChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { ProductVariants };
