import { useRouter } from 'next/router';

import type { IVariantsValueFront, IVariantProduct, IGoodVariantsFront } from 'src/models/IGood';
import type { Variant as SelectVariant, Variant } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';

import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';
import { SelectTabs } from 'components/UI/SelectTabs';

import styles from './styles.module.scss';

type Props = {
  variants: IGoodVariantsFront;
  selectedOptions: Record<number, Variant>;
  handelSelectOption: (id: string | number, value: Variant) => void;
};

export const ProductOptions = ({ variants, selectedOptions, handelSelectOption }: Props) => {
  const router = useRouter();

  const onOptionClick = (product: IVariantProduct) => {
    const destination = `/product/${product.slug}-${product.sku}`;

    if (destination !== router.asPath) router.push(destination);
  };

  const options = variants.variants.map((option) => {
    // Сортировка по возрастанию/в алфавитном порядке
    const sortedValues = option.values.sort((a: IVariantsValueFront, b: IVariantsValueFront) => {
      if (a.value.code < b.value.code) return -1;
      if (a.value.code > b.value.code) return 1;
      return 0;
    });

    // Опции для селектов
    const values = sortedValues.map((v) => {
      const code = v.value.code;
      const value = v.value.value;

      return { code, value, onClick: () => onOptionClick(v.product) };
    });

    return { ...option, values };
  });

  if (!options) return <div />;

  return (
    <div className={styles.productOptions}>
      {options.map(({ attribute, values }) => {
        return (
          <div className={styles.productOption} key={attribute.id + attribute.name}>
            {values.length > 1 &&
              (values.length > 5 ? (
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
              ))}
          </div>
        );
      })}
    </div>
  );
};
