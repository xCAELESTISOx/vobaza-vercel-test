import type { IGoodFront } from 'src/models/IGood';
import type { Variant as SelectVariant, Variant } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';

import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';
import { SelectTabs } from 'components/UI/SelectTabs';

import styles from './styles.module.scss';

type Props = {
  variants: IGoodFront['variants'];
  selectedOptions: Record<number, Variant>;
  handelSelectOption: (id: string | number, value: Variant) => void;
};

export const ProductOptions = ({ variants, selectedOptions, handelSelectOption }: Props) => {
  const options = variants.variants.map((variant) => {
    // Сортировка по возрастанию/в алфавитном порядке
    const sortedValues = variant.values.sort((a, b) => {
      if (a.code < b.code) return -1;
      if (a.code > b.code) return 1;
      return 0;
    });

    // Опции для селектов
    const values = sortedValues
      .filter((val) => {
        // Проверка, может ли найтись товар при нажатии на данную опцию
        return variants.products.some(({ attributes }) => {
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
        });
      })
      .map((val) => {
        const code = val.code;
        const value = val.value;

        return { code, value };
      });

    return { ...variant, values };
  });

  if (!options) return <div />;

  return (
    <div className={styles.productOptions}>
      {options.map(({ attribute, values }) => {
        return (
          <div className={styles.productOption} key={attribute.id + attribute.name}>
            {values.length > 5 ? (
              <InputSelect
                name={attribute.id.toString()}
                label={attribute.name}
                currentValue={selectedOptions[attribute.id]}
                variants={values}
                onChange={(value) => handelSelectOption(attribute.id, value as SelectVariant)}
              />
            ) : (
              <SelectTabs
                label={attribute.name}
                value={selectedOptions[attribute.id]}
                variants={values}
                onChange={(value) => handelSelectOption(attribute.id, value)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
