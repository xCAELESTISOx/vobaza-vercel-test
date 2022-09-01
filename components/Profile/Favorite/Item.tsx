import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { Image as IImage } from '../../../src/models/IImage';
import { getImageVariantProps } from 'assets/utils/images';
import { toNumberWithSpaces } from '../../../assets/utils/formatters';
import { useGoods } from '../../../src/context/goods';
import { useCart } from '../../../src/hooks/useCart';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import { api } from '../../../assets/api';
import styles from './styles.module.scss';

export type FavoriteGood = {
  id: number;
  slug: string;
  sku: number;
  name: string;
  price: number;
  list_price?: number;
  main_image?: IImage;
  is_available: boolean;
};

type Props = {
  good: FavoriteGood;
  onDelete: (id: number) => void;
};
const ProfileFavoriteItem: FC<Props> = ({ good, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useGoods();
  const { addToCart } = useCart(good);

  const removeFromFavorite = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await api.deleteGoodFavorite(good.id);
      dispatch({ type: 'removeFavorite', payload: good.id });
      onDelete(good.id);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const addToCartHandler = () => {
    addToCart();
  };

  return (
    <div className={styles.profileFavoriteItem}>
      <Link href={`/product/${good.slug}-${good.sku}`}>
        <a className={styles.profileFavoriteItemImage}>
          {good.main_image ? (
            <Image {...getImageVariantProps(good.main_image.variants, 'small')} objectFit="contain" alt={good.name} />
          ) : (
            <Image src={PlaceholderImage} objectFit="contain" alt="" unoptimized />
          )}
        </a>
      </Link>
      <div className={styles.profileFavoriteItemInfoBlock}>
        <div>
          <Link href={`/product/${good.slug}-${good.sku}`}>
            <a className={styles.profileFavoriteItemTitle}>{good.name}</a>
          </Link>
          {/* <div className={styles.profileFavoriteItemInfo}>{item.info}</div> */}
        </div>
        <Icon className={styles.profileFavoriteItemDelete} name="Trash" onClick={removeFromFavorite} />
      </div>
      <div className={styles.profileFavoriteItemRight}>
        <div className={styles.profileFavoriteItemPricesBlock}>
          <div className={styles.profileFavoriteItemPrices}>
            {good.list_price && (
              <div className={styles.profileFavoriteItemPriceOld}>{toNumberWithSpaces(good.list_price)} ₽</div>
            )}
            <div className={styles.profileFavoriteItemPrice}>{toNumberWithSpaces(good.price)} ₽</div>
          </div>
          <Icon className={styles.profileFavoriteItemDelete} name="Trash" onClick={removeFromFavorite} />
        </div>

        <div className={styles.profileFavoriteItemCart}>
          {good.is_available ? (
            <Button text="В корзину" onClick={addToCartHandler} />
          ) : (
            <div className={styles.notAavailable}>Нет в наличии</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileFavoriteItem;
