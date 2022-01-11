import { Icon } from '@nebo-team/vobaza.ui.icon';
import router from 'next/router';
import { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  address: {
    fullAddress: string;
    isDefault: boolean;
  };
  onDelete: (fullAddress: string) => void;
  onToggleDefault: (fullAddress: string) => void;
};
const ProfileAddress: FC<Props> = ({ address, onDelete, onToggleDefault }) => {
  const deleteAddress = (fullAddress) => {
    //TODO api
    onDelete(fullAddress);
  };
  const editAddress = () => {
    router.push('/profile/address/add');
  };
  const toggleDefault = (fullAddress) => {
    //TODO api
    onToggleDefault(fullAddress);
  };

  return (
    <div
      key={address.fullAddress}
      className={`${styles.profileAddress} ${
        address.isDefault ? styles.default : ''
      }`}
    >
      <div className={styles.profileAddressName}>{address.fullAddress}</div>
      <div className={styles.profileAddressButtons}>
        <div className={styles.profileAddressButton} onClick={editAddress}>
          <Icon name="WritePencil" /> Редактировать
        </div>
        {!address.isDefault && (
          <div
            className={styles.profileAddressButton}
            onClick={() => deleteAddress(address.fullAddress)}
          >
            <Icon name="Trash" /> Удалить
          </div>
        )}
      </div>
      <div
        className={styles.profileAddressDefault}
        onClick={() => toggleDefault(address.fullAddress)}
      >
        {address.isDefault ? 'Адрес по умолчанию' : 'Сделать по умолчанию '}
      </div>
    </div>
  );
};
export default ProfileAddress;
