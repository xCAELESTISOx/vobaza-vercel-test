import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { IAddressFull } from 'src/models/IAddress';

import { AuthorizedAddressForm } from 'widgets/profile';
import OrderWithAuthAddressItem from './item';
import Drawer from 'src/hoc/withDrawer';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';

type Props = {
  addresses: IAddressFull[];
  currentAddress: IAddressFull;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (t: IAddressFull) => void;
};

const OrderWithAuthAddressDrawer: FC<Props> = ({
  addresses: initialAddresses,
  currentAddress,
  isOpen = false,
  onClose,
  onSubmit,
}) => {
  const [addresses, setAddresses] = useState(initialAddresses);
  // Флаг, отвечающий за активность формы добавления адреса
  // Активно по-умолчанию, если у пользователя нет адресов
  const [isNewOpened, setIsNewOpened] = useState(!initialAddresses.length);
  // Текущий выделенный адресс
  const [selectedAddress, setSelectedAddress] = useState<IAddressFull | null>(currentAddress);

  const router = useRouter();

  const handleSubmit = () => {
    onSubmit(selectedAddress);
    setSelectedAddress(initialAddresses.find((address) => address.is_default) || initialAddresses[0]);
  };

  const onDrawerClose = () => {
    setSelectedAddress(currentAddress || null);
    onClose();
  };

  const addNewAddress = (item: IAddressFull) => {
    onSubmit(item);
    setSelectedAddress(item);
    setAddresses([...addresses, item]);
    setIsNewOpened(false);
  };
  const openNewAddress = () => {
    setIsNewOpened(true);
  };

  const handleClickLink = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
    router.push('/profile/address');
  };

  useEffect(() => {
    isNewOpened && setIsNewOpened(!initialAddresses.length);
  }, [isOpen]);

  useEffect(() => {
    setSelectedAddress(currentAddress);
  }, [currentAddress]);

  return (
    <Drawer
      title="Адрес"
      buttonText={!isNewOpened ? 'Подтвердить' : ''}
      isOpen={isOpen}
      onClose={onDrawerClose}
      onButtonClick={handleSubmit}
    >
      <>
        {addresses.map((address) => (
          <OrderWithAuthAddressItem
            key={address.id}
            address={address}
            current={selectedAddress?.id == address.id}
            setSelectedAddress={setSelectedAddress}
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
          <a style={{ color: '#af1ebe', cursor: 'pointer' }} onClick={handleClickLink}>
            профиле
          </a>
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
