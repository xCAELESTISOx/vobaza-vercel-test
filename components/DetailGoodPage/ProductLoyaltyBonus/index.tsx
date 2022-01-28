import Link from 'next/link';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import type { FC } from 'react';

import styles from './styles.module.scss';

interface ProductLoyaltyBonus {
  className?: string;
  value: number;
}

const ProductLoyaltyBonus: FC<ProductLoyaltyBonus> = (props) => {
  const { className = '', value } = props;

  const containerClasses = [className, styles.productLoyalty].join(' ');

  return (
    <div className={containerClasses}>
      <Icon name="SmallLogo" />{' '}
      <Link href="#">
        <a>{value} вобаллов за покупку</a>
      </Link>
    </div>
  );
};

export { ProductLoyaltyBonus };
