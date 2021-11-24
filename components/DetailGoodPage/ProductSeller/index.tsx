import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';

import tmpLogo from './tmp/logo.png';

interface ProductSeller {}

const ProductSeller: FC<ProductSeller> = ({}) => {
  return (
    <div className={styles.sellerContainer}>
      <div className={styles.sellerInfo}>
        <div className={styles.sellerLogo}>
          <Image src={tmpLogo} alt="logo" />
        </div>
        <div className={styles.sellerTitleWrapper}>
          <div className={styles.sellerLabel}>Продавец:</div>
          <div className={styles.sellerTitle}>МебельГрад и Ко</div>
        </div>
      </div>
      <div className={styles.sellerConditions}>
        <div className={styles.sellerConditionsItem}>
          <Icon name="Protection" />
          <span>Безопасная оплата онлайн</span>
        </div>
        <div className={styles.sellerConditionsItem}>
          <Icon name="ArrowLeft" />
          <span>
            Возрат 14 дней, при соблюдении{' '}
            <Link href="/obmen-i-vozvrat">
              <a className="blueLink">условий</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProductSeller };
