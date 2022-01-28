import { Icon } from '@nebo-team/vobaza.ui.icon';

import type { FC } from 'react';

import styles from './styles.module.scss';

interface ProductStock {
  className?: string;
  inStock?: boolean;
}

const ProductStock: FC<ProductStock> = (props) => {
  const { className = '', inStock } = props;

  const containerClasses = [
    className,
    inStock ? styles.productInStock : styles.productOutStock,
  ].join(' ');

  return (
    <div className={containerClasses}>
      <Icon name={inStock ? 'Checkmark' : 'Cross'} />{' '}
      {inStock ? 'В наличии' : 'Закончился'}
    </div>
  );
};

export { ProductStock };
