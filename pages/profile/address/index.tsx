import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { api } from 'app/api';
import checkAuth from 'app/api/auth';
import { IAddress } from 'src/models/IAddress';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from 'app/styles/Profile.module.scss';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import ProfileAddresses from '../../../components/Profile/Addresses';
import Warning from 'shared/ui/Warning';

type Props = {
  addreses: IAddress[];
};

export default function ProfileAddress({ addreses }: Props) {
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
              <h2 className={styles.profileSubtitle}>Мои адреса</h2>
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
