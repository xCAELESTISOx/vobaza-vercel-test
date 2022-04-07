import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';
import {
  formatOrderDate,
  formatOrderTimeInterval,
} from 'assets/utils/formatters';
import { getImageVariantProps } from 'assets/utils/images';
import PlaceholderImage from 'assets/images/placeholder_small.png';
import { IOrderDeliveryType, IOrderItem } from '../../../../src/models/IOrder';

import { Icon } from '@nebo-team/vobaza.ui.icon';

type Props = {
  order: IOrderItem;
  isLast?: boolean;
};

const ProfileOrderItem: FC<Props> = ({ order, isLast }) => {
  return (
    <div className={styles.orderItem}>
      <div className={styles.orderItemHeader}>
        <div>
          {isLast ? (
            <div className={styles.orderItemIdLast}>
              Последний заказ №{order.number}
            </div>
          ) : (
            <Link href={`/profile/orders/${order.id}`}>
              <a className={styles.orderItemId}>Заказ №{order.number} </a>
            </Link>
          )}
          <div className={styles.orderItemDate}>
            от {formatOrderDate(order.order_date, true)}
          </div>
        </div>
        <div>
          {!isLast ? (
            <div className={styles.orderItemStatus}>не оплачен</div>
          ) : (
            <div>&nbsp;</div>
          )}
          <div className={styles.orderItemPrice}>
            {Intl.NumberFormat('ru-RU').format(order.price)} ₽
          </div>
        </div>
      </div>
      <div className={styles.orderItemDelivery}>
        <div className={styles.orderItemDeliveryBlock}>
          {!isLast && (
            <div className={styles.orderItemDeliveryHeader}>
              <div className={styles.orderItemDeliveryTitle}>
                Доставка ВоБаза
              </div>
              <div className={styles.orderItemDeliveryStatus}>
                открыт
                <div
                  className={`${styles.orderItemDeliveryDot} ${styles.orange}`}
                ></div>
              </div>
            </div>
          )}
          <div className={styles.orderItemDeliveryItems}>
            {order.products_images.map((item) => (
              <div
                key={item.product_id}
                className={styles.orderItemDeliveryItem}
              >
                <div className={styles.orderItemDeliveryItemImage}>
                  {item.image ? (
                    <Image
                      {...getImageVariantProps(item.image.variants, 'small')}
                      objectFit="contain"
                      alt=""
                    />
                  ) : (
                    <Image
                      src={PlaceholderImage}
                      objectFit="contain"
                      alt=""
                      unoptimized
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {order.delivery.type !== IOrderDeliveryType.none && !isLast && (
            <div className={styles.orderItemDeliveryDate}>
              <div>Дата и время доставки</div>
              <div className={styles.orderItemDeliveryDateItem}>
                {formatOrderDate(order.delivery.date, false, true)}{' '}
                {formatOrderTimeInterval(order.delivery.time_interval)}
              </div>
            </div>
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
