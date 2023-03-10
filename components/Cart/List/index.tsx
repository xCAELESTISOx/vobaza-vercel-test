import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { addToCartSize } from 'src/store/goods';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import CartListItem, { ICartGood } from '../ListItem';
import CartItemChangeModal from '../Modal/CartItemChangeModal';

import { api } from '../../../app/api';
import styles from './styles.module.scss';

type Props = {
  goods: ICartGood[];
  withCountChange?: boolean;
  setOrderPrice: (price: number) => void;
  onChangeGoods?: (goods: ICartGood[]) => void;
};

const CartList: FC<Props> = ({ goods, withCountChange = false, setOrderPrice, onChangeGoods }) => {
  // const [goods, setGoods] = useState(initialGoods);
  const [isCountChangeModal, setIsCountChangeModal] = useState(withCountChange);
  const [errorTitle, setErrorTitle] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const goShopping = () => {
    router.push('/');
  };
  const closeModal = () => {
    setIsCountChangeModal(false);
    setErrorTitle('');
  };

  const deleteItem = async (id: number, quantity: number) => {
    try {
      const res = await api.removeGoodFromCart(id, {
        quantity: quantity,
        include: 'prices',
      });
      onChangeGoods(goods.filter((good) => good.product.id !== id));

      dispatch(addToCartSize(res.data.data.changed_quantity));
      setOrderPrice(res.data.data.order_price / 100);
    } catch (error) {
      console.error(error);
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
      dispatch(addToCartSize(res.data.data.changed_quantity));
      onChangeGoods(
        goods.map((item) => {
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
      if (error.response?.status === 422) {
        setErrorTitle('???????????????????????? ?????????????? ???????????? ?????? ????????????. ???????????????????? ???????? ?????????????????? ???? ????????????????????.');
        setIsCountChangeModal(true);
        throw new Error();
      }
    }
  };

  return (
    <div className={styles.cartList}>
      {isCountChangeModal && (
        <CartItemChangeModal onClose={closeModal} description={errorTitle} title="???????????????????? ???????????? ????????????????????." />
      )}
      {goods && goods.length > 0 ? (
        <div className={`${styles.cartContent} ${styles.small}`}>
          <div className={styles.cartHeader}>
            <h2 className={styles.cartTitle}>????????????</h2>
          </div>
          {goods.map((good) => (
            <div key={good.product.id} className={styles.cartListItemBlock}>
              <CartListItem good={good} deleteItem={deleteItem} changeItem={changeItem} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.cartEmptyList}>??????????</div>
          <div className={styles.cartButtons}>
            <Button
              style={{
                color: '#af1ebe',
                backgroundColor: '#f2f2f2',
                fontWeight: 500,
              }}
              text="???????????????????? ??????????????"
              onClick={goShopping}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default CartList;
