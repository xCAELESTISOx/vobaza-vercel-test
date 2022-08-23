import type { Variant } from 'components/UI/SelectTabs';
import type { IGood, IGoodCard, IVariantsValue } from '../../../src/models/IGood';

export default function normalizeGoods(goods: IGood[] | IGoodCard[]) {
  return goods.map((good) => ({
    ...good,
    price: good.price / 100,
    list_price: good.list_price ? good.list_price / 100 : null,
  }));
}

export const normalizeProductVariants = (productVariantsObj: IGood['variants']) => {
  const convertVariantValue = (v: IVariantsValue): Variant => {
    let code = '';
    let text = '';
    if (typeof v.value === 'boolean') {
      code = v.value === true ? 'YES' : 'NO';
      text = v.value === true ? 'Да' : 'Нет';
    } else {
      code = v.value.toString();
      text = v.value.toString();
    }
    return { code, text };
  };

  const variantsList = productVariantsObj.variants?.map((variant) => {
    const values = variant.values.map((valueItem) => {
      const value = convertVariantValue(valueItem);
      return { ...valueItem, value };
    });

    return { ...variant, values };
  });

  return { ...productVariantsObj, variants: variantsList };
};
