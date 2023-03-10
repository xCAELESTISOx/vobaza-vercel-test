import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { Image as IImage } from '../../../src/models/IImage';
import { getImageVariantProps } from 'shared/lib/images';
import { toNumberWithSpaces } from 'shared/lib/formatters';
import { useCart } from '../../../shared/lib/hooks/useCart';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { removeFavorite } from 'src/store/goods';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import { api } from '../../../app/api';
import styles from './styles.module.scss';
import { metric } from 'features/metric';

export type FavoriteGood = {
  id: number;
  slug: string;
  sku: number;
  name: string;
  price: number;
  list_price?: number;
  main_image?: IImage;
  is_available: boolean;
  parent_categories: { id: number; name: string }[];
  brand?: string;
  seo?: {
    page_name?: string;
  };
};

type Props = {
  good: FavoriteGood;
  onDelete: (id: number) => void;
};
const ProfileFavoriteItem: FC<Props> = ({ good, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { addToCart } = useCart(good);

  const removeFromFavorite = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await api.deleteGoodFavorite(good.id);
      dispatch(removeFavorite(good.id));
      onDelete(good.id);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const addToCartHandler = () => {
    addToCart();

    const categories = good.parent_categories.map(({ name }) => name);
    metric.addProduct(good, categories.join('/'));
  };

  return (
    <div className={styles.profileFavoriteItem}>
      <Link href={`/product/${good.slug}`} passHref>
        <a className={styles.profileFavoriteItemImage} target="_blank">
          {good.main_image ? (
            <Image {...getImageVariantProps(good.main_image.variants, 'small')} objectFit="contain" alt={good.name} />
          ) : (
            <Image src={PlaceholderImage} objectFit="contain" alt="" unoptimized />
          )}
        </a>
      </Link>
      <div className={styles.profileFavoriteItemInfoBlock}>
        <div>
          <Link href={`/product/${good.slug}`} passHref>
            <a className={styles.profileFavoriteItemTitle} target="_blank">
              {good.seo?.page_name || good.name}
            </a>
          </Link>
          {/* <div className={styles.profileFavoriteItemInfo}>{item.info}</div> */}
        </div>
        <Icon className={styles.profileFavoriteItemDelete} name="Trash" onClick={removeFromFavorite} />
      </div>
      <div className={styles.profileFavoriteItemRight}>
        <div className={styles.profileFavoriteItemPricesBlock}>
          <div className={styles.profileFavoriteItemPrices}>
            {good.list_price && (
              <div className={styles.profileFavoriteItemPriceOld}>{toNumberWithSpaces(good.list_price)} ???</div>
            )}
            <div className={styles.profileFavoriteItemPrice}>{toNumberWithSpaces(good.price)} ???</div>
          </div>
          <Icon className={styles.profileFavoriteItemDelete} name="Trash" onClick={removeFromFavorite} />
        </div>

        <div className={styles.profileFavoriteItemCart}>
          {good.is_available ? (
            <Button text="?? ??????????????" onClick={addToCartHandler} disabled={!good.price} />
          ) : (
            <div className={styles.notAavailable}>?????? ?? ??????????????</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileFavoriteItem;
