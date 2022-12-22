import React, { useEffect } from 'react';

import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IProductVariant, IVariantProduct } from 'entities/products/model/IGood';
import { SelectVariationOption } from 'features/product-variation';
import { useToggle } from 'shared/lib/hooks/useToggle';

import ProductOptionTile from './ui/ProductOptionTile';

import styles from './styles.module.scss';

const ITEMS_LIMIT = 5;

type Props = {
  option: IProductVariant<{ product: IVariantProduct; param: Variant }>;
  currentProductId: string | number;
  onClick: SelectVariationOption;
};

const ProductOptionsTiles = ({ option, currentProductId, onClick }: Props) => {
  const [showMore, toggleShowMore] = useToggle(false);

  const { attribute, display, values } = option;

  const limitedValues = [...values];
  limitedValues.splice(display?.count || ITEMS_LIMIT);

  const showButton = (display?.count || ITEMS_LIMIT) < values.length;

  useEffect(() => {
    toggleShowMore(false);
  }, []);

  return (
    <div className={styles.optionTiles}>
      {(showMore ? values : limitedValues).map((option) => {
        return (
          <ProductOptionTile
            key={option.param.code}
            isCurrent={currentProductId == option.product.id}
            onClick={() => onClick(attribute.id, option.product)}
            value={option.param.value}
          />
        );
      })}
      {showButton && (
        <ProductOptionTile value={showMore ? 'Скрыть' : 'Показать еще'} isMoreButton onClick={toggleShowMore} />
      )}
    </div>
  );
};

export { ProductOptionsTiles };
