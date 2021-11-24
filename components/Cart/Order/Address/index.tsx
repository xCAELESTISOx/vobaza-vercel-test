import { FC, useState } from 'react';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import OrderAddressDrawer from './Drawer';
import { Button } from '@nebo-team/vobaza.ui.button';

const OrderAddress: FC = () => {
  const [isDrawer, setIsDrawer] = useState(false);

  const toggleChangeAddressDrawer = () => {
    setIsDrawer(!isDrawer);
  };

  return (
    <div className={styles.orderAddress}>
      <OrderAddressDrawer
        onClose={toggleChangeAddressDrawer}
        isOpen={isDrawer}
      />
      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Адрес</h2>
          <div className={styles.cartHeaderButtons}>
            <button
              className={styles.cartHeaderButton}
              onClick={toggleChangeAddressDrawer}
            >
              Изменить
            </button>
          </div>
        </div>
        <div
          className={styles.orderAddressText}
          onClick={toggleChangeAddressDrawer}
        >
          <Icon name="Phone" />
          <span>Ростов-на-Дону</span>
        </div>
        <div className={styles.cartButton}>
          <Button
            text="Изменить"
            color="#fafafa"
            isFullScreen
            style={{
              color: '#af1ebe',
              backgroundColor: ' #f2f2f2',
              border: '1px solid #f2f2f2',
              fontWeight: 500,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default OrderAddress;