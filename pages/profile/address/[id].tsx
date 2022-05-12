import { GetServerSideProps } from 'next';

import checkAuth from 'assets/api/auth';
import { api } from 'assets/api';
import { IAddressFull } from 'src/models/IAddress';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import ProfileAddressesForm from '../../../components/Profile/Addresses/Form';

import styles from '../../../styles/Profile.module.scss';

type Props = {
  address: IAddressFull;
};

export default function ProfileAddressAdd({ address }: Props) {
  return (
    <div>
      <div className="container">
        <div className={styles.profileContainer}>
          <h2 className={styles.profileTitle}>Профиль</h2>
          <div className={styles.profileContent}>
            <div className={styles.profileSidebarBlock}>
              <ProfileSidebar />
            </div>
            <div className={styles.profileContentBlock}>
              <h2 className={styles.profileSubtitle}>Мои адреса</h2>
              <ProfileAddressesForm address={address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  params,
}) => {
  let address = null;

  try {
    await checkAuth(req);
    const addressRes = await api.getAddress(params.id.toString());
    address = addressRes.data.data;
  } catch (error: any) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      address,
    },
  };
};
