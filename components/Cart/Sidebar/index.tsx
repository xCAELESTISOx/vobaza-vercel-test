import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { toNumberWithSpaces } from '../../../assets/utils/formatters';

type Props = {
  price?: number;
  delivery?: any;
  elevatePrice?: number;
  assemblyPrice?: number;
  isOrder?: boolean;
  onButtonClick?: () => void;
};

const CartSidebar: FC<Props> = ({
  price,
  delivery,
  elevatePrice = 0,
  assemblyPrice = 0,
  isOrder = false,
  onButtonClick,
}) => {
  return (
    <div className={styles.cartSidebar}>
      <h3 className={styles.cartSidebarTitle}>Ваш заказ:</h3>
      <div className={styles.cartSidebarOrder}>
        <div className={styles.cartSidebarOrderItem}>
          <span className={styles.cartSidebarOrderTitle}>Товары: </span>
          <span className={styles.cartSidebarOrderDecorator} />
          <span className={styles.cartSidebarOrderPrice}>
            {toNumberWithSpaces(price)} ₽
          </span>
        </div>
        {isOrder && (
          <>
            <div className={styles.cartSidebarOrderItem}>
              <span className={styles.cartSidebarOrderTitle}>Доставка: </span>
              <span className={styles.cartSidebarOrderDecorator} />
              <span className={styles.cartSidebarOrderPrice}>
                {delivery ? toNumberWithSpaces(delivery.price) : 0} ₽
              </span>
            </div>
            <div className={styles.cartSidebarOrderItem}>
              <span className={styles.cartSidebarOrderTitle}>
                Подъем на этаж:{' '}
              </span>
              <span className={styles.cartSidebarOrderDecorator} />
              <span className={styles.cartSidebarOrderPrice}>
                {toNumberWithSpaces(elevatePrice)} ₽
              </span>
            </div>
            <div className={styles.cartSidebarOrderItem}>
              <span className={styles.cartSidebarOrderTitle}>Сборка: </span>
              <span className={styles.cartSidebarOrderDecorator} />
              <span className={styles.cartSidebarOrderPrice}>
                {toNumberWithSpaces(assemblyPrice)} ₽
              </span>
            </div>
          </>
        )}
      </div>
      <div className={styles.cartSidebarTotal}>
        <span className={styles.cartSidebarTotalTitle}>
          {isOrder ? 'Итого:' : 'Сумма заказа:'}
        </span>
        {toNumberWithSpaces(
          price + elevatePrice + assemblyPrice + (delivery ? delivery.price : 0)
        )}{' '}
        ₽
      </div>
      {isOrder && (
        <div className={styles.cartSidebarButton}>
          <Button
            onClick={onButtonClick}
            text="Оформить заказ"
            size="big"
            isFullScreen
          />
        </div>
      )}
      {!isOrder && !!price && (
        <Link href="/checkout">
          <a className={styles.cartSidebarButton}>
            <Button text="Перейти к оформлению" size="big" isFullScreen />
          </a>
        </Link>
      )}
      <div className={styles.cartSidebarCondition}>
        <p>
          Нажимая на кнопку, вы соглашаетесь с{' '}
          <Link href="/docs/termos_of_use.pdf">
            <a target="_blank" rel="noreferrer">
              условиями Политики кофиденциальности
            </a>
          </Link>
          , и{' '}
          <Link href="/docs/termos_of_use.pdf">
            <a target="_blank" rel="noreferrer">
              пользовательского соглашения
            </a>
          </Link>
        </p>
        <p>
          Нажимая {isOrder ? '«Оформить заказ»' : '«Перейти к оформлению»'} вы
          соглашаетесь с договором оферты и подтверждаете своё согласие на
          обработку персональных данных{' '}
        </p>
      </div>
    </div>
  );
};
export default CartSidebar;
