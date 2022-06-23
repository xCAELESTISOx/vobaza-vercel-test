import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useGoods } from 'src/context/goods';
import { useCart } from 'src/hooks/useCart';
import { IGoodCompare } from 'src/models/IGood';
import { toNumberWithSpaces } from 'assets/utils/formatters';
import { getImageVariantProps } from 'assets/utils/images';

import ItemCounter from 'components/UI/ItemCounter';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Button } from '@nebo-team/vobaza.ui.button';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

type Props = {
  good: IGoodCompare;
  deleteGood: (good) => void;
};

const CompareListItem: FC<Props> = ({ good, deleteGood }) => {
  const { addToCart } = useCart(good);
  const { dispatch } = useGoods();
  const [count, setCount] = useState(1);

  const deleteGoodHandler = () => {
    deleteGood(good);
  };

  const openOneClickOrder = () => {
    dispatch({ type: 'setOneClickGood', payload: good });
  };
  const addToCartHandler = () => {
    addToCart(count);
  };

  return (
    <div className={styles.compareListItem}>
      <button className={styles.compareListItemDelete} onClick={deleteGoodHandler}>
        <Icon name="Trash" /> Удалить
      </button>
      <div className={styles.compareListItemImage}>
        <Link href={`/product/${good.slug}-${good.sku}`}>
          <a>
            {good.main_image ? (
              <Image
                {...getImageVariantProps(good.main_image.variants, 'medium')}
                objectFit="contain"
                alt={good.name}
              />
            ) : (
              <Image src={PlaceholderImage} objectFit="contain" alt={good.name} unoptimized />
            )}
          </a>
        </Link>
      </div>
      <div className={styles.compareListItemTitle}>
        <Link href={`/product/${good.slug}-${good.sku}`}>
          <a>{good.name}</a>
        </Link>
      </div>
      <div className={styles.compareListItemPrices}>
        {good.list_price && (
          <div className={styles.compareListItemOldPrice}>{toNumberWithSpaces(good.list_price)} ₽</div>
        )}
        &nbsp;
        <div className={styles.compareListItemPrice}>{toNumberWithSpaces(good.price)} ₽</div>
      </div>
      {good.is_available ? (
        <>
          <div className={styles.compareListItemCart}>
            <label htmlFor="count" className={styles.compareListItemCartLabel}>
              Кол-во:
            </label>
            <ItemCounter minCount={1} itemCount={count} setItemCount={setCount} />
          </div>
          <div className={styles.compareListItemCartButtons}>
            <Button text="В корзину" onClick={addToCartHandler} />
            <div>
              <Button
                text="Заказать в 1 клик"
                variation="dashed"
                style={{ fontSize: '14px' }}
                onClick={openOneClickOrder}
              />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.compareListItemCartButtons}>
          <div className={styles.compareListItemCartNotAvailiable}>
            <Icon name={'Cross'} /> Нет в наличии
          </div>
        </div>
      )}
    </div>
  );
};
export default CompareListItem;
