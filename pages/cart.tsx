import { GetServerSideProps } from 'next';

import styles from '../styles/Cart.module.scss';
import checkAuth from '../assets/api/auth';
import { api } from '../assets/api';

import CartList from '../components/Cart/List';
import CartSidebar from '../components/Cart/Sidebar';
import { ICartGood } from '../components/Cart/ListItem';
import { useEffect, useState } from 'react';

type Props = {
  withCountChange: boolean;
  initialPrice: number;
  initialGoods: ICartGood[];
};

export default function Cart({ initialGoods, initialPrice, withCountChange }) {
  const [orderPrice, setOrderPrice] = useState(initialPrice);

  useEffect(() => {
    setOrderPrice(initialPrice);
  }, [initialPrice]);

  return (
    <div>
      <div className="container">
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Корзина</h2>
          <div className={styles.cartContent}>
            <div className={styles.cartContentBlock}>
              <CartList initialGoods={initialGoods} setOrderPrice={setOrderPrice} withCountChange={withCountChange} />
            </div>
            <div>
              <CartSidebar price={orderPrice} />
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
