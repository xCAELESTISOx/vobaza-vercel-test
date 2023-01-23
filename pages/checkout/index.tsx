import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

import { useToggle } from 'shared/lib/hooks/useToggle';
import checkAuth from '../../app/api/auth';
import { normalizeOrder } from 'shared/lib/normalizers/normalizeOrder';
import type { ILocalOrder } from '../../src/models/IOrder';
import type { ICartGood } from '../../components/Cart/ListItem';
import type { IProfile } from '../../components/Profile/Data';
import type { IAddressFull } from 'src/models/IAddress';
import type { IReceiver } from '../../components/Cart/Order/Receiver';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { setCartSize } from 'src/store/goods';

import CartSidebar from '../../components/Cart/Sidebar';
import OrderReceiver from '../../components/Cart/Order/Receiver';
import OrderAddress from '../../components/Cart/Order/Address';
import OrderObtaining from '../../components/Cart/Order/Obtaining';
import OrderPayment from '../../components/Cart/Order/Payment';
import CartItemChangeModal from 'components/Cart/Modal/CartItemChangeModal';

import { api } from '../../app/api';
import styles from 'app/styles/Cart.module.scss';

type Props = {
  price: number;
  weight: number;
  user?: IProfile;
  goods: ICartGood[];
  addresses: IAddressFull[];
};

export default function Checkout({ price, weight, user, addresses, goods }: Props) {
  const [isErrorModalOpen, toggleErrorModal] = useToggle(false);
  const [addressError, setAddressError] = useState(false);

  const dispatch = useDispatch();

  const formRef = useRef(null);
  const router = useRouter();

  const initialValues: ILocalOrder = {
    delivery: null,
    address: addresses.find((item: IAddressFull) => item.is_default) ||
      addresses[0] || {
        address: '',
        floor: 1,
        elevator: 'NONE',
        is_default: false,
      },
  };

  const [liftPrice, setLiftPrice] = useState(null);
  const [assemblyPrice, setAssemblyPrice] = useState(null);

  const { values, setFieldValue, setValues } = useFormik({
    initialValues: initialValues,
    validateOnBlur: false,
    onSubmit: () => {},
  });
  const submitHandler = () => {
    formRef.current.submitForm();
  };

  const ecommerceGoods = goods.map((item) => {
    const category = item.product.parent_categories
      .map(({ name }) => {
        return name;
      })
      .join('/');

    return {
      id: item.product.id?.toString(),
      name: item.product.name,
      price: item.product.price / 100,
      quantity: item.quantity,
      // код ниже закомментирован до правок бэка
      // brand: product.product.brand,
      category,
    };
  });

  const ecommerceAfterPurchase = (purchaseId?: string | number) => {
    if (!purchaseId) return;
    (window as any).dataLayer = (window as any)?.dataLayer || [];

    (window as any)?.dataLayer?.push({
      ecommerce: {
        currencyCode: 'RUB',
        purchase: {
          actionField: { id: purchaseId.toString() },
          products: ecommerceGoods,
        },
      },
    });
  };

  const createOrder = async (customer: IReceiver) => {
    const token = Cookies.get('token');
    const userId = values.address?.id;

    try {
      const data = normalizeOrder(values, token, customer, userId);

      let res = null;

      if (token) {
        res = await api.createAuthOrder(data);
        ecommerceAfterPurchase(res?.data?.data?.number);
      } else {
        res = await api.createOrder(data);
        ecommerceAfterPurchase(res?.data?.data?.number);
      }
      dispatch(setCartSize(0));

      router.push(`/checkout/complete?order_id=${res.data.data.number}`);
    } catch (error) {
      if (error.response.data.errors) {
        if (error.response.data.errors[0].code === 'empty_basket') {
          toggleErrorModal();
        }
        if (error.response.data.errors[0].source === 'obtaining.delivery.address_id') {
          setAddressError(true);
        }
        throw error;
      }
    }
  };

  useEffect(() => {
    setAddressError(false);
  }, [values.address]);

  useEffect(() => {
    setValues(initialValues);
  }, [addresses]);

  return (
    <div>
      <div className="container">
        {isErrorModalOpen && (
          <CartItemChangeModal
            title="Данный товар закончился"
            description="Товар более не доступен, выберите другой"
            onClose={toggleErrorModal}
          />
        )}
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Оформление заказа</h2>
          <div className={styles.cartContent}>
            <div className={styles.cartContentBlock}>
              <OrderReceiver ref={formRef} initialUser={user} createOrder={createOrder} />
              <OrderAddress
                addressError={addressError}
                // По наличию номера определяем авторизован ли юзер
                authorized={Boolean(user?.phone)}
                address={values.address}
                addresses={addresses}
                setFieldValue={setFieldValue}
              />
              <OrderObtaining
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

    if (propfileRes) user = propfileRes.data.data;
    if (addressesRes) addresses = addressesRes.data.data;

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
