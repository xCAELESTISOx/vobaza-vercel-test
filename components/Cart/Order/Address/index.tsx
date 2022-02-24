import { FC, useState } from 'react';

import styles from './styles.module.scss';
import { IOrderAddress } from '../../../../src/models/IOrder';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Button } from '@nebo-team/vobaza.ui.button';
import OrderAddressDrawer from './Drawer';

type Props = {
  address: IOrderAddress;
  setAddress: (address: IOrderAddress) => void;
};
const OrderAddress: FC<Props> = ({ address, setAddress }) => {
  const [isDrawer, setIsDrawer] = useState(false);

  const toggleChangeAddressDrawer = () => {
    setIsDrawer(!isDrawer);
  };

  return (
    <div className={styles.orderAddress}>
      <OrderAddressDrawer
        address={address}
        setAddress={setAddress}
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
          <Icon name="Geoposition" />
          <span>{address.address}</span>
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
