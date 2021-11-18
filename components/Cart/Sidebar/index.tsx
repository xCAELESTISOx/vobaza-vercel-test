import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Button } from '@nebo-team/vobaza.ui.button';

const CartSidebar: FC = () => {
  return (
    <div className={styles.cartSidebar}>
      <h3 className={styles.cartSidebarTitle}>Ваш заказ:</h3>
      <div className={styles.cartSidebarOrder}>
        <span className={styles.cartSidebarOrderTitle}>Товары: </span>
        <span className={styles.cartSidebarOrderDecorator} />
        <span className={styles.cartSidebarOrderPrice}>0 ₽</span>
      </div>
      <div className={styles.cartSidebarTotal}>
        <span className={styles.cartSidebarTotalTitle}>Сумма заказа:</span>0 ₽
      </div>
      <Link href="/checkout">
        <a className={styles.cartSidebarButton}>
          <Button text="Перейти к оформлению" size="big" isFullScreen />
        </a>
      </Link>
      <div className={styles.cartSidebarCondition}>
        <p>
          Нажимая на кнопку, вы соглашаетесь с{' '}
          <a target="_blank" href="/docs/termos_of_use.pdf" rel="noreferrer">
            условиями Политики кофиденциальности
          </a>
          , и{' '}
          <a href="https://vobaza.ru/images/docs/termos_of_use.pdf">
            пользовательского соглашения
          </a>
        </p>
        <p>
          Нажимая «Перейти к оформлению» вы соглашаетесь с договором оферты и
          подтверждаете своё согласие на обработку персональных данных{' '}
        </p>
      </div>
    </div>
  );
};
export default CartSidebar;
