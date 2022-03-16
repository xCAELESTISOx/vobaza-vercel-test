import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import styles from '../../styles/Cart.module.scss';
import checkAuth from '../../assets/api/auth';
import { api } from '../../assets/api';
import { useGoods } from '../../src/context/goods';
import { ICartGood } from '../../components/Cart/ListItem';
import { IProfile } from '../../components/Profile/Data';
import {
  IOrder,
  IOrderAddress,
  IOrderDelivery,
  IOrderDeliveryType,
} from '../../src/models/IOrder';

import CartSidebar from '../../components/Cart/Sidebar';
import OrderReceiver, { Receiver } from '../../components/Cart/Order/Receiver';
import OrderAddress from '../../components/Cart/Order/Address';
import OrderDelivery from '../../components/Cart/Order/Delivery';
import OrderPayment from '../../components/Cart/Order/Payment';

type Props = {
  user: IProfile;
  goods: ICartGood[];
  price: number;
};

export default function Checkout({ goods, price, user }) {
  const formRef = useRef(null);
  const router = useRouter();
  const { dispatch } = useGoods();
  const [address, setAddress] = useState<IOrderAddress>({
    address: 'Ростов-на-Дону',
    flat: '',
    entrance: '',
    floor: '',
    intercom: '',
  });
  const [delivery, setDelivery] = useState<IOrderDelivery>(null);
  const [elevatePrice, setElevatePrice] = useState(0);
  const [assemblyPrice, setAssemblyPrice] = useState(0);

  const submitHandler = () => {
    formRef.current.submitForm();
  };
  const createOrder = async (customer: Receiver) => {
    try {
      let data = {
        customer,
        delivery: {
          type: delivery ? delivery.tag : IOrderDeliveryType.none,
          address: {
            ...address,
            floor: Number(address.floor),
          },
        },
      } as IOrder;
      if (delivery && delivery.date) {
        data.delivery.date = delivery.date;
      }
      if (delivery && delivery.time) {
        data.delivery.time_interval = delivery.time.code;
      }
      const res = await api.createOrder(data);
      dispatch({
        type: 'setCartSize',
        payload: 0,
      });
      router.push(`/checkout/complete?order_id=${res.data.data.number}`);
    } catch (error) {
      if (error.response.data.errors) {
        throw error;
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Оформление заказа</h2>
          <div className={styles.cartContent}>
            <div className={styles.cartContentBlock}>
              <OrderReceiver
                ref={formRef}
                initialUser={user}
                createOrder={createOrder}
              />
              <OrderAddress address={address} setAddress={setAddress} />
              <OrderDelivery
                goods={goods}
                address={address}
                delivery={delivery}
                setDelivery={setDelivery}
                elevatePrice={elevatePrice}
                setElevatePrice={setElevatePrice}
                assemblyPrice={assemblyPrice}
                setAssemblyPrice={setAssemblyPrice}
              />
              <OrderPayment />
            </div>
            <div>
              <CartSidebar
                price={price}
                delivery={delivery}
                assemblyPrice={assemblyPrice}
                elevatePrice={elevatePrice}
                onButtonClick={submitHandler}
                isOrder
              />
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
  let goods = [];
  let user = null;
  let price = 0;

  try {
    const isAuth = await checkAuth(req, true);
    const [cartRes, propfileRes] = await Promise.all([
      api.getCart(),
      isAuth ? api.getProfile() : null,
    ]);

    if (propfileRes) {
      user = propfileRes.data.data;
    }
    goods = cartRes.data.data.products;
    price = cartRes.data.data.order_price / 100;

    if (goods.length <= 0) {
      throw new Error();
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/cart',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      goods,
      price,
    },
  };
};
