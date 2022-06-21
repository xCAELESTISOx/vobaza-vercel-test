import { FC, useEffect, useState } from 'react';

import type { IAddressFull } from 'src/models/IAddress';

import { AuthorizedAddressForm } from 'components/Profile/Addresses/Form/Presenters/AuthorizedForm';
import OrderWithAuthAddressItem from './item';
import Drawer from 'src/hoc/withDrawer';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';

type Props = {
  addresses: IAddressFull[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (t: IAddressFull) => void;
};

const OrderWithAuthAddressDrawer: FC<Props> = ({ addresses: initialAddresses, isOpen = false, onClose, onSubmit }) => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isNewOpened, setIsNewOpened] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(addresses.find((address) => address.is_default));

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
    isNewOpened && setIsNewOpened(false);
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
