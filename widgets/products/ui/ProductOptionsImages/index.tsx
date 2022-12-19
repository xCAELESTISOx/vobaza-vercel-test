import React, { FC } from 'react';

import type { IVariantProduct } from 'entities/products';
import { useToggle } from 'src/hooks/useToggle';

import { ProductOptionsImage } from 'features/product-variation/ui/ProductOptionsImage';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';

const ITEMS_LIMIT = 4;

type Props = {
  itemsLimit: number;
  currentValue?: string;
  items: (IVariantProduct & { tooltipText: string })[];
};

const ProductOptionsImages: FC<Props> = ({ itemsLimit, currentValue, items }) => {
  const [showMore, toggleShowMore] = useToggle(false);

  const limitedItems = [...items];
  limitedItems.splice(itemsLimit || ITEMS_LIMIT);

  const showButton = (itemsLimit || ITEMS_LIMIT) < items.length;

  return (
    <div className={styles.variantsContainer}>
      <div className={styles.variantsGrid}>
        {(showMore ? items : limitedItems).map((item) => {
          return <ProductOptionsImage key={item.tooltipText} item={item} active={item.tooltipText == currentValue} />;
        })}
        {showButton && (
          <button className={styles.variantsToggleBtn} onClick={toggleShowMore} aria-label="Показать больше вариаций">
            {!showMore ? (
              <>
                +{items.length - itemsLimit}
                <span>цветов</span>
              </>
            ) : (
              <Icon name="Cross" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export { ProductOptionsImages };
