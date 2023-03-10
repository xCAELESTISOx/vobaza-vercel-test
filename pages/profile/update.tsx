import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import checkAuth from '../../app/api/auth';
import { api } from '../../app/api';
import { IProfile } from '../../components/Profile/Data';
import styles from 'app/styles/Profile.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import ProfileSidebar from '../../components/Profile/Sidebar';
import ProfileUpdateForm from '../../components/Profile/UpdateForm';
import Warning from 'shared/ui/Warning';

interface Props {
  user: IProfile;
}

export default function ProfileWishlist({ user }) {
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
              <h2 className={styles.profileSubtitle}>Личные данные</h2>
              <Warning>
                <p>Вы находитесь на новой версии сайта.</p>
                <br />
                <p>
                  Ранее заполненные вами данные профиля могут отсутствовать. Пожалуйста, заполните их снова. Узнать
                  статус активных заказов вы можете по телефону: <a href="tel:+74958990909">+7 (495) 899-09-09</a>.
                </p>
                <br />
                <p>Приносим извинения за доставленные неудобства!</p>
              </Warning>
              <ProfileUpdateForm initialUser={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  let user = null;

  try {
    await checkAuth(req);
    const [propfileRes] = await Promise.all([api.getProfile()]);

    user = propfileRes.data.data;
  } catch (error) {
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
