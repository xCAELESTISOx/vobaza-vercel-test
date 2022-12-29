import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IProductVariant, IVariantProduct, ProductVariantValue } from 'entities/products';

/** Получение товаров вариации для опций-изображений */
export const getImagesVariationProducts = (
  products: IVariantProduct[],
  attributesVariants: IProductVariant<Variant | ProductVariantValue>[],
  selectedOptions: Record<number, (string | number)[]>,
  attrId: number | string
): (IVariantProduct & { tooltipText: string })[] => {
  const displayableAttribute = attributesVariants.find(({ attribute }) => attribute.id == attrId);

  if (!displayableAttribute) return [];

  const newProducts = products
    // Фильтрация только товаров, которые имеют схожие характеристики
    .filter(({ attributes }) => {
      return attributes.every((attr) => {
        if (displayableAttribute.attribute.id === attr.id) return true;

        if (Array.isArray(attr.value)) {
          return (
            (attr.value as string[]).every((el) => {
              return selectedOptions[attr.id].map(String).includes(String(el));
            }) && attr.value.length === selectedOptions[attr.id].length
          );
        } else {
          return selectedOptions[attr.id].map(String).includes(String(attr.value));
        }
      });
    })

    // Добавление текста тултипа
    .map((product) => {
      const text = product.attributes.find((attr) => attr.id === displayableAttribute.attribute.id);
      let tooltipText = String(text.value);

      if (text.data_type === 'BOOLEAN') tooltipText = String(text.value) === 'true' ? 'Да' : 'Нет';

      return { ...product, tooltipText };
    });

  return newProducts;
};
