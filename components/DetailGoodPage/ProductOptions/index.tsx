import { useRouter } from 'next/router';

import type { IGood, IVariantProduct } from 'src/models/IGood';
import type { Variant as SelectVariant } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';
import type { Variant as TabsVariant } from 'components/UI/SelectTabs';

import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';
import { SelectTabs } from 'components/UI/SelectTabs';

import styles from './styles.module.scss';

type Props = {
  variants: IGood['variants'];
  selectedOptions: { [key: string]: string | number }[];
  handelSelectOption: (
    id: string | number,
    value: SelectVariant | TabsVariant
  ) => void;
};

export const ProductOptions = ({
  variants,
  selectedOptions,
  handelSelectOption,
}: Props) => {
  const router = useRouter();

  const onOptionClick = (product: IVariantProduct) => {
    const destination = `/product/${product.slug}_${product.id}_${product.sku}`;

    if (destination !== router.asPath) router.push(destination);
  };

  const options = variants.variants.map((option) => {
    // Сортировка по возрастанию/в алфавитном порядке
    const sortedValues = option.values.sort((a, b) => {
      if (typeof a.value === 'number') {
        return a.value - +b.value;
      } else if (typeof a.value === 'string') {
        return a.value.localeCompare(b.value as string);
      }
    });

    // Опции для селектов
    const selectValues = sortedValues.map((v) => {
      let code = '';
      let value = '';
      if (typeof v.value === 'boolean') {
        code = v.value === true ? 'YES' : 'NO';
        value = v.value === true ? 'Да' : 'Нет';
      } else {
        code = v.value.toString();
        value = v.value.toString();
      }

      return { code, value, onClick: () => onOptionClick(v.product) };
    });

    // Опции для табов
    const tabsValues = sortedValues.map((v) => {
      let code = '';
      let text = '';
      if (typeof v.value === 'boolean') {
        code = v.value === true ? 'YES' : 'NO';
        text = v.value === true ? 'Да' : 'Нет';
      } else {
        code = v.value.toString();
        text = v.value.toString();
      }

      return { code, text, onClick: () => onOptionClick(v.product) };
    });

    return { ...option, selectValues, tabsValues };
  });

  if (!options) return <div />;

  return (
    <div className={styles.productOptions}>
      {options.map(({ attribute, selectValues, tabsValues }) => {
        return (
          <div
            className={styles.productOption}
            key={attribute.id + attribute.name}
          >
            {selectValues.length > 1 &&
              (selectValues.length > 5 ? (
                <InputSelect
                  name={attribute.id.toString()}
                  label={attribute.name}
                  currentValue={selectedOptions[attribute.id]}
                  variants={selectValues}
                  onChange={(value) =>
                    handelSelectOption(attribute.id, value as SelectVariant)
                  }
                />
              ) : (
                <SelectTabs
                  label={attribute.name}
                  value={selectedOptions[attribute.id]}
                  variants={tabsValues}
                  onChange={(value) => handelSelectOption(attribute.id, value)}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
};
