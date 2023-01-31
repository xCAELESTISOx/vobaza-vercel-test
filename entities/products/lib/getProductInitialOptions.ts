import { IGood } from '../model/IGood';

/** Получение дефолтных опций товара для вариаций */
export const getProductInitialOptions = (
  variation: IGood['variants'],
  productId: number
): Record<number, (string | number)[]> | null => {
  if (!variation?.variants) return null;
  const { products } = variation;

  const currentProduct = products.find(({ id }) => id === productId);
  const options = {};

  currentProduct.attributes.forEach((attribute) => {
    options[attribute.id] = attribute.value;
  });

  return options;
};
