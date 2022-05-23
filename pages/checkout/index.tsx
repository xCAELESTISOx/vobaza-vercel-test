import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';

import styles from '../../styles/Cart.module.scss';
import checkAuth from '../../assets/api/auth';
import { api } from '../../assets/api';
import { useAuth } from 'src/context/auth';
import { useGoods } from '../../src/context/goods';
import { ICartGood } from '../../components/Cart/ListItem';
import { IProfile } from '../../components/Profile/Data';
import { IAddress } from 'src/models/IAddress';
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
  const [address, setAddress] = useState<IOrderAddress>({
    address: '',
    flat: '',
    entrance: '',
    floor: '',
    intercom: '',
  });
  const [delivery, setDelivery] = useState<IOrderDelivery>(null);
  const [elevatePrice, setElevatePrice] = useState(null);
  const [assemblyPrice, setAssemblyPrice] = useState(null);

  const submitHandler = () => {
    formRef.current.submitForm();
  };
  const createOrder = async (customer: Receiver) => {
    const token = Cookies.get('token');
    try {
      const data = {
        customer: token ? null : customer,
        delivery: {
          type: delivery ? delivery.tag : IOrderDeliveryType.none,
        },
        // TODO: Привести к типу IOrder
      } as any;
      if (token) {
        data.delivery.address_id = currentUserAddress.id;
      } else {
        data.delivery.address = {
          ...address,
          floor: Number(address.floor),
        };
      }
      if (delivery && delivery.date) {
        data.delivery.date = delivery.date;
      }
      if (delivery && delivery.time) {
        data.delivery.time_interval = delivery.time.code;
      }
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
      if (error.response.data.errors) {
        throw error;
      }
    }
  };

  useEffect(() => {
    const cookieCity = Cookies.get('city');

    if (router.query.city || state.city || cookieCity) {
      setAddress({
        ...address,
        address: router.query.city?.toString() || state.city || cookieCity,
      });
    }
  }, [state.city]);

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
              <OrderAddress
                address={currentUserAddress || address}
                setCurrentUserAddress={setCurrentUserAddress}
                addresses={addresses}
                setAddress={setAddress}
              />
              <OrderDelivery
                goods={goods}
                address={address}
                currentUserAddress={currentUserAddress}
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
