import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IProductVariant, IVariantProduct, ProductVariantValue } from 'entities/products';

/** Получение товаров вариации для опций-изображений */
export const getImagesVariationProducts = (
  products: IVariantProduct[],
  attributesVariants: IProductVariant<Variant | ProductVariantValue>[],
  selectedOptions: Record<number, Variant>,
  attrId: number | string
): (IVariantProduct & { tooltipText: string })[] => {
  const displayableAttribute = attributesVariants.find(({ attribute }) => attribute.id == attrId);

  if (!displayableAttribute) return [];

  const parameters = Object.values(selectedOptions).map(({ code }) => code);

  const newProducts = products
    // Фильтрация только товаров, которые имеют схожие характеристики
    .filter(({ attributes }) => {
      return attributes.every((attr) => {
        if (displayableAttribute.attribute.id === attr.id) return true;
        return (
          Object.keys(selectedOptions).includes(attr.id.toString()) &&
          parameters.includes(Array.isArray(attr.value) ? String(attr.value[0]) : attr.value.toString())
        );
      });
    })
    // Добавление текста тултипа
    .map((product) => {
      const text = product.attributes.find((attr) => attr.id === displayableAttribute.attribute.id);
      return { ...product, tooltipText: text.value.toString() };
    });

  return newProducts;
};
