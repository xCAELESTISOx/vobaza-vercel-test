import type { IGood, IGoodCard, IGoodVariantsFront, IVariantsValue } from '../../../src/models/IGood';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IAttributeColor } from 'src/models/IAttributes';
import { AttributeDataType } from 'src/models/IAttributes';

const getPrice = (price: number) => {
  return price / 100;
};

export const normalizeProductVariants = (productVariantsObj: IGood['variants']): IGoodVariantsFront => {
  const convertVariantValue = (val: IVariantsValue['value'], dataType: AttributeDataType): Variant => {
    let code = '';
    let value = '';

    switch (dataType) {
      case AttributeDataType.BOOLEAN:
        code = val === true ? 'YES' : 'NO';
        value = val === true ? 'Да' : 'Нет';
        break;
      case AttributeDataType.MANY_FROM_MANY:
        code = (val as string[]).toString();
        value = (val as string[]).join(', ');
        break;
      case AttributeDataType.COLOR:
        () => {
          const newCode = (val as IAttributeColor[]).map(({ code }) => code).join(',');
          const newVal = (val as IAttributeColor[]).map(({ value }) => value).join(',');
          code = newCode + 'ТЕСТ ЦВЕТА';
          value = newVal + 'ТЕСТ ЦВЕТА';
        };
        break;
      default:
        code = val.toString();
        value = val.toString();
    }

    return { code, value };
  };

  const variantsList =
    productVariantsObj.variants?.map((variant) => {
      const { values, attribute } = variant;

      const newValues = values.map((valueItem) => {
        const newValue = convertVariantValue(valueItem.value, attribute.data_type);
        return { ...valueItem, value: newValue };
      });

      return { ...variant, values: newValues };
    }) || null;

  return { ...productVariantsObj, variants: variantsList };
};

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

    if (!!newProduct[fieldname] || newProduct[fieldname] === 0)
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
    const newItemAttrs = attrItem.attributes.filter((item) => !!item.value);

    return newItemAttrs.length > 0;
  });

  return { ...productAttributes, additional };
};

export default function normalizeGoods(goods: IGood[] | IGoodCard[]) {
  return goods.map((good) => ({
    ...good,
    price:  getPrice(good.price),
    list_price: good.list_price ? getPrice(good.list_price) : null,
  }));
}