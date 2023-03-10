import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import styles from 'app/styles/Profile.module.scss';
import { api } from '../../app/api';
import checkAuth from '../../app/api/auth';
import normalizeGoods from '../../shared/lib/normalizers/normalizeGoods';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import ProfileSidebar from '../../components/Profile/Sidebar';
import ProfileEmptyField from '../../components/Profile/EmptyField';
import ProfileFavoriteItem, { FavoriteGood } from '../../components/Profile/Favorite/Item';
import Warning from 'shared/ui/Warning';
import { CartModal } from 'widgets/products';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { setFavorites } from 'src/store/goods';

interface Props {
  initialGoods: FavoriteGood[];
}

export default function Home({ initialGoods }: Props) {
  const [goods, setGoods] = useState(initialGoods);

  const dispatch = useDispatch();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const onDelete = (id: number) => {
    setGoods((prevArray) => prevArray.filter((item) => item.id !== id));
  };
  useEffect(() => {
    setGoods(initialGoods);

    const favoriteIds = initialGoods?.map(({ id }) => id);
    dispatch(setFavorites(favoriteIds));
  }, [initialGoods]);

  return (
    <div>
      <CartModal />
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
              <h2 className={styles.profileSubtitle}>Избранное</h2>
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
              {goods?.length > 0 ? (
                <div>
                  {goods.map((good) => (
                    <ProfileFavoriteItem key={good.name} good={good} onDelete={onDelete} />
                  ))}
                </div>
              ) : (
                <ProfileEmptyField text="Пусто" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  let initialGoods = null;

  try {
    await checkAuth(req, true);
    const favoritesRes = await api.getFavorites();

    initialGoods = normalizeGoods(favoritesRes.data.data);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      initialGoods,
    },
  };
};
