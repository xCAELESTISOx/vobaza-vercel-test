import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import { Button } from '@nebo-team/vobaza.ui.button';
import { Icon } from '@nebo-team/vobaza.ui.icon';

type Props = {
  item: {
    title: string;
    info: string;
    price: string;
    oldPrice?: string;
  };
};
const ProfileFavoriteItem: FC<Props> = ({ item }) => {
  return (
    <div className={styles.profileFavoriteItem}>
      <Link href="/">
        <a className={styles.profileFavoriteItemImage}></a>
      </Link>
      <div className={styles.profileFavoriteItemInfoBlock}>
        <div>
          <Link href="/">
            <a className={styles.profileFavoriteItemTitle}>{item.title}</a>
          </Link>
          <div className={styles.profileFavoriteItemInfo}>{item.info}</div>
        </div>
        <Icon className={styles.profileFavoriteItemDelete} name="Trash" />
      </div>
      <div className={styles.profileFavoriteItemRight}>
        <div className={styles.profileFavoriteItemPricesBlock}>
          <div className={styles.profileFavoriteItemPrices}>
            {item.oldPrice && (
              <div className={styles.profileFavoriteItemPriceOld}>
                {item.oldPrice} ₽
              </div>
            )}
            <div className={styles.profileFavoriteItemPrice}>
              {item.price} ₽
            </div>
          </div>
          <Icon className={styles.profileFavoriteItemDelete} name="Trash" />
        </div>
        <div className={styles.profileFavoriteItemCart}>
          <Button text="В корзину" />
        </div>
      </div>
    </div>
  );
};
export default ProfileFavoriteItem;
