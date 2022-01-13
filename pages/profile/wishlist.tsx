import styles from '../../styles/Profile.module.scss';

import ProfileSidebar from '../../components/Profile/Sidebar';
import ProfileEmptyField from '../../components/Profile/EmptyField';
import ProfileFavoriteItem from '../../components/Profile/Favorite/Item';

const tmpItems = [
  {
    title: 'Диван-кровать Мадрид 3-2 Зеленый',
    info: '207х104х83',
    price: '49 084',
    oldPrice: '59 990',
  },
  {
    title: 'Диван-кровать Tramp Синий',
    info: '250х120х65',
    price: '50 290',
  },
];

export default function ProfileWishlist() {
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
              <h2 className={styles.profileSubtitle}>Избранное</h2>

              {tmpItems && tmpItems.length > 0 ? (
                <div>
                  {tmpItems.map((item) => (
                    <ProfileFavoriteItem key={item.title} item={item} />
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
