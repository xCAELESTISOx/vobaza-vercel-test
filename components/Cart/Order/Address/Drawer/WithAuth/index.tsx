import { FC, useState } from 'react';

import { IAddress } from 'src/models/IAddress';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import OrderWithAuthAddressItem from './item';
import ProfileAddressesForm from 'components/Profile/Addresses/Form';
import Drawer from '../../../../../../src/hoc/withDrawer';

import styles from './styles.module.scss';

type Props = {
  addresses: IAddress[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (t: IAddress) => void;
};

const OrderWithAuthAddressDrawer: FC<Props> = ({
  addresses: initialAddresses,
  isOpen = false,
  onClose,
  onSubmit,
}) => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isNewOpened, setIsNewOpened] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(
    addresses.find((address) => address.is_default)
  );
  const handleSubmit = () => {
    onSubmit(currentAddress);
  };

  const addNewAddress = (item: IAddress) => {
    onSubmit(item);
    setAddresses([...addresses, item]);
    setCurrentAddress(item);
    setIsNewOpened(false);
  };
  const openNewAddress = () => {
    setIsNewOpened(true);
  };

  return (
    <Drawer
      title="Адрес"
      buttonText="Подтвердить"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={handleSubmit}
    >
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
          <ProfileAddressesForm
            title="Новый адрес"
            buttonText="Добавить адрес"
            submitHandler={addNewAddress}
            inline
          />
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
