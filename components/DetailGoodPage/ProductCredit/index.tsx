import { Button } from '@nebo-team/vobaza.ui.button';

import type { FC } from 'react';

import styles from './styles.module.scss';

interface ProductCredit {
  className?: string;
  creditPayment?: number;
}

const ProductCredit: FC<ProductCredit> = (props) => {
  const { className = '', creditPayment } = props;

  const containerClasses = [className, styles.productCredit].join(' ');

  return (
    <div className={containerClasses}>
      <span className={styles.creditPayment}>
        Кредит от <span>{creditPayment}</span> ₽/мес
      </span>
      <Button text="Оформить в кредит онлайн" variation="dashed" />
    </div>
  );
};

export { ProductCredit };
