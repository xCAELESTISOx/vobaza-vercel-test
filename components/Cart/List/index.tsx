import { FC } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

import { Button } from '@nebo-team/vobaza.ui.button';
import CartListItem from '../ListItem';

const CartList: FC = () => {
  const router = useRouter();

  const goShopping = () => {
    router.push('/');
  };

  return (
    <div className={styles.cartList}>
      {true ? (
        <div className={`${styles.cartContent} ${styles.small}`}>
          <div className={styles.cartHeader}>
            <h2 className={styles.cartTitle}>ВоБаза</h2>
          </div>
          <div className={styles.cartListItemBlock}>
            <CartListItem />
          </div>
          <div className={styles.cartListItemBlock}>
            <CartListItem />
          </div>
          <div className={styles.cartListItemBlock}>
            <CartListItem />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.cartEmptyList}>пусто</div>
          <div className={styles.cartButtons}>
            <Button
              style={{
                color: '#af1ebe',
                backgroundColor: '#f2f2f2',
                fontWeight: 500,
              }}
              text="Продолжить покупки"
              onClick={goShopping}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default CartList;
