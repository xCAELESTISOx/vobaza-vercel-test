import { FC, useState } from 'react';
import { IAddress } from 'src/models/IAddress';
import ProfileAddress from './Item';
import ProfileAddressEmpty from './Item/Empty';

import styles from './styles.module.scss';

type Props = {
  addreses: IAddress[];
};

const ProfileAddresses: FC<Props> = ({ addreses }) => {
  const [addresses, setAddresses] = useState(addreses);

  const deleteAddress = (id: number) => {
    setAddresses([...addresses.filter((address) => address.id !== id)]);
  };
  const toggleDefault = (id: number) => {
    setAddresses([
      ...addresses.map((address) => {
        if (address.is_default) return { ...address, is_default: false };
        console.log(address.id, id);
        if (address.id === id) return { ...address, is_default: true };
        return address;
      }),
    ]);
  };

  return (
    <div>
      {(!addresses || addresses.length === 0) && (
        <div className={styles.profileAddressesText}>
          Пока что вы&nbsp;не&nbsp;сохранили ни&nbsp;одного адреса
        </div>
      )}
      <div className={styles.profileAddresses}>
        {addresses.map((address) => (
          <ProfileAddress
            key={address.id}
            address={address}
            onDelete={deleteAddress}
            onToggleDefault={toggleDefault}
          />
        ))}
        <ProfileAddressEmpty />
      </div>
    </div>
  );
};
export default ProfileAddresses;
