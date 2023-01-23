import { FC, useState } from 'react';
import router from 'next/router';

import { api } from 'app/api';
import { IAddress } from 'src/models/IAddress';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

type Props = {
  address: IAddress;
  onDelete?: (id: number) => void;
  onToggleDefault: (id: number) => void;
};
const ProfileAddress: FC<Props> = ({ address, onDelete, onToggleDefault }) => {
  const [isloading, setIsloading] = useState(false);

  const deleteAddress = async () => {
    if (isloading) return;
    try {
      setIsloading(true);
      await api.deleteAddress(address.id);
      onDelete(address.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };
  const editAddress = () => {
    router.push(`/profile/address/${address.id}`);
  };
  const toggleDefault = async () => {
    if (isloading) return;
    try {
      setIsloading(true);
      await api.setDefaultAddress(address.id);
      onToggleDefault(address.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div key={address.address} className={`${styles.profileAddress} ${address.is_default ? styles.default : ''}`}>
      <div className={styles.profileAddressName}>{address.address}</div>
      <div className={styles.profileAddressButtons}>
        <div className={styles.profileAddressButton} onClick={editAddress}>
          <Icon name="WritePencil" /> Редактировать
        </div>
        {!address.is_default && onDelete && (
          <div className={styles.profileAddressButton} onClick={deleteAddress}>
            <Icon name="Trash" /> Удалить
          </div>
        )}
      </div>
      <div className={styles.profileAddressDefault} onClick={toggleDefault}>
        {address.is_default ? 'Адрес по умолчанию' : 'Сделать по умолчанию '}
      </div>
    </div>
  );
};
export default ProfileAddress;
