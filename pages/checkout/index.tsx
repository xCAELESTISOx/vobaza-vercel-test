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
import type { IAddress } from 'src/models/IAddress';
import type { IReceiver } from '../../components/Cart/Order/Receiver';

import CartSidebar from '../../components/Cart/Sidebar';
import OrderReceiver from '../../components/Cart/Order/Receiver';
import OrderAddress from '../../components/Cart/Order/Address';
import OrderDelivery from '../../components/Cart/Order/Delivery';
import OrderPayment from '../../components/Cart/Order/Payment';

import styles from '../../styles/Cart.module.scss';
import { api } from '../../assets/api';

const initialValues: ILocalOrder = {
  delivery: {
    name: '',
    price: 0,
    tag: EOrderDeliveryType.none,
    min_date: '',
  },
  address: {
    address: '',
    floor: 1,
    elevator: 'NONE',
  },
};

type Props = {
  user: IProfile;
  addresses: IAddress[];
  goods: ICartGood[];
  price: number;
};

export default function Checkout({ goods, addresses, price, user }) {
  const { state } = useAuth();
  const formRef = useRef(null);
  const router = useRouter();
  const { dispatch } = useGoods();

  const [currentUserAddress, setCurrentUserAddress] = useState<IAddress>(
    addresses.find((item: IAddress) => item.is_default)
  );

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
    const userId = currentUserAddress?.id;

    try {
      const data = normalizeOrder(values, token, customer, userId);

      let res = null;
      if (token) {
        res = await api.createAuthOrder(data);
      } else {
        res = await api.createOrder(data);
      }
      dispatch({
        type: 'setCartSize',
        payload: 0,
      });
      router.push(`/checkout/complete?order_id=${res.data.data.number}`);
    } catch (error) {
      console.log(error);

      if (error.response.data.errors) {
        throw error;
      }
    }
  };

  useEffect(() => {
    const cookieCity = Cookies.get('city');

    if (router.query.city || state.city || cookieCity) {
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
              <OrderAddress
                address={currentUserAddress || values.address}
                setCurrentUserAddress={setCurrentUserAddress}
                addresses={addresses}
                setFieldValue={setFieldValue}
              />
              <OrderDelivery
                data={values}
                setFieldValue={setFieldValue}
                goods={goods}
                currentUserAddress={currentUserAddress}
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

  try {
    const isAuth = await checkAuth(req, true);
    const [cartRes, addressesRes, propfileRes] = await Promise.all([
      api.getCart(),
      isAuth ? api.getAddresses() : null,
      isAuth ? api.getProfile() : null,
    ]);

    if (propfileRes) {
      user = propfileRes.data.data;
    }
    if (addressesRes) {
      addresses = addressesRes.data.data;
    }
    goods = cartRes.data.data.products;
    price = cartRes.data.data.order_price / 100;

    if (goods.length <= 0) {
      throw new Error();
    }
  } catch (error) {
    console.dir(error.response.data);
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
    },
  };
};
