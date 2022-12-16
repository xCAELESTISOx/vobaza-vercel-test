import React, { useEffect } from 'react';

import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IProductVariant, IVariantProduct } from 'entities/products/model/IGood';
import { useToggle } from 'src/hooks/useToggle';

import ProductOptionTile from './ui/ProductOptionTile';

import styles from './styles.module.scss';

const ITEMS_LIMIT = 5;

type Props = {
  option: IProductVariant<{ product: IVariantProduct; param: Variant }>;
  selectedOptions: Record<number, Variant<string | number, string>>;
  onClick: (optionId: number | string, value: Variant) => void;
};

const ProductOptionsTiles = ({ option, selectedOptions, onClick }: Props) => {
  const [showMore, toggleShowMore] = useToggle(false);

  const { attribute, display, values } = option;
  const currentOption = selectedOptions[attribute.id];

  const limitedValues = [...values];
  limitedValues.splice(display?.count || ITEMS_LIMIT);

  const showButton = (display?.count || ITEMS_LIMIT) < values.length;

  useEffect(() => {
    toggleShowMore(false);
  }, []);

  return (
    <div className={styles.optionTiles}>
      {(showMore ? values : limitedValues).map(({ param }) => (
        <ProductOptionTile
          key={param.code}
          isCurrent={currentOption.code === param.code}
          onClick={() => onClick(attribute.id, param)}
          value={param.code}
        />
      ))}
      {showButton && (
        <ProductOptionTile value={showMore ? 'Скрыть' : 'Показать еще'} isMoreButton onClick={toggleShowMore} />
      )}
    </div>
  );
};

export { ProductOptionsTiles };
