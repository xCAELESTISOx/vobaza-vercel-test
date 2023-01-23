import { FC } from 'react';

import type { IAddress } from 'src/models/IAddress';

import styles from './styles.module.scss';

type Props = {
  address: IAddress;
  current?: boolean;
  setSelectedAddress: (t: IAddress) => void;
};

const OrderWithAuthAddressItem: FC<Props> = ({ address, current, setSelectedAddress }) => {
  const onClickHandler = () => {
    setSelectedAddress(address);
  };

  return (
    <div className={`${styles.orderAddress} ${current ? styles.active : ''}`} onClick={onClickHandler}>
      {address.address}
    </div>
  );
};

export default OrderWithAuthAddressItem;
