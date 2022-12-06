import type { IGood, IGoodCard } from '../../../src/models/IGood';

import { FavoriteGood } from 'components/Profile/Favorite/Item';

const getPrice = (price: number) => price / 100;

/** Нормализаци информации о товаре */
export const normalizeProductInfo = (productObject) => {
  const newProduct = { ...productObject };
  const normalizeProductRules = {
    price: getPrice,
    list_price: getPrice,
    labels: (labels) => labels.filter((l) => l.active).map((l) => l.code),
  };

  const computedFields = {
    creditMinimalPayment: (product) => {
      return Math.round(product.price / 12);
    },
    loyaltyBonus: (product) => {
      return Math.ceil(product.price * 0.1);
    },
    inStonk: (product) => {
      return product.quantity > 0;
    },
  };

  for (const fieldname in normalizeProductRules) {
    const normalizer = normalizeProductRules[fieldname];

    if (Boolean(newProduct[fieldname]) || newProduct[fieldname] === 0)
      newProduct[fieldname] = normalizer(newProduct[fieldname]);
  }

  for (const fieldname in computedFields) {
    const newFieldnameValue = computedFields[fieldname](newProduct);
    newProduct[fieldname] = newFieldnameValue;
  }

  newProduct.similar_products = newProduct.similar_products.map((item) => {
    return { ...item, price: getPrice(item.price), list_price: getPrice(item.list_price) };
  });

  return newProduct;
};

export const normalizeProductAttributes = (productAttributes) => {
  const additional = productAttributes.additional.filter((attrItem) => {
    const newItemAttrs = attrItem.attributes.filter((item) => Boolean(item.value));

    return newItemAttrs.length > 0;
  });

  return { ...productAttributes, additional };
};

export default function normalizeGoods(goods: IGood[] | IGoodCard[] | FavoriteGood[]): IGoodCard[] {
  return goods.map((good) => ({
    ...good,
    price: getPrice(good.price),
    list_price: good.list_price ? getPrice(good.list_price) : null,
  }));
}
