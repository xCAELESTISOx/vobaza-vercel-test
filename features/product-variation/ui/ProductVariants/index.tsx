import React, { FC } from 'react';

import { useMatchMedia } from 'src/hooks/useMatchMedia';
import type { IProductVariant, IVariantProduct } from 'entities/products/model/IGood';
import { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { ProductOptionsImages } from 'widgets/products';
import { getImagesVariationProducts } from 'features/product-variation';

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
  const isMobile = useMatchMedia(500);

  const displayableAttr = attributesVariants.find(({ display }) => display?.display_type === 'IMAGE');
  const currentValue = selectedOptions[displayableAttr.attribute.id].code;
  const items = getImagesVariationProducts(
    productVariants,
    attributesVariants,
    selectedOptions,
    displayableAttr.attribute.id
  ).reduce((acc, element) => {
    if (element.id == productId) return [element, ...acc];
    return [...acc, element];
  }, []);

  const ITEMS_PER_ROW = isMobile ? 4 : 5;

  if (!items.length) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <ProductOptionsImages currentValue={currentValue} itemsLimit={ITEMS_PER_ROW} items={items} />
    </div>
  );
};

export { ProductVariants };
