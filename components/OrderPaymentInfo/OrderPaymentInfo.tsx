import React from 'react';
import Link from 'next/link';
import { Button } from '@nebo-team/vobaza.ui.button';

import styles from '../../styles/BlogPost.module.scss';
import stylesPayment from './styles.module.scss';

const OrderPaymentInfo = ({ text }: { text: string }) => {
  return (
    <div className="container">
      <div className={stylesPayment.paymentInfo}>
        <h1 className={styles.sectionTitle}>{text}</h1>
        <div className={stylesPayment.paymentInfoBtn}>
          <Link href="/">
            <Button text="Перейти на главную" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderPaymentInfo