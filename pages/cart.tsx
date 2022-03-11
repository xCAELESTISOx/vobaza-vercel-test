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
};

export default function Cart({ initialGoods, initialPrice }) {
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

  try {
    await checkAuth(req, true);
    const cartRes = await api.getCart();

    initialGoods = cartRes.data.data.products.map((good) => {
      return {
        quantity: good.quantity,
        price: good.price / 100,
        discount_price: good.discount_price / 100,
        product: {
          ...good.product,
          price: good.product.price / 100,
          discount_price: good.product.discount_price
            ? good.product.discount_price / 100
            : null,
        },
      };
    });
    initialPrice = cartRes.data.data.order_price / 100;
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
    },
  };
};
