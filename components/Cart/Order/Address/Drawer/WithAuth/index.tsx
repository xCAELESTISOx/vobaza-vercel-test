import { FC, useEffect, useState } from 'react';

import type { IAddressFull } from 'src/models/IAddress';

import { AuthorizedAddressForm } from 'components/Profile/Addresses/Form/Presenters/AuthorizedForm';
import OrderWithAuthAddressItem from './item';
import Drawer from 'src/hoc/withDrawer';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';
import Link from 'next/link';

type Props = {
  addresses: IAddressFull[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (t: IAddressFull) => void;
};

const OrderWithAuthAddressDrawer: FC<Props> = ({ addresses: initialAddresses, isOpen = false, onClose, onSubmit }) => {
  const [addresses, setAddresses] = useState(initialAddresses);
  // Флаг, отвечающий за активность формы добавления адреса
  // Активно по-умолчанию, если у пользователя нет адресов
  const [isNewOpened, setIsNewOpened] = useState(!initialAddresses.length);
  const [currentAddress, setCurrentAddress] = useState(initialAddresses.find((address) => address.is_default));

  const handleSubmit = () => {
    onSubmit(currentAddress);
  };

  const addNewAddress = (item: IAddressFull) => {
    onSubmit(item);
    setAddresses([...addresses, item]);
    setCurrentAddress(item);
    setIsNewOpened(false);
  };
  const openNewAddress = () => {
    setIsNewOpened(true);
  };

  useEffect(() => {
    isNewOpened && setIsNewOpened(!initialAddresses.length);
  }, [isOpen]);

  return (
    <Drawer title="Адрес" buttonText="Подтвердить" isOpen={isOpen} onClose={onClose} onButtonClick={handleSubmit}>
      <>
        {addresses.map((address) => (
          <OrderWithAuthAddressItem
            key={address.id}
            address={address}
            currentAddress={currentAddress}
            setCurrentAddress={setCurrentAddress}
          />
        ))}
        <div
          style={{
            fontSize: 14,
            color: 'grey',
            marginTop: 12,
            marginBottom: 16,
          }}
        >
          Вы можете изменить существующий адрес в{' '}
          <Link href="/profile/address">
            <a style={{ color: '#af1ebe' }}>профиле</a>
          </Link>
        </div>
        {isNewOpened ? (
          <AuthorizedAddressForm onSubmit={addNewAddress} inline />
        ) : (
          <div className={styles.orderAddressAdd} onClick={openNewAddress}>
            <Icon name="Plus" />
            Добавить новый адрес
          </div>
        )}
      </>
    </Drawer>
  );
};
export default OrderWithAuthAddressDrawer;
