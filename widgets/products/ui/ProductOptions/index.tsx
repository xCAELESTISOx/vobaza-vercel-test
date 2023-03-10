import { FC } from 'react';

import type { IGood, IProductVariant, IVariantProduct } from 'entities/products/model/IGood';
import { getDropdownVariationItems, getImagesVariationItems } from 'features/product-variation';

import { ProductOptionsTiles, SelectVariationOption } from 'features/product-variation';
import { InputSelect, Variant } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';
import { ProductOptionsImages } from '../ProductOptionsImages';
import { SelectTabs } from 'shared/ui/SelectTabs';

import styles from './styles.module.scss';

type Props = {
  currentProductId: string | number;
  variants: IGood['variants'];
  selectedOptions: Record<number, (string | number)[]>;
  options: IProductVariant<{ product: IVariantProduct; param: Variant }>[];
  handelSelectOption: SelectVariationOption;
};

export const ProductOptions: FC<Props> = ({
  currentProductId,
  variants,
  selectedOptions,
  options,
  handelSelectOption,
}) => {
  if (!options) return null;

  return (
    <div className={styles.productOptions}>
      {options.map((option) => {
        const { attribute, display, values } = option;

        let items = [];

        if (display?.display_type === 'IMAGE')
          items = getImagesVariationItems(option, variants.products, variants.variants, selectedOptions);
        else if (display?.display_type === 'DROPDOWN' || display?.display_type === 'CHOICE' || !display?.display_type)
          items = getDropdownVariationItems(option, handelSelectOption);

        const convertedValue: Variant =
          attribute.data_type === 'BOOLEAN'
            ? String(selectedOptions[attribute.id]) === 'true'
              ? { code: 'true', value: 'Да' }
              : { code: 'false', value: 'Нет' }
            : {
                code: String(selectedOptions[attribute.id]),
                value: String(selectedOptions[attribute.id]),
              };

        return (
          <div className={styles.productOption} key={attribute.id + attribute.name}>
            {{
              TILE: (
                <>
                  <span className={styles.productOptionLabel}>{attribute.name}</span>
                  <ProductOptionsTiles
                    currentProductId={currentProductId}
                    option={option}
                    onClick={handelSelectOption}
                  />
                </>
              ),
              IMAGE: (
                <>
                  <span className={styles.productOptionLabel}>{attribute.name}</span>
                  <ProductOptionsImages currentProductId={currentProductId} itemsLimit={display?.count} items={items} />
                </>
              ),
              DROPDOWN: (() => {
                return (
                  <InputSelect
                    name={attribute.id.toString()}
                    label={attribute.name}
                    currentValue={convertedValue}
                    variants={items}
                    style={{ marginTop: 8 }}
                  />
                );
              })(),
              CHOICE: <SelectTabs label={attribute.name} value={convertedValue} variants={items} />,
            }[display?.display_type] ?? (
              <>
                {values.length > 3 ? (
                  <InputSelect
                    name={attribute.id.toString()}
                    label={attribute.name}
                    currentValue={convertedValue}
                    variants={items}
                    style={{ marginTop: 8 }}
                  />
                ) : (
                  <SelectTabs value={convertedValue} label={attribute.name} variants={items} />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
