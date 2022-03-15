import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';
import { toNumberWithSpaces } from '../../../assets/utils/formatters';
import { Image as IImage } from '../../../src/models/IImage';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import ItemCounter from '../../UI/ItemCounter';

export type ICartGood = {
  product: {
    id: number;
    slug: string;
    sku: number;
    name: string;
    price: number;
    list_price?: number;
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
      setCount(good.quantity + quantity);
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
        <Link
          href={`/product/${good.product.slug}_${good.product.id}_${good.product.sku}`}
        >
          <a>
            {good.product.main_image ? (
              <Image
                src={good.product.main_image.variants.small.url}
                width={good.product.main_image.variants.small.meta.width}
                height={good.product.main_image.variants.small.meta.height}
                objectFit="contain"
                alt={good.product.name}
              />
            ) : (
              <Icon name="ImagePlaceholder" />
            )}
          </a>
        </Link>
      </div>
      <div className={styles.cartListItemContent}>
        <Link
          href={`/product/${good.product.slug}_${good.product.id}_${good.product.sku}`}
        >
          <a className={styles.cartListItemTitle}>{good.product.name}</a>
        </Link>
        {/* <div className={styles.cartListItemFeatures}>
          <div className={styles.cartListItemFeature}>169х110х93</div>
          <div className={styles.cartListItemFeature}>Велюр</div>
          <div className={styles.cartListItemFeature}>Аккордеон</div>
          <div className={styles.cartListItemFeature}>Ортопедические латы</div>
          <div className={styles.cartListItemFeature}>160х200</div>
        </div> */}
        <div className={styles.cartListItemButtons}>
          <ItemCounter
            minCount={1}
            itemCount={count}
            setItemCount={setCount}
            isLoading={isLoading}
            isWhite
          />
          <div className={styles.cartListItemPriceForOne}>
            {toNumberWithSpaces(good.product.price)} ₽ / шт
          </div>
        </div>
      </div>
      <div className={styles.cartListItemPriceBlock}>
        <div className={styles.cartListItemPrice}>
          {good.product.list_price && (
            <div className={styles.cartListItemPriceOld}>
              {toNumberWithSpaces(good.list_price)} ₽
            </div>
          )}
          <div>{toNumberWithSpaces(good.price)} ₽</div>
        </div>
        <button
          className={`${styles.cartListItemDelete} ${
            isLoading ? styles.pending : ''
          }`}
          onClick={deleteItemHandler}
        >
          <Icon name="Trash" />
        </button>
      </div>
    </div>
  );
};
export default CartListItem;
