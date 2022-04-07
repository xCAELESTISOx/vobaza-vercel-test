import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import styles from '../../styles/Profile.module.scss';
import { api } from '../../assets/api';
import checkAuth from '../../assets/api/auth';
import { IOrderItem } from '../../src/models/IOrder';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import ProfileSidebar from '../../components/Profile/Sidebar';
import ProfileData, { IProfile } from '../../components/Profile/Data';
import ProfileOrderItem from '../../components/Profile/Order/Item';

interface Props {
  user: IProfile;
  lastOrder?: IOrderItem;
}

export default function Profile({ user, lastOrder }) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

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
              <div className={styles.profileTop}>
                <div className={styles.profileBack} onClick={goBack}>
                  <Icon name="ArrowLeft" /> Назад
                </div>
              </div>
              <h2 className={styles.profileSubtitle}>
                Здравствуйте, {user.name}!
              </h2>
              <ProfileData user={user} />
              {lastOrder && (
                <ProfileOrderItem order={lastOrder} isLast={true} />
              )}
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
  let user = null;
  let lastOrder = null;

  try {
    await checkAuth(req);
    const [propfileRes, lastOrderRes] = await Promise.all([
      api.getProfile(),
      api.getLastOrder(),
    ]);

    user = propfileRes.data.data;
    if (lastOrderRes.data.data && lastOrderRes.data.data.length > 0) {
      lastOrder = {
        ...lastOrderRes.data.data[0],
        price: lastOrderRes.data.data[0].price / 100,
      };
    }
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
      user,
      lastOrder,
    },
  };
};
