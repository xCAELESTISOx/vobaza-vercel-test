import styles from '../styles/Cart.module.scss';

import CartList from '../components/Cart/List';
import CartSidebar from '../components/Cart/Sidebar';

export default function Cart() {
  return (
    <div>
      <div className="container">
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Корзина</h2>
          <div className={styles.cartContent}>
            <div className={styles.cartContentBlock}>
              <CartList />
            </div>
            <div>
              <CartSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
