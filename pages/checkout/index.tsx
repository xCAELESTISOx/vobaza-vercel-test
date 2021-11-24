import { useRef } from 'react';
import styles from '../../styles/Cart.module.scss';

import CartSidebar from '../../components/Cart/Sidebar';
import OrderReceiver from '../../components/Cart/Order/Receiver';
import OrderAddress from '../../components/Cart/Order/Address';
import OrderDelivery from '../../components/Cart/Order/Delivery';
import OrderPayment from '../../components/Cart/Order/Payment';

export default function Checkout() {
  const formRef = useRef(null);

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
              <OrderAddress />
              <OrderDelivery />
              <OrderPayment />
            </div>
            <div>
              <CartSidebar onButtonClick={submitHandler} isOrder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
