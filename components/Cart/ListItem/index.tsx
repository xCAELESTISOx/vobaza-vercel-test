import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';
import tmpImg1 from './tmp/good1.jpg';

import { Icon } from '@nebo-team/vobaza.ui.icon';

const CartListItem: FC = () => {
  const deleteItem = () => {
    console.log('delete');
  };
  const removeItem = () => {
    console.log('removeItem');
  };
  const addItem = () => {
    console.log('addItem');
  };

  return (
    <div className={styles.cartListItem}>
      <div className={styles.cartListItemImageBlock}>
        <Link href="/">
          <a>
            <Image width="100" height="100" src={tmpImg1} alt="Good" />
          </a>
        </Link>
      </div>
      <div className={styles.cartListItemContent}>
        <Link href="/">
          <a className={styles.cartListItemTitle}>Диван Ричмонд Шоколадный</a>
        </Link>
        <div className={styles.cartListItemFeatures}>
          <div className={styles.cartListItemFeature}>169х110х93</div>
          <div className={styles.cartListItemFeature}>Велюр</div>
          <div className={styles.cartListItemFeature}>Аккордеон</div>
          <div className={styles.cartListItemFeature}>Ортопедические латы</div>
          <div className={styles.cartListItemFeature}>160х200</div>
        </div>
        <div className={styles.cartListItemButtons}>
          <div className={styles.cartListItemButton}>
            <Icon name="Minus" onClick={removeItem} />
            1
            <Icon name="SmallPlus" onClick={addItem} />
          </div>
          <div className={styles.cartListItemPriceForOne}>51990 ₽ / шт</div>
        </div>
      </div>
      <div className={styles.cartListItemPriceBlock}>
        <div className={styles.cartListItemPrice}>
          <div className={styles.cartListItemPriceOld}>59 990 ₽</div>
          <div>51 990 ₽</div>
        </div>
        <button className={styles.cartListItemDelete} onClick={deleteItem}>
          <Icon name="Trash" />
        </button>
      </div>
    </div>
  );
};
export default CartListItem;
