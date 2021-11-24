import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import tmpImg1 from './tmp/good1.jpg';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Button } from '@nebo-team/vobaza.ui.button';

const CompareListItem: FC = () => {
  const [itemCount, setItemCount] = useState(1);

  const removeItem = () => {
    if (itemCount <= 1) return;
    setItemCount(itemCount - 1);
  };
  const addItem = () => {
    setItemCount(itemCount + 1);
  };

  const openOneClickOrder = () => {
    // TODO open popup
  };
  const addToCart = () => {
    // TODO add
  };

  return (
    <div className={styles.compareListItem}>
      <button className={styles.compareListItemDelete}>
        <Icon name="Trash" onClick={() => {}} /> Удалить
      </button>
      <div className={styles.compareListItemImage}>
        <Link href="/">
          <a>
            <Image src={tmpImg1} alt="" />
          </a>
        </Link>
      </div>
      <div className={styles.compareListItemTitle}>
        <Link href="/">
          <a>
            Кровать двуспальная MOON FAMILY 1232 с бельевым ящиком Желтый
            180x200
          </a>
        </Link>
      </div>
      <div className={styles.compareListItemPrices}>
        <div className={styles.compareListItemOldPrice}>31 900 ₽</div>
        &nbsp;
        <div className={styles.compareListItemPrice}>30 390 ₽</div>
      </div>
      <div className={styles.compareListItemCart}>
        <label htmlFor="count" className={styles.compareListItemCartLabel}>
          Кол-во:
        </label>
        <div className={styles.compareListItemCartBlock}>
          <Icon name="Minus" onClick={removeItem} />
          <input
            className={styles.compareListItemCartInput}
            type="text"
            id="count"
            name="count"
            value={itemCount}
          />
          <Icon name="SmallPlus" onClick={addItem} />
        </div>
      </div>
      <div className={styles.compareListItemCartButtons}>
        <Button text="В корзину" onClick={addToCart} />
        <div>
          <Button
            text="Заказать в 1 клик"
            variation="dashed"
            style={{ fontSize: '14px' }}
            onClick={openOneClickOrder}
          />
        </div>
      </div>
    </div>
  );
};
export default CompareListItem;
