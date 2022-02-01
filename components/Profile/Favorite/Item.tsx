import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';
import { api } from '../../../assets/api';
import { Image as IImage } from '../../../src/models/IImage';

import { Button } from '@nebo-team/vobaza.ui.button';
import { Icon } from '@nebo-team/vobaza.ui.icon';

export type FavoriteGood = {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  main_image: IImage;
};

type Props = {
  good: FavoriteGood;
  onDelete: (id: number) => void;
};
const ProfileFavoriteItem: FC<Props> = ({ good, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const removeFromFavorite = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await api.deleteGoodFavorite(good.id);
      onDelete(good.id);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className={styles.profileFavoriteItem}>
      {/* TODO api */}
      <Link href="/">
        <a className={styles.profileFavoriteItemImage}>
          {good.main_image ? (
            <Image
              src={good.main_image.variants.original.url}
              layout="fill"
              objectFit="cover"
              alt={good.name}
            />
          ) : (
            <Icon name="ImagePlaceholder" />
          )}
        </a>
      </Link>
      <div className={styles.profileFavoriteItemInfoBlock}>
        <div>
          {/* TODO api */}
          <Link href="/">
            <a className={styles.profileFavoriteItemTitle}>{good.name}</a>
          </Link>
          {/* <div className={styles.profileFavoriteItemInfo}>{item.info}</div> */}
        </div>
        <Icon
          className={styles.profileFavoriteItemDelete}
          name="Trash"
          onClick={removeFromFavorite}
        />
      </div>
      <div className={styles.profileFavoriteItemRight}>
        <div className={styles.profileFavoriteItemPricesBlock}>
          <div className={styles.profileFavoriteItemPrices}>
            {good.discount_price && (
              <div className={styles.profileFavoriteItemPriceOld}>
                {Intl.NumberFormat('ru-RU').format(good.price)} ₽
              </div>
            )}
            <div className={styles.profileFavoriteItemPrice}>
              {Intl.NumberFormat('ru-RU').format(
                good.discount_price ? good.discount_price : good.price
              )}{' '}
              ₽
            </div>
          </div>
          <Icon
            className={styles.profileFavoriteItemDelete}
            name="Trash"
            onClick={removeFromFavorite}
          />
        </div>
        <div className={styles.profileFavoriteItemCart}>
          <Button text="В корзину" />
        </div>
      </div>
    </div>
  );
};
export default ProfileFavoriteItem;
