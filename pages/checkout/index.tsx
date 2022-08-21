import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

import { useAuth } from 'src/context/auth';
import checkAuth from '../../assets/api/auth';
import { useGoods } from '../../src/context/goods';
import { normalizeOrder } from 'assets/utils/normalizers/normalizeOrder';
import { EOrderDeliveryType, ILocalOrder } from '../../src/models/IOrder';
import type { ICartGood } from '../../components/Cart/ListItem';
import type { IProfile } from '../../components/Profile/Data';
import type { IAddressFull } from 'src/models/IAddress';
import type { IReceiver } from '../../components/Cart/Order/Receiver';

import CartSidebar from '../../components/Cart/Sidebar';
import OrderReceiver from '../../components/Cart/Order/Receiver';
import OrderAddress from '../../components/Cart/Order/Address';
import OrderDelivery from '../../components/Cart/Order/Delivery';
import OrderPayment from '../../components/Cart/Order/Payment';

import styles from '../../styles/Cart.module.scss';
import { api } from '../../assets/api';

type Props = {
  price: number;
  weight: number;
  user: IProfile;
  goods: ICartGood[];
  addresses: IAddressFull[];
};

export default function Checkout({ price, weight, user, addresses, goods }) {
  const { state } = useAuth();
  const formRef = useRef(null);
  const router = useRouter();
  const { dispatch } = useGoods();

  const initialValues: ILocalOrder = {
    delivery: {
      name: '',
      price: 0,
      tag: EOrderDeliveryType.none,
      min_date: '',
    },
    address: addresses.find((item: IAddressFull) => item.is_default) || {
      address: '',
      floor: 1,
      elevator: 'NONE',
    },
  };

  const [liftPrice, setLiftPrice] = useState(null);
  const [assemblyPrice, setAssemblyPrice] = useState(null);

  const { values, setFieldValue } = useFormik({
    initialValues: initialValues,
    validateOnBlur: false,
    onSubmit: () => {},
  });

  const submitHandler = () => {
    formRef.current.submitForm();
  };

  const createOrder = async (customer: IReceiver) => {
    const token = Cookies.get('token');
    const userId = values.address?.id;

    try {
      const data = normalizeOrder(values, token, customer, userId);

      let res = null;
      if (token) {
        res = await api.createAuthOrder(data);
      } else {
        res = await api.createOrder(data);
      }
      dispatch({ type: 'setCartSize', payload: 0 });

      router.push(`/checkout/complete?order_id=${res.data.data.number}`);
    } catch (error) {
      console.error(error);

      if (error.response.data.errors) {
        throw error;
      }
    }
  };

  useEffect(() => {
    const cookieCity = Cookies.get('city');

    if ((router.query.city || state.city || cookieCity) && !values.address.address) {
      setFieldValue('address.address', router.query.city?.toString() || state.city || cookieCity);
    }
  }, [state.city]);

  return (
    <div>
      <div className="container">
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Оформление заказа</h2>
          <div className={styles.cartContent}>
            <div className={styles.cartContentBlock}>
              <OrderReceiver ref={formRef} initialUser={user} createOrder={createOrder} />
              <OrderAddress address={values.address} addresses={addresses} setFieldValue={setFieldValue} />
              <OrderDelivery
                orderWeight={weight}
                data={values}
                setFieldValue={setFieldValue}
                goods={goods}
                setLiftPrice={setLiftPrice}
                setAssemblyPrice={setAssemblyPrice}
                liftPrice={liftPrice}
                assemblyPrice={assemblyPrice}
              />
              <OrderPayment />
            </div>
            <div>
              <CartSidebar
                price={price}
                delivery={values.delivery}
                assemblyPrice={assemblyPrice}
                liftPrice={liftPrice}
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  let goods = [];
  let user = null;
  let addresses = [];
  let price = 0;
  let weight = 0;

  try {
    const isAuth = await checkAuth(req, true);
    const [cartRes, addressesRes, propfileRes] = await Promise.all([
      api.getCart(),
      isAuth ? api.getAddresses() : null,
      isAuth ? api.getProfile() : null,
    ]);
    const cart = cartRes.data.data;

    if (propfileRes) {
      user = propfileRes.data.data;
    }
    if (addressesRes) {
      addresses = addressesRes.data.data;
    }
    goods = cart.products;
    price = cart.order_price / 100;
    weight = cart.order_weight / 1000;

    if (goods.length <= 0) {
      throw new Error();
    }
  } catch (error) {
    console.debug(error.response?.data);
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
      addresses,
      goods,
      price,
      weight,
    },
  };
};
