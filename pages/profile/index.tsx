import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import styles from '../../styles/Profile.module.scss';
import { api } from '../../assets/api';
import checkAuth from '../../assets/api/auth';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import ProfileSidebar from '../../components/Profile/Sidebar';
import ProfileData, { IProfile } from '../../components/Profile/Data';
import ProfileOrderLast from '../../components/Profile/Order/Last';

const tmpItem = {
  id: '000005518',
  date: 'от 13 января 2022 ',
  price: ' 99 680',
  status: 'не оплачен',
  delivery: [
    {
      title: 'Доставка ВоБаза ',
      status: 'открыт',
      items: [{}],
    },
  ],
};

interface Props {
  user: IProfile;
}

export default function Profile({ user }) {
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
              <ProfileOrderLast item={tmpItem} />
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

  try {
    await checkAuth(req);
    const [propfileRes] = await Promise.all([api.getProfile()]);

    user = propfileRes.data.data;
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
    },
  };
};
