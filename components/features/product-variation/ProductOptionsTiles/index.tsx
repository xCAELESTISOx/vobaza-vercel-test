import React from 'react';

import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IProductVariant } from 'src/models/IGood';
import { useToggle } from 'src/hooks/useToggle';

import ProductOptionTile from './ui/ProductOptionTile';

import styles from './styles.module.scss';

const ITEMS_LIMIT = 5;

type Props = {
  option: IProductVariant<Variant>;
  selectedOptions: Record<number, Variant<string | number, string>>;
  onClick: (optionId: number | string, value: Variant) => void;
};

const ProductOptionsTiles = ({ option, selectedOptions, onClick }: Props) => {
  const [showMore, toggleShowMore] = useToggle(false);

  const { attribute, display, values } = option;
  const currentOption = selectedOptions[attribute.id];

  const limitedValues = [...values];
  limitedValues.splice(display?.count || ITEMS_LIMIT);

  const showButton = display?.count
    ? display?.count < values.length
      ? true
      : false
    : values.length > ITEMS_LIMIT
    ? true
    : false;

  return (
    <div className={styles.optionTiles}>
      {(showMore ? values : limitedValues).map((value) => (
        <ProductOptionTile
          key={value.code}
          isCurrent={currentOption.code === value.code}
          onClick={() => onClick(attribute.id, value)}
          value={value.code}
        />
      ))}
      {showButton && (
        <ProductOptionTile value={showMore ? 'Скрыть' : 'Показать еще'} isMoreButton onClick={toggleShowMore} />
      )}
    </div>
  );
};

export default ProductOptionsTiles;
