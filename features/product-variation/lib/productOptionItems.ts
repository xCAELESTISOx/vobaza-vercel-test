import { getImagesVariationProducts } from './getImagesVariationProducts';
import { GetImagesVariationItems, GetDropdownVariationItems } from './productVariation';

/** Получение вариантов для  */
export const getDropdownVariationItems: GetDropdownVariationItems = (option, handelSelectOption) => {
  return option.values.map((val) => ({
    ...val.param,
    onClick: () => handelSelectOption(option.attribute.id, val.product),
  }));
};

/** Получение опций характеристик вариации типа IMAGE */
export const getImagesVariationItems: GetImagesVariationItems = (
  currentOption,
  products,
  variants,
  selectedOptions
) => {
  const productVariants = getImagesVariationProducts(products, variants, selectedOptions, currentOption.attribute.id);

  return (
    productVariants
      // Перенос активного элемента в начало списка
      .reduce((acc, element) => {
        if (selectedOptions[currentOption.attribute.id] == element.tooltipText) {
          return [element, ...acc];
        }
        return [...acc, element];
      }, [])
  );
};
