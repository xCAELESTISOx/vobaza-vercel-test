import { GetServerSideProps } from 'next';

import { api } from 'assets/api';
import checkAuth from 'assets/api/auth';
import { IAddress } from 'src/models/IAddress';

import styles from '../../../styles/Profile.module.scss';

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

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  let addreses = [];

  try {
    await checkAuth(req);
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
