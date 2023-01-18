import { FC, useState } from 'react';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import OrderPaymentDrawer from './Drawer';
import { Button } from '@nebo-team/vobaza.ui.button/dist';

const OrderPayment: FC = () => {
  const [isDrawer, setIsDrawer] = useState(false);

  const toggleChangePaymentDrawer = () => {
    setIsDrawer(!isDrawer);
  };

  return (
    <div className={styles.orderPayment}>
      <OrderPaymentDrawer onClose={toggleChangePaymentDrawer} isOpen={isDrawer} />
      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Способ оплаты</h2>
          <div className={styles.cartHeaderButtons}>
            <button className={styles.cartHeaderButton} onClick={toggleChangePaymentDrawer}>
              Изменить
            </button>
          </div>
        </div>
        <div className={styles.orderPaymentText}>
          <Icon name="Wallet" />
          <span>При получении</span>
        </div>
        <div className={styles.cartButtonWrapper}>
          <Button
            className={styles.cartButton}
            text="Изменить"
            color="#fafafa"
            isFullScreen
            onClick={toggleChangePaymentDrawer}
          />
        </div>
      </div>
    </div>
  );
};
export default OrderPayment;
