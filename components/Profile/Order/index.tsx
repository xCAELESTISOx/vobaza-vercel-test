import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  labelColorsDictionary,
  orderDeliveryTypeDictionary,
  orderPaymentMethodDictionary,
  orderPaymentStatusDictionary,
  orderStatusDictionary,
} from 'assets/dictionaries/order';
import { num2str } from '../../../assets/utils';
import { formatOrderDate } from 'assets/utils/formatters';
import { getImageVariantProps } from 'assets/utils/images';
import { EOrderDeliveryType } from '../../../src/models/IOrder';
import type { IOrderItemFull } from '../../../src/models/IOrder';

import ProfileOrderDateTime from './Item/ProfileOrderDateTime';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

type Props = {
  order: IOrderItemFull;
};

const ProfileOrder: FC<Props> = ({ order }) => {
  const productQuantity = order.products.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const deliveryTitle = order.obtaining?.obtaining_type === 'SELF_DELIVERY' ? 'Самовывоз' : 'Доставка ВоБаза';
  const obtainingTimeInterval =
    order.obtaining?.delivery?.time_interval || order.obtaining?.self_delivery?.time_interval;
  const obtainingDate = order.obtaining?.delivery?.date || order.obtaining?.self_delivery?.date;

  return (
    <>
      <div className={styles.orderTop}>
        <Link href="/profile/orders">
          <a className={styles.orderBack}>
            <Icon name="ArrowLeft" /> Назад
          </a>
        </Link>
      </div>
      <div className={styles.order}>
        <div className={styles.orderHeader}>
          <div>
            <h1 className={styles.orderTitle}>Заказ {order.number}</h1>
            <div className={styles.orderInfo}>
              <div>от {formatOrderDate(order.order_date, true)}</div>
              <div>{Intl.NumberFormat('ru-RU').format(order.price)} ₽</div>
            </div>
          </div>
          <div className={styles.orderStatus}>{orderPaymentStatusDictionary[order.payment.status]}</div>
        </div>
        <div className={styles.orderUser}>
          <div className={styles.orderUserTitle}>Получатель</div>
          <div className={styles.orderUserInfo}>
            <div>{order.recipient.name || order.customer.name + ' ' + order.customer.surname}</div>
            {order.customer.email && <div>{order.customer.email}</div>}
            <div>{order.recipient.phone || order.customer.phone}</div>
          </div>
        </div>
        <div className={styles.orderBlock}>
          <div className={styles.orderBlockHeader}>
            <div className={styles.orderBlockHeaderTitle}>{deliveryTitle}</div>
            <div className={styles.orderBlockHeaderStatus}>
              {orderStatusDictionary[order.status]}{' '}
              <span
                className={`${styles.orderBlockHeaderStatusDot} ${styles.orange}`}
                style={{ background: labelColorsDictionary[order.status] }}
              ></span>
            </div>
          </div>
          <div className={styles.orderDetail}>
            <Icon name="Scales" />
            <span>
              {productQuantity} {num2str(productQuantity, ['товар', 'товара', 'товаров'])}
            </span>
            {order.order_weight && <span> ・ {order.order_weight / 1000} кг</span>}
          </div>
          <div className={styles.orderItems}>
            {order.products.map((product) => (
              <div key={product.sku} className={styles.orderItem}>
                <div className={styles.orderItemImage}>
                  {product.image ? (
                    <Image {...getImageVariantProps(product.image.variants, 'small')} objectFit="contain" alt="" />
                  ) : (
                    <Image src={PlaceholderImage} objectFit="contain" alt="" unoptimized />
                  )}
                </div>
                <div className={styles.orderItemInfoBlock}>
                  <div className={styles.orderItemInfo}>{product.name}</div>
                  <div className={styles.orderItemPrices}>
                    {product.item_list_price && (
                      <div className={styles.orderItemPriceOld}>
                        {Intl.NumberFormat('ru-RU').format(product.item_list_price / 100)} ₽
                      </div>
                    )}
                    <div className={styles.orderItemPrice}>
                      {Intl.NumberFormat('ru-RU').format(product.price / 100)} ₽
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className={styles.orderDelivery}>
              {order.obtaining?.obtaining_type === 'DELIVERY' && (
                <div>
                  <div className={styles.orderDeliveryTitle}>Способ получения </div>
                  <div className={styles.orderDeliveryItem}>
                    <Icon name="Car" />
                    {orderDeliveryTypeDictionary[order.obtaining.delivery?.type]}
                  </div>
                  <div className={styles.orderDeliveryItem}>
                    <Icon name="Geoposition" />
                    {order.obtaining.delivery?.address?.address}
                  </div>
                </div>
              )}
              {order.obtaining?.delivery?.type !== EOrderDeliveryType.none &&
                (obtainingDate || obtainingTimeInterval) && (
                  <ProfileOrderDateTime
                    date={obtainingDate}
                    timeInterval={obtainingTimeInterval}
                    isSelfDelivery={order.obtaining?.obtaining_type === 'SELF_DELIVERY'}
                  />
                )}
            </div>
          </div>
        </div>
        <div className={styles.orderBlock}>
          <div className={styles.orderBlockFooterTitle}>{orderPaymentMethodDictionary[order.payment.method]}</div>
          <div className={styles.orderBlockFooterValue}>
            <div className={styles.orderBlockFooterValueTitle}>Товары</div>
            <div>{Intl.NumberFormat('ru-RU').format(order.price)} ₽</div>
          </div>
          <div className={styles.orderBlockFooterTotal}>
            <div className={styles.orderBlockFooterValueTitle}>Итого</div>
            <div className={styles.orderBlockFooterTotalPrice}> {Intl.NumberFormat('ru-RU').format(order.price)} ₽</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileOrder;
