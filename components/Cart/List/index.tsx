import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';
import { useGoods } from '../../../src/context/goods';
import { api } from '../../../assets/api';

import { Button } from '@nebo-team/vobaza.ui.button';
import CartListItem, { ICartGood } from '../ListItem';
import CartItemChangeModal from '../Modal/CartItemChangeModal';

type Props = {
  initialGoods: ICartGood[];
  setOrderPrice: (price: number) => void;
};

const CartList: FC<Props> = ({ initialGoods, setOrderPrice }) => {
  const [goods, setGoods] = useState(initialGoods);
  const [isCountChangeModal, setIsCountChangeModal] = useState(false);
  const router = useRouter();
  const { dispatch } = useGoods();

  const goShopping = () => {
    router.push('/');
  };
  const closeModal = () => {
    setIsCountChangeModal(false);
  };

  const deleteItem = async (id: number, quantity: number) => {
    try {
      const res = await api.removeGoodFromCart(id, {
        quantity: quantity,
        include: 'prices',
      });
      setGoods((prevArray) =>
        prevArray.filter((good) => good.product.id !== id)
      );
      dispatch({
        type: 'changeCartSize',
        payload: res.data.data.changed_quantity,
      });
      setOrderPrice(res.data.data.order_price / 100);
    } catch (error) {
      console.log(error);
    }
  };
  const changeItem = async (id: number, quantity: number) => {
    if (quantity === 0) return;
    try {
      let res = null;
      if (quantity > 0) {
        res = await api.addGoodToCart(id, { quantity, include: 'prices' });
      } else {
        res = await api.removeGoodFromCart(id, {
          quantity: quantity * -1,
          include: 'prices',
        });
      }
      dispatch({
        type: 'changeCartSize',
        payload: res.data.data.changed_quantity,
      });
      setGoods((prevArray) =>
        prevArray.map((item) => {
          if (item.product.id === id) {
            return {
              ...item,
              price: res.data.data.price / 100,
              list_price: res.data.data.list_price / 100 || null,
              quantity: item.quantity + res.data.data.changed_quantity,
            };
          }
          return {
            ...item,
          };
        })
      );
      setOrderPrice(res.data.data.order_price / 100);
      if (res.data.data.changed_quantity !== quantity) {
        setIsCountChangeModal(true);
      }
      return res.data.data.changed_quantity;
    } catch (error) {
      if (error.response.data.errors[0].code === '1') {
        setIsCountChangeModal(true);
        throw new Error();
      }
    }
  };

  useEffect(() => {
    setGoods(initialGoods);
  }, [initialGoods]);

  return (
    <div className={styles.cartList}>
      {isCountChangeModal && <CartItemChangeModal onClose={closeModal} />}
      {goods && goods.length > 0 ? (
        <div className={`${styles.cartContent} ${styles.small}`}>
          <div className={styles.cartHeader}>
            <h2 className={styles.cartTitle}>ВоБаза</h2>
          </div>
          {goods.map((good) => (
            <div key={good.product.id} className={styles.cartListItemBlock}>
              <CartListItem
                good={good}
                deleteItem={deleteItem}
                changeItem={changeItem}
              />
            </div>
          ))}
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
