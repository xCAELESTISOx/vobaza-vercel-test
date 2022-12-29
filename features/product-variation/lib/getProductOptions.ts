import { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { IGood, IProductVariant, IVariantProduct, ProductVariantValue } from 'entities/products';
import { AttributeDataType } from 'src/models/IAttributes';

type GetProductOptions = (
  productId: number | string,
  variants: IGood['variants'],
  selectedOptions: Record<number, (string | number)[]>
) => IProductVariant<{ product: IVariantProduct; param: Variant }>[];

/** Возвращает опции вариации товара */
export const getProductOptions: GetProductOptions = (productId, variants, selectedOptions) => {
  const options: IProductVariant<{ product: IVariantProduct; param: Variant }>[] = variants?.variants
    ?.map((variant) => {
      // Сортировка по возрастанию/в алфавитном порядке
      const sortedValues = variant.values.sort((a, b) => {
        if (String(a) < String(b)) return -1;
        if (String(a) > String(b)) return 1;
        return 0;
      });
      //   // Перенос активного элемента в начало списка
      //   .reduce((acc, element) => {
      //     if (selectedOptions[variant.attribute.id].code == element.code) {
      //       return [element, ...acc];
      //     }
      //     return [...acc, element];
      //   }, []);

      // // Опции для селектов
      const values = sortedValues
        .map((val) => {
          // Поиск товара, все аттрибуты которого сходятся с аттрибутами текущего товара,
          // кроме итерируемой характеристики
          const product: IVariantProduct = variants.products.find(({ attributes }) => {
            const params = { ...selectedOptions, [variant.attribute.id]: Array.isArray(val) ? val : [val] };

            // Проверка все ли атрибута товара совпадают с необходимыми
            return attributes.every((attr) => {
              if (!params[attr.id]) return true;

              if (Array.isArray(attr.value)) {
                return (attr.value as string[]).every((el) => {
                  // console.log(el);
                  return params[attr.id].map(String).includes(String(el));
                });
              } else {
                return params[attr.id].map(String).includes(String(attr.value));
              }
            });
          });

          if (product) return { product, param: val };
        })
        .filter(Boolean)
        .map((option) => ({ ...option, param: convertVariantValue(option.param, variant.attribute.data_type) }))
        .reduce((acc, elem) => {
          if (productId == elem.product.id) {
            return [elem, ...acc];
          }
          return [...acc, elem];
        }, []);

      return { ...variant, values };
    })
    .filter(({ values }) => values.length);

  return options || [];
};

const convertVariantValue = (val: ProductVariantValue, dataType: AttributeDataType): Variant => {
  let newValue: Variant;
  switch (dataType) {
    case 'BOOLEAN':
      (() => {
        const code = String(val);
        const value = val === true ? 'Да' : 'Нет';

        newValue = { code, value };
      })();
      break;
    default:
      (() => {
        const code = String(val);
        const value = String(val);

        newValue = { code, value };
      })();
      break;
  }

  return newValue;
};
