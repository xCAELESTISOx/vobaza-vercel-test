import { GetServerSideProps } from 'next';

import { api } from 'app/api';
import checkAuth from 'app/api/auth';
import { IAddress } from 'src/models/IAddress';

import styles from 'app/styles/Profile.module.scss';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import ProfileAddresses from '../../../components/Profile/Addresses';

type Props = {
  addreses: IAddress[];
};

export default function ProfileAddress({ addreses }: Props) {
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
              <ProfileAddresses addreses={addreses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  let addreses = [];

  try {
    const authorized = await checkAuth(req);
    if (!authorized)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    const addressesRes = await api.getAddresses();
    addreses = addressesRes.data.data;
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
      addreses,
    },
  };
};
