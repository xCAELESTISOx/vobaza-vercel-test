import { FC } from 'react';
import { IAddress } from 'src/models/IAddress';
import styles from './styles.module.scss';

type Props = {
  address: IAddress;
  currentAddress: IAddress;
  setCurrentAddress: (t: IAddress) => void;
};

const OrderWithAuthAddressItem: FC<Props> = ({
  address,
  currentAddress,
  setCurrentAddress,
}) => {
  const onClickHandler = () => {
    setCurrentAddress(address);
  };

  return (
    <div
      className={`${styles.orderAddress} ${
        currentAddress.id === address.id ? styles.active : ''
      }`}
      onClick={onClickHandler}
    >
      {address.address}
    </div>
  );
};
export default OrderWithAuthAddressItem;
