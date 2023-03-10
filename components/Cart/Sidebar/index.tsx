import { FC } from 'react';
import Link from 'next/link';

import { toNumberWithSpaces } from 'shared/lib/formatters';
import type { ICartGood } from '../ListItem';

import { Button } from '@nebo-team/vobaza.ui.button/dist';

import styles from './styles.module.scss';

type Props = {
  price?: number;
  delivery?: any;
  liftPrice?: number;
  assemblyPrice?: number;
  isOrder?: boolean;
  onButtonClick?: () => void;
  goods: ICartGood[];
  isBasket?: boolean;
};

const CartSidebar: FC<Props> = ({
  price,
  delivery,
  liftPrice = 0,
  assemblyPrice = 0,
  isOrder = false,
  onButtonClick,
  goods,
}) => {
  const goodsWithoutNullPrice = goods?.filter((item) => !!item.price);

  return (
    <div className={styles.cartSidebar}>
      <h3 className={styles.cartSidebarTitle}>Ваш заказ:</h3>
      <div className={styles.cartSidebarOrder}>
        <div className={styles.cartSidebarOrderItem}>
          <span className={styles.cartSidebarOrderTitle}>Товары: </span>
          <span className={styles.cartSidebarOrderDecorator} />
          <span className={styles.cartSidebarOrderPrice}>{toNumberWithSpaces(price)} ₽</span>
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
              <span className={styles.cartSidebarOrderTitle}>Подъем на этаж: </span>
              <span className={styles.cartSidebarOrderDecorator} />
              <span className={styles.cartSidebarOrderPrice}>{toNumberWithSpaces(liftPrice)} ₽</span>
            </div>
            <div className={styles.cartSidebarOrderItem}>
              <span className={styles.cartSidebarOrderTitle}>Сборка: </span>
              <span className={styles.cartSidebarOrderDecorator} />
              <span className={styles.cartSidebarOrderPrice}>{toNumberWithSpaces(assemblyPrice)} ₽</span>
            </div>
          </>
        )}
      </div>
      <div className={styles.cartSidebarTotal}>
        <span className={styles.cartSidebarTotalTitle}>{isOrder ? 'Итого:' : 'Сумма заказа:'}</span>
        {toNumberWithSpaces(price + liftPrice + assemblyPrice + (delivery ? delivery.price : 0))} ₽
      </div>
      {isOrder && (
        <div className={styles.cartSidebarButton}>
          <Button
            onClick={onButtonClick}
            text="Оформить заказ"
            size="big"
            isFullScreen
            disabled={!goodsWithoutNullPrice.length}
          />
        </div>
      )}
      {!isOrder && (
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
          Нажимая {isOrder ? '«Оформить заказ»' : '«Перейти к оформлению»'} вы соглашаетесь с договором оферты и
          подтверждаете своё согласие на обработку персональных данных{' '}
        </p>
      </div>
    </div>
  );
};
export default CartSidebar;
