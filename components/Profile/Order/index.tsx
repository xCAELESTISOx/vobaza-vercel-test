import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

type Props = {
  item: {
    id: string;
    date: string;
    price: string;
    status: string;
    delivery: {
      title: string;
      status: string;
      items: any[];
    }[];
  };
};
const ProfileOrder: FC<Props> = ({ item }) => {
  return (
    <>
      <div className={styles.orderTop}>
        <Link href="/profile/orders">
          <a className={styles.orderBack}>
            <Icon name="ArrowLeft" /> Назад
          </a>
        </Link>
        <div className={styles.orderStatus}>не оплачен</div>
      </div>
      <div className={styles.order}>
        <div className={styles.orderHeader}>
          <div>
            <h1 className={styles.orderTitle}>Заказ №000005518</h1>
            <div className={styles.orderInfo}>
              <div>от 13 января 2022</div>
              <div>99 680 ₽</div>
            </div>
          </div>
          <div className={styles.orderStatus}>не оплачен</div>
        </div>
        <div className={styles.orderUser}>
          <div className={styles.orderUserTitle}>Получатель</div>
          <div className={styles.orderUserInfo}>
            <div>Анастасия ф</div>
            <div>fadeeva1@immelman.ru</div>
            <div>+7(999)999-99-99</div>
          </div>
        </div>
        <div className={styles.orderBlock}>
          <div className={styles.orderBlockHeader}>
            <div className={styles.orderBlockHeaderTitle}>Доставка ВоБаза</div>
            <div className={styles.orderBlockHeaderStatus}>
              открыт{' '}
              <span
                className={`${styles.orderBlockHeaderStatusDot} ${styles.orange}`}
              ></span>
            </div>
          </div>
          <div className={styles.orderDetail}>
            <Icon name="Scales" />
            <span>2 товара</span>
            <span> ・ 166 кг</span>
          </div>
          <div className={styles.orderItems}>
            <div className={styles.orderItem}>
              <div className={styles.orderItemImage}></div>
              <div className={styles.orderItemInfoBlock}>
                <div className={styles.orderItemInfo}>
                  Диван Ричмонд 160х200 Шоколадный
                </div>
                <div className={styles.orderItemPrices}>
                  <div className={styles.orderItemPriceOld}>59 990 ₽</div>
                  <div className={styles.orderItemPrice}>51 990 ₽</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.orderDelivery}>
            <div className={styles.orderDeliveryTitle}>Способ получения </div>
            <div className={styles.orderDeliveryItem}>
              <Icon name="Car" />
              Оформить заказ с менеджером
            </div>
            <div className={styles.orderDeliveryItem}>
              <Icon name="Geoposition" />
              Санкт-Петербург
            </div>
          </div>
        </div>
        <div className={styles.orderBlock}>
          <div className={styles.orderBlockFooterTitle}>Оплата наличными </div>
          <div className={styles.orderBlockFooterValue}>
            <div className={styles.orderBlockFooterValueTitle}>Товары</div>
            <div>99 680 ₽</div>
          </div>
          <div className={styles.orderBlockFooterTotal}>
            <div className={styles.orderBlockFooterValueTitle}>Итого</div>
            <div className={styles.orderBlockFooterTotalPrice}> 99 680 ₽</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileOrder;
