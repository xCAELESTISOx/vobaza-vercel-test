import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import type { IMerchant } from '../../../src/models/IMerchant';

import styles from './styles.module.scss';

import tmpLogo from './tmp/logo.png';

interface ProductSeller {
  className?: string;
  merchant?: IMerchant;
}

const ProductSeller: FC<ProductSeller> = (props) => {
  const { className = '', merchant } = props;
  return (
    <div className={`${styles.sellerContainer} ${className}`}>
      {merchant && (
        <div className={styles.sellerInfo}>
          {/* <div className={styles.sellerLogo}>
          <Image src={tmpLogo} alt="logo" />
        </div> */}
          <div className={styles.sellerTitleWrapper}>
            <div className={styles.sellerLabel}>Продавец:</div>
            <div className={styles.sellerTitle}>
              {/* {merchant.legal_name} */}
              ВоБаза
            </div>
          </div>
        </div>
      )}
      <div className={styles.sellerConditions}>
        <div className={styles.sellerConditionsItem}>
          <Icon name="Protection" />
          <span>Безопасная оплата онлайн</span>
        </div>
        <div className={styles.sellerConditionsItem}>
          <Icon name="ArrowLeft" />
          <span>
            Возрат 7 дней, при соблюдении{' '}
            <Link href="/obmen-i-vozvrat">
              <a className={styles.sellerLink}>условий</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProductSeller };
