import { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { AttributeDataType } from 'src/models/IAttributes';
import { IGood, IProductVariant, IVariantProduct, ProductVariantValue } from 'entities/products/model/IGood';

/** Нормализация вариантов товаров, приведение values вариаций к типу Variant */
export const normalizeProductVariation = (
  variants?: IGood['variants']
): {
  products: IVariantProduct[];
  variants: IProductVariant<Variant>[];
} | null => {
  if (!variants) return null;

  const convertVariantValue = (val: ProductVariantValue, dataType: AttributeDataType): Variant => {
    if (val === null) return { code: null, value: '–' };

    let value = '';
    let code = '';

    switch (dataType) {
      case 'BOOLEAN':
        code = val === true ? 'YES' : 'NO';
        value = val === true ? 'Да' : 'Нет';
        break;
      // case 'MANY_FROM_MANY':
      //   code = (val as string[]).toString();
      //   value = (val as string[]).join(', ');
      //   break;
      default:
        code = val.toString();
        value = val.toString();
    }

    return { code, value };
  };

  const variantsList: IProductVariant<Variant>[] =
    variants.variants?.map((variant) => {
      const { values, attribute } = variant;

      const newValues = values.map((value) => convertVariantValue(value, attribute.data_type)).filter(Boolean);

      return { ...variant, values: newValues };
    }) || null;

  /* Для отображения миниатюр вариаций необходимо удалить из опций первый 
        в списке элемент с типом отображения IMAGE */
  const imageVariantIndex = variantsList?.findIndex(({ display }) => display?.display_type === 'IMAGE');
  imageVariantIndex > -1 && variantsList?.splice(imageVariantIndex, 1);
  //
  return { ...variants, variants: variantsList };
};