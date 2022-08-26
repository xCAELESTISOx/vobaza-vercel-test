import type { IGood, IGoodCard, IGoodVariantsFront, IVariantsValue } from '../../../src/models/IGood';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { AttributeDataType, IAttributeColor } from 'src/models/IAttributes';

export default function normalizeGoods(goods: IGood[] | IGoodCard[]) {
  return goods.map((good) => ({
    ...good,
    price: good.price / 100,
    list_price: good.list_price ? good.list_price / 100 : null,
  }));
}

export const normalizeProductVariants = (productVariantsObj: IGood['variants']): IGoodVariantsFront => {
  const convertVariantValue = (val: IVariantsValue['value'], dataType: AttributeDataType): Variant => {
    let code = '';
    let value = '';
    // console.log(v);

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
