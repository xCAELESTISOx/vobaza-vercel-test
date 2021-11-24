import styles from '../../styles/Cart.module.scss';

export default function Cart() {
  return (
    <div>
      <div className="container">
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Оформление заказа</h2>
          <div className={styles.cartContent}></div>
        </div>
      </div>
    </div>
  );
}
