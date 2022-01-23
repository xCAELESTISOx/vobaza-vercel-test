import { useRef, useState } from 'react';
import styles from '../../styles/Cart.module.scss';

import CartSidebar from '../../components/Cart/Sidebar';
import OrderReceiver from '../../components/Cart/Order/Receiver';
import OrderAddress from '../../components/Cart/Order/Address';
import OrderDelivery from '../../components/Cart/Order/Delivery';
import OrderPayment from '../../components/Cart/Order/Payment';

export default function Checkout() {
  const formRef = useRef(null);
  const [address, setAddress] = useState('Ростов-на-Дону');
  const [delivery, setDelivery] = useState();
  const [elevatePrice, setElevatePrice] = useState(0);
  const [assemblyPrice, setAssemblyPrice] = useState(0);

  const submitHandler = () => {
    formRef.current.submitForm();
  };

  return (
    <div>
      <div className="container">
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Оформление заказа</h2>
          <div className={styles.cartContent}>
            <div className={styles.cartContentBlock}>
              <OrderReceiver ref={formRef} />
              <OrderAddress address={address} setAddress={setAddress} />
              <OrderDelivery
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
