import { FC, useState } from 'react';

import type { IOrderAddress } from '../../../../src/models/IOrder';
import type { IAddressFull } from 'src/models/IAddress';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import OrderAddressDrawer from './Drawer';
import OrderWithAuthAddressDrawer from './Drawer/WithAuth';

import styles from './styles.module.scss';

type Props = {
  authorized?: boolean;
  address: IOrderAddress;
  addresses: IAddressFull[];
  setFieldValue: (name: string, value: any) => void;
};
const OrderAddress: FC<Props> = ({ authorized, address, addresses, setFieldValue }) => {
  const [isDrawer, setIsDrawer] = useState(false);

  const toggleChangeAddressDrawer = () => {
    setIsDrawer(!isDrawer);
  };
  const setNewAddress = (address: IAddressFull) => {
    setIsDrawer(!isDrawer);
    setFieldValue('address', address);
  };

  return (
    <div className={styles.orderAddress}>
      {authorized ? (
        // Адресс авторизованного пользователя
        <OrderWithAuthAddressDrawer
          addresses={addresses}
          isOpen={isDrawer}
          onClose={toggleChangeAddressDrawer}
          onSubmit={setNewAddress}
        />
      ) : (
        // Адресс неавторизованного пользователя
        <OrderAddressDrawer setOuterFieldValue={setFieldValue} onClose={toggleChangeAddressDrawer} isOpen={isDrawer} />
      )}

      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Адрес</h2>
          <div className={styles.cartHeaderButtons}>
            <button className={styles.cartHeaderButton} onClick={toggleChangeAddressDrawer}>
              Изменить
            </button>
          </div>
        </div>
        <div className={styles.orderAddressText} onClick={toggleChangeAddressDrawer}>
          <Icon name="Geoposition" />
          <span>{address.address}</span>
        </div>
        <div className={styles.cartButtonWrapper}>
          <Button
            className={styles.cartButton}
            text="Изменить"
            color="#fafafa"
            isFullScreen
            onClick={toggleChangeAddressDrawer}
          />
        </div>
      </div>
    </div>
  );
};
export default OrderAddress;
