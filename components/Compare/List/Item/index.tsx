import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useCart } from 'shared/lib/hooks/useCart';
import { IGoodCompare } from 'entities/products/model/IGood';
import { toNumberWithSpaces } from 'shared/lib/formatters';
import { getImageVariantProps } from 'shared/lib/images';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { setOneClickGood } from 'src/store/goods';
import { metric } from 'features/metric';

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
  const dispatch = useDispatch();

  const deleteGoodHandler = () => {
    deleteGood(good);
  };

  const openOneClickOrder = () => {
    dispatch(setOneClickGood(good));
  };

  const addToCartHandler = () => {
    const categories = good.parent_categories.map(({ name }) => name);
    metric.addProduct(good, categories.join('/'));
    addToCart();
  };

  return (
    <div className={styles.compareListItem}>
      <button className={styles.compareListItemDelete} onClick={deleteGoodHandler}>
        <Icon name="Trash" /> Удалить
      </button>
      <div className={styles.compareListItemImage}>
        <Link href={`/product/${good.slug}`} passHref>
          <a target="_blank">
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
        <Link href={`/product/${good.slug}`} passHref>
          <a target="_blank">{good.seo?.page_name || good.name}</a>
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
          <div className={styles.compareListItemCartButtons}>
            <Button text="В корзину" onClick={addToCartHandler} disabled={!good.price} />
            {!!good.price && (
              <div>
                <Button
                  text="Заказать в 1 клик"
                  variation="dashed"
                  style={{ fontSize: '14px' }}
                  onClick={openOneClickOrder}
                />
              </div>
            )}
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
