import React, { FC } from 'react';

import { useMatchMedia } from 'shared/lib/hooks/useMatchMedia';
import { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IProductVariant, IVariantProduct } from 'entities/products/model/IGood';

import { ProductOptionsImages } from 'widgets/products';

/** Получение товаров для изображений вариации */
const getProductsVariants = (
  productVariants: IVariantProduct[],
  attributesVariants: IProductVariant[],
  selectedOptions: Record<number, Variant>
) => {
  const displayableAttr = attributesVariants.find(({ display }) => display?.display_type === 'IMAGE');
  const products = [];

  displayableAttr.values.forEach((val) => {
    const newProduct = productVariants.find(({ attributes }) => {
      const opts = { ...selectedOptions, [displayableAttr.attribute.id]: { code: val[0], value: val[0] } };

      return attributes.every((attr) => (attr.value as string[]).map(String).includes(opts[attr.id].code));
    });

    const tooltipText = displayableAttr.attribute.data_type === 'BOOLEAN' ? (val === true ? 'Да' : 'Нет') : String(val);

    if (newProduct) products.push({ ...newProduct, tooltipText });
  });

  return products;
};

interface ProductVariantsProps {
  productId: number;
  productVariants: IVariantProduct[];
  attributesVariants: IProductVariant[];
  selectedOptions: Record<number, Variant>;
}

const ProductVariants: FC<ProductVariantsProps> = ({
  productId,
  productVariants = [],
  attributesVariants,
  selectedOptions,
}) => {
  const isMobile = useMatchMedia(500);

  const displayableAttr = attributesVariants.find(({ display }) => display?.display_type === 'IMAGE');

  if (!displayableAttr) return null;

  const items = getProductsVariants(productVariants, attributesVariants, selectedOptions).reduce((acc, element) => {
    if (element.id == productId) return [element, ...acc];
    return [...acc, element];
  }, []);

  const ITEMS_PER_ROW = isMobile ? 4 : 5;

  if (!items.length) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <ProductOptionsImages
        currentProductId={productId}
        itemsLimit={displayableAttr.display?.count || ITEMS_PER_ROW}
        items={items}
      />
    </div>
  );
};

export { ProductVariants };
