import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { labelColorsDictionary, orderStatusDictionary } from 'assets/dictionaries/order';
import { formatOrderDate } from 'assets/utils/formatters';
import { getImageVariantProps } from 'assets/utils/images';
import { EOrderDeliveryType } from '../../../../src/models/IOrder';
import type { IOrder } from '../../../../src/models/IOrder';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import ProfileOrderDateTime from './ProfileOrderDateTime';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

type IProps = {
  order: IOrder;
  isLast?: boolean;
};

const ProfileOrderItem: FC<IProps> = ({ order, isLast }) => {
  const deliveryTitle = order.obtaining.obtaining_type === 'SELF_DELIVERY' ? 'Самовывоз' : 'Доставка ВоБаза';
  return (
    <div className={styles.orderItem}>
      <div className={styles.orderItemHeader}>
        <div>
          {isLast ? (
            <div className={styles.orderItemIdLast}>Последний заказ №{order.number}</div>
          ) : (
            <Link href={`/profile/orders/${order.id}`}>
              <a className={styles.orderItemId}>Заказ №{order.number} </a>
            </Link>
          )}
          <div className={styles.orderItemDate}>от {formatOrderDate(order.order_date, true)}</div>
        </div>
        <div>
          {!isLast ? <div className={styles.orderItemStatus}>не оплачен</div> : <div>&nbsp;</div>}
          <div className={styles.orderItemPrice}>{Intl.NumberFormat('ru-RU').format(order.price)} ₽</div>
        </div>
      </div>
      <div className={styles.orderItemDelivery}>
        <div className={styles.orderItemDeliveryBlock}>
          {!isLast && (
            <div className={styles.orderItemDeliveryHeader}>
              <div className={styles.orderItemDeliveryTitle}>{deliveryTitle}</div>
              <div className={styles.orderItemDeliveryStatus}>
                {orderStatusDictionary[order.status]}
                <div
                  className={`${styles.orderItemDeliveryDot} ${styles.orange}`}
                  style={{ background: labelColorsDictionary[order.status] }}
                ></div>
              </div>
            </div>
          )}
          <div className={styles.orderItemDeliveryItems}>
            {order.products_images.map((item) => (
              <div key={item.product_id} className={styles.orderItemDeliveryItem}>
                <div className={styles.orderItemDeliveryItemImage}>
                  {item.image ? (
                    <Image {...getImageVariantProps(item.image.variants, 'small')} objectFit="contain" alt="" />
                  ) : (
                    <Image src={PlaceholderImage} objectFit="contain" alt="" unoptimized />
                  )}
                </div>
              </div>
            ))}
          </div>
          {order.obtaining?.delivery?.type !== EOrderDeliveryType.none && !isLast && (
            <ProfileOrderDateTime
              date={order.obtaining?.delivery?.date || order.obtaining?.self_delivery?.date}
              timeInterval={order.obtaining?.delivery?.time_interval || order.obtaining?.self_delivery?.time_interval}
              isSelfDelivery={order.obtaining?.obtaining_type === 'SELF_DELIVERY'}
            />
          )}

          {isLast && (
            <Link href={`/profile/orders/${order.id}`}>
              <a className={styles.orderItemLink}>
                Посмотреть заказ <Icon name="ArrowRight" />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileOrderItem;
