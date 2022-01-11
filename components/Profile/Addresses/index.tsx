import { FC, useState } from 'react';
import ProfileAddress from './Item';
import ProfileAddressEmpty from './Item/Empty';

import styles from './styles.module.scss';

const tmpAddresses = [
  {
    fullAddress: 'Санкт-Петербург ',
    isDefault: true,
  },
  {
    fullAddress: 'Москва, ул Тверская, 6 стр 1 ',
    isDefault: false,
  },
];

const ProfileAddresses: FC = () => {
  const [addresses, setAddresses] = useState(tmpAddresses);

  const deleteAddress = (fullAddress) => {
    setAddresses([
      ...addresses.filter((address) => address.fullAddress !== fullAddress),
    ]);
  };
  const toggleDefault = (fullAddress) => {
    setAddresses([
      ...addresses.map((address) => {
        if (address.isDefault) return { ...address, isDefault: false };
        if (address.fullAddress === fullAddress)
          return { ...address, isDefault: true };
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
            key={address.fullAddress}
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
