import { FC } from 'react';

import type { IGoodFront, IVariantProduct } from 'entities/products/model/IGood';
import type { Variant as SelectVariant, Variant } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';

import { getImagesVariationProducts, ProductOptionsTiles } from 'features/product-variation';
import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';
import { ProductOptionsImages } from '../ProductOptionsImages';
import { SelectTabs } from 'shared/ui/SelectTabs';

import styles from './styles.module.scss';

type Props = {
  variants: IGoodFront['variants'];
  selectedOptions: Record<number, Variant>;
  handelSelectOption: (id: string | number, value: Variant) => void;
};

export const ProductOptions: FC<Props> = ({ variants, selectedOptions, handelSelectOption }) => {
  const options = variants.variants.map((variant) => {
    // Сортировка по возрастанию/в алфавитном порядке
    const sortedValues = variant.values
      .sort((a, b) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      })
      // Перенос активного элемента в начало списка
      .reduce((acc, element) => {
        if (selectedOptions[variant.attribute.id].code == element.code) {
          return [element, ...acc];
        }
        return [...acc, element];
      }, []);

    // Опции для селектов
    const values = sortedValues
      .filter((val) => {
        // Проверка, может ли найтись товар при нажатии на данную опцию
        return (
          val.code !== null &&
          variants.products.some(({ attributes }) => {
            const attributesIds = attributes.map(({ id }) => id);

            const attr = attributes.find(({ id }) => id === variant.attribute.id);

            const options = { ...selectedOptions };
            delete options[attr.id];
            const parameters = Object.values(options).map(({ code }) => code);

            // Проверка, есть ли в вариации другой товар с подходящими характеристиками
            const canBeFound = [...parameters, val.code].every((param) => {
              return attributes.some((attr) => {
                return Array.isArray(attr.value)
                  ? attr.value.map(String).includes(param.toString())
                  : attr.value == param;
              });
            });

            if (attributesIds.includes(attr.id) && canBeFound) return true;
          })
        );
      })
      .map(({ code, value }) => {
        const product: IVariantProduct = variants.products.find(({ attributes }) => {
          const parameters = Object.values(selectedOptions).map(({ code }) => code);
          return attributes.every(
            (attr) =>
              Object.keys(selectedOptions).includes(attr.id.toString()) &&
              parameters.includes(Array.isArray(attr.value) ? attr.value[0].toString() : attr.value.toString())
          );
        });

        return { product, param: { code, value } as Variant };
      });

    // .map(({ code, value }) => ({ code, value }));

    return { ...variant, values };
  });

  if (!options) return null;

  return (
    <div className={styles.productOptions}>
      {options.map((option) => {
        const { attribute, display, values } = option;

        if (values.length)
          return (
            <div className={styles.productOption} key={attribute.id + attribute.name}>
              {{
                TILE: (
                  <>
                    <span className={styles.productOptionLabel}>{attribute.name}</span>
                    <ProductOptionsTiles
                      selectedOptions={selectedOptions}
                      option={option}
                      onClick={handelSelectOption}
                    />
                  </>
                ),
                IMAGE: (() => {
                  const products = getImagesVariationProducts(
                    variants.products,
                    variants.variants,
                    selectedOptions,
                    attribute.id
                  );

                  const items = products
                    .map((product) => {
                      const attr = product.attributes.find(({ id }) => id == attribute.id);
                      return { ...product, tooltipText: attr.value[0] };
                    })
                    // Перенос активного элемента в начало списка
                    .reduce((acc, element) => {
                      if (selectedOptions[attribute.id].code == element.tooltipText) {
                        return [element, ...acc];
                      }
                      return [...acc, element];
                    }, []);

                  return (
                    <>
                      <span className={styles.productOptionLabel}>{attribute.name}</span>
                      <ProductOptionsImages
                        currentValue={selectedOptions[attribute.id].code}
                        itemsLimit={2}
                        items={items}
                      />
                    </>
                  );
                })(),
                DROPDOWN: (
                  <InputSelect
                    name={attribute.id.toString()}
                    label={attribute.name}
                    currentValue={selectedOptions[attribute.id]}
                    variants={values.map(({ param }) => param)}
                    onChange={(value) => handelSelectOption(attribute.id, value as SelectVariant)}
                  />
                ),
                CHOICE: (
                  <SelectTabs
                    label={attribute.name}
                    value={selectedOptions[attribute.id]}
                    variants={values.map(({ param }) => param)}
                    onChange={(value) => handelSelectOption(attribute.id, value)}
                  />
                ),
              }[display?.display_type] ?? (
                <>
                  {values.length > 3 ? (
                    <InputSelect
                      name={attribute.id.toString()}
                      label={attribute.name}
                      currentValue={selectedOptions[attribute.id]}
                      variants={values.map(({ param }) => param)}
                      onChange={(value) => handelSelectOption(attribute.id, value as SelectVariant)}
                    />
                  ) : (
                    <>
                      <span className={styles.productOptionLabel}>{attribute.name}</span>
                      <SelectTabs
                        value={selectedOptions[attribute.id]}
                        label={attribute.name}
                        variants={values.map(({ param }) => param)}
                        onChange={(value) => handelSelectOption(attribute.id, value)}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          );
      })}
    </div>
  );
};
