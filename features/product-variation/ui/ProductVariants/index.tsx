import React, { FC } from 'react';

import { useMatchMedia } from 'shared/lib/hooks/useMatchMedia';
import type { IProductVariant, IVariantProduct } from 'entities/products/model/IGood';
// import { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { ProductOptionsImages } from 'widgets/products';
// import { getImagesVariationProducts } from 'features/product-variation';

/** Получение товаров для изображений вариации */
const getProductsVariants = (productVariants: IVariantProduct[], attributesVariants: IProductVariant[]) => {
  const displayableAttr = attributesVariants.find(({ display }) => display?.display_type === 'IMAGE');
  const products = [];

  displayableAttr.values.forEach((val) => {
    const newProduct = productVariants.find(({ attributes }) => {
      const attr = attributes.find(({ id }) => id == displayableAttr.attribute.id);

      if (Array.isArray(val)) {
        return (attr.value as string[]).every((i) => (val as string[]).includes(i));
      }
      return (attr.value as string[]).includes(val as string);
    });

    const tooltipText = displayableAttr.attribute.data_type === 'BOOLEAN' ? (val === true ? 'Да' : 'Нет') : String(val);

    if (newProduct) products.push({ ...newProduct, tooltipText });
  });

  return products;
};

interface ProductVariantsProps {
  productId: number;
  // selectedOptions: Record<number, Variant>;
  productVariants: IVariantProduct[];
  attributesVariants: IProductVariant[];
}

const ProductVariants: FC<ProductVariantsProps> = ({ productId, productVariants = [], attributesVariants }) => {
  const isMobile = useMatchMedia(500);

  const displayableAttr = attributesVariants.find(({ display }) => display?.display_type === 'IMAGE');

  if (!displayableAttr) return null;

  // const items = getImagesVariationProducts(
  //   productVariants,
  //   attributesVariants,
  //   selectedOptions,
  //   displayableAttr.attribute.id
  // ).reduce((acc, element) => {
  const items = getProductsVariants(productVariants, attributesVariants).reduce((acc, element) => {
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
