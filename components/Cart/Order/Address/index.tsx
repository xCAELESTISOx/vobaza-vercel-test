import { FC, useState } from 'react';

import type { IAddressFull } from 'src/models/IAddress';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import OrderAddressDrawer from './Drawer';
import OrderWithAuthAddressDrawer from './Drawer/WithAuth';

import styles from './styles.module.scss';

type Props = {
  addressError?: boolean;
  authorized?: boolean;
  address: IAddressFull;
  addresses: IAddressFull[];
  setFieldValue: (name: string, value: any) => void;
};
const OrderAddress: FC<Props> = ({ addressError, authorized, address, addresses = [], setFieldValue }) => {
  const [isDrawer, setIsDrawer] = useState(false);

  const toggleChangeAddressDrawer = () => {
    setIsDrawer(!isDrawer);
  };
  const setNewAddress = (address: IAddressFull) => {
    setIsDrawer(!isDrawer);
    setFieldValue('address', address);
  };

  const displayableAddress =
    address?.id || !authorized ? address.address || 'Укажите полный адрес' : 'Укажите полный адрес';

  return (
    <div className={styles.orderAddress}>
      {authorized ? (
        // Адресс авторизованного пользователя
        <OrderWithAuthAddressDrawer
          currentAddress={address}
          addresses={addresses}
          isOpen={isDrawer}
          onClose={toggleChangeAddressDrawer}
          onSubmit={setNewAddress}
        />
      ) : (
        // Адресс неавторизованного пользователя
        <OrderAddressDrawer setOuterFieldValue={setFieldValue} onClose={toggleChangeAddressDrawer} isOpen={isDrawer} />
      )}

      <div className={`${styles.cartContent} ${addressError ? styles.error : ''}`}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Адрес</h2>
          <div className={styles.cartHeaderButtons}>
            <button className={styles.cartHeaderButton} onClick={toggleChangeAddressDrawer}>
              Изменить
            </button>
          </div>
        </div>
        <div
          className={`${styles.orderAddressText} ${addressError ? styles.error : ''}`}
          onClick={toggleChangeAddressDrawer}
        >
          <Icon name="Geoposition" />
          <span>{displayableAddress}</span>
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
