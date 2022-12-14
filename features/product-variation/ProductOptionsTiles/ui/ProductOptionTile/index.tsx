import React from 'react';

import styles from './styles.module.scss';

type Props = {
  isMoreButton?: boolean;
  isCurrent?: boolean;
  value: string | number;
  onClick: () => void;
};

const ProductOptionTile = ({ isMoreButton, value, isCurrent, onClick }: Props) => {
  const cn = [styles.productOptionTile, isCurrent ? styles.current : '', isMoreButton ? styles.more : ''].join(' ');

  return (
    <div className={styles.productOptionTileWrapper}>
      <div className={cn} onClick={onClick}>
        {value}
      </div>
    </div>
  );
};

export default ProductOptionTile;
