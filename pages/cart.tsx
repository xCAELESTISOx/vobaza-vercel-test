import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import type { ICartGood } from '../components/Cart/ListItem';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { setCartSize } from 'src/store/goods';
import checkAuth from '../app/api/auth';

import CartList from '../components/Cart/List';
import CartSidebar from '../components/Cart/Sidebar';

import { api } from '../app/api';
import styles from 'app/styles/Cart.module.scss';

type Props = {
  withCountChange: boolean;
  initialPrice: number;
  initialGoods: ICartGood[];
};

export default function Cart({ initialGoods, initialPrice, withCountChange }: Props) {
  const [orderPrice, setOrderPrice] = useState(initialPrice);
  const [goodsList, setGoodsList] = useState(initialGoods);
  const dispatch = useDispatch();

  useEffect(() => {
    setOrderPrice(initialPrice);
  }, [initialPrice]);

  useEffect(() => {
    const newCartSize = initialGoods.reduce((acc, item) => acc + item.quantity, 0);

    dispatch(setCartSize(newCartSize));
  }, [initialGoods]);

  const handleDeleteGood = (products: ICartGood[]) => {
    setGoodsList(products);
  };

  return (
    <div>
      <div className="container">
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Корзина</h2>
          <div className={styles.cartContent}>
            <div className={styles.cartContentBlock}>
              <CartList
                goods={goodsList}
                setOrderPrice={setOrderPrice}
                withCountChange={withCountChange}
                onChangeGoods={handleDeleteGood}
              />
            </div>
            <div>
              <CartSidebar price={orderPrice} goods={goodsList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  let initialGoods = [];
  let initialPrice = 0;
  let withCountChange = false;

  try {
    await checkAuth(req, true);
    const cartRes = await api.getCart();
    const cart = cartRes.data.data;

    initialPrice = cart.order_price / 100;
    initialGoods = cart.products.map((good) => {
      return {
        quantity: good.quantity,
        price: good.price / 100,
        list_price: good.list_price / 100,
        product: {
          ...good.product,
          price: good.product.price / 100,
          list_price: good.product.list_price ? good.product.list_price / 100 : null,
        },
      };
    });

    if (cart.basket_changed) {
      withCountChange = true;
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialGoods,
        initialPrice,
        withCountChange,
      },
    };
  }

  return {
    props: {
      initialGoods,
      initialPrice,
      withCountChange,
    },
  };
};
