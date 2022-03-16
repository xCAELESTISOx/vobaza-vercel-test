import { GetServerSideProps } from 'next';

import styles from '../styles/Cart.module.scss';
import checkAuth from '../assets/api/auth';
import { api } from '../assets/api';

import CartList from '../components/Cart/List';
import CartSidebar from '../components/Cart/Sidebar';
import { ICartGood } from '../components/Cart/ListItem';
import { useState } from 'react';

type Props = {
  initialGoods: ICartGood[];
  initialPrice: number;
  withCountChange: boolean;
};

export default function Cart({ initialGoods, initialPrice, withCountChange }) {
  const [orderPrice, setOrderPrice] = useState(initialPrice);

  return (
    <div>
      <div className="container">
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Корзина</h2>
          <div className={styles.cartContent}>
            <div className={styles.cartContentBlock}>
              <CartList
                initialGoods={initialGoods}
                setOrderPrice={setOrderPrice}
                withCountChange={withCountChange}
              />
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

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  let initialGoods = [];
  let initialPrice = 0;
  let withCountChange = false;

  try {
    await checkAuth(req, true);
    const cartRes = await api.getCart();

    initialGoods = cartRes.data.data.products.map((good) => {
      return {
        quantity: good.quantity,
        price: good.price / 100,
        list_price: good.list_price / 100,
        product: {
          ...good.product,
          price: good.product.price / 100,
          list_price: good.product.list_price
            ? good.product.list_price / 100
            : null,
        },
      };
    });
    initialPrice = cartRes.data.data.order_price / 100;

    if (cartRes.data.data.basket_changed) {
      withCountChange = true;
    }
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
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
