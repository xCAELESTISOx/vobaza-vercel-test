import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';
import { toNumberWithSpaces } from '../../../assets/utils/formatters';
import { Image as IImage } from '../../../src/models/IImage';
import { getImageVariantProps } from 'assets/utils/images';
import PlaceholderImage from 'assets/images/placeholder_small.png';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import ItemCounter from '../../UI/ItemCounter';

export type ICartGood = {
  product: {
    id: number;
    slug: string;
    sku: number;
    name: string;
    price: number;
    list_price?: number;
    assembly: 'NONE' | 'SIMPLY' | 'PROFESSIONAL';
    main_image: IImage;
  };
  quantity: number;
  price: number;
  list_price?: number;
};

type Props = {
  good: ICartGood;
  deleteItem: (id: number, quantity: number) => void;
  changeItem: (id: number, quantity: number) => Promise<any>;
};

const CartListItem: FC<Props> = ({ good, deleteItem, changeItem }) => {
  const [count, setCount] = useState(good.quantity);
  const [isLoading, setIsLoading] = useState(true);

  const deleteItemHandler = () => {
    deleteItem(good.product.id, good.quantity);
  };

  const changeItemCount = async () => {
    setIsLoading(true);
    try {
      const quantity = await changeItem(good.product.id, count - good.quantity);
      if (quantity) {
        setCount(good.quantity + quantity);
      } else {
        setCount(good.quantity);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setCount(good.quantity);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      const debounce = setTimeout(() => {
        changeItemCount();
      }, 400);
      return () => clearTimeout(debounce);
    } else {
      setIsLoading(false);
    }
  }, [count]);

  return (
    <div className={styles.cartListItem}>
      <div className={styles.cartListItemImageBlock}>
        <Link href={`/product/${good.product.slug}-${good.product.sku}`}>
          <a>
            {good.product.main_image ? (
              <Image
                {...getImageVariantProps(good.product.main_image.variants, 'small')}
                objectFit="contain"
                alt={good.product.name}
              />
            ) : (
              <Image src={PlaceholderImage} objectFit="contain" alt={good.product.name} unoptimized />
            )}
          </a>
        </Link>
      </div>
      <div className={styles.cartListItemContent}>
        <Link href={`/product/${good.product.slug}-${good.product.sku}`}>
          <a className={styles.cartListItemTitle}>{good.product.name}</a>
        </Link>
        <div className={styles.cartListItemButtons}>
          <ItemCounter minCount={1} itemCount={count} setItemCount={setCount} isLoading={isLoading} isWhite />
          <div className={styles.cartListItemPriceForOne}>{toNumberWithSpaces(good.product.price)} ₽ / шт</div>
        </div>
      </div>
      <div className={styles.cartListItemPriceBlock}>
        <div className={styles.cartListItemPrice}>
          {good.product.list_price && (
            <div className={styles.cartListItemPriceOld}>{toNumberWithSpaces(good.list_price)} ₽</div>
          )}
          <div>{toNumberWithSpaces(good.price)} ₽</div>
        </div>
        <button
          className={`${styles.cartListItemDelete} ${isLoading ? styles.pending : ''}`}
          onClick={deleteItemHandler}
        >
          <Icon name="Trash" />
        </button>
      </div>
    </div>
  );
};
export default CartListItem;
