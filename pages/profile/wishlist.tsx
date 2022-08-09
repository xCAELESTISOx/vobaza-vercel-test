import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import styles from '../../styles/Profile.module.scss';
import { api } from '../../assets/api';
import checkAuth from '../../assets/api/auth';
import normalizeGoods from '../../assets/utils/normalizers/normalizeGoods';

import ProfileSidebar from '../../components/Profile/Sidebar';
import ProfileEmptyField from '../../components/Profile/EmptyField';
import ProfileFavoriteItem, { FavoriteGood } from '../../components/Profile/Favorite/Item';
import CartModal from '../../components/Goods/Modals/Cart/Cart';

interface Props {
  initialGoods: FavoriteGood[];
}

export default function Home({ initialGoods }: Props) {
  const [goods, setGoods] = useState(initialGoods);

  const onDelete = (id: number) => {
    setGoods((prevArray: any) => prevArray.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setGoods(initialGoods);
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
              <h2 className={styles.profileSubtitle}>Избранное</h2>

              {goods && goods.length > 0 ? (
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
