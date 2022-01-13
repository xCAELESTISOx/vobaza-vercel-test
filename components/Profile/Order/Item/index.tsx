import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

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
const ProfileOrderItem: FC<Props> = ({ item }) => {
  return (
    <div className={styles.orderItem}>
      <div className={styles.orderItemHeader}>
        <div>
          <Link href={`/profile/orders/${item.id}`}>
            <a className={styles.orderItemId}>Заказ №{item.id} </a>
          </Link>
          <div className={styles.orderItemDate}>{item.date}</div>
        </div>
        <div>
          <div className={styles.orderItemStatus}>{item.status}</div>
          <div className={styles.orderItemPrice}> {item.price} ₽ </div>
        </div>
      </div>
      <div className={styles.orderItemDelivery}>
        {item.delivery.map((delivery, index) => (
          <div key={index} className={styles.orderItemDeliveryBlock}>
            <div className={styles.orderItemDeliveryHeader}>
              <div className={styles.orderItemDeliveryTitle}>
                {delivery.title}
              </div>
              <div className={styles.orderItemDeliveryStatus}>
                {delivery.status}
                <div
                  className={`${styles.orderItemDeliveryDot} ${
                    delivery.status === 'открыт' ? styles.orange : ''
                  }`}
                ></div>
              </div>
            </div>
            <div className={styles.orderItemDeliveryItems}>
              {delivery.items.map((image, index) => (
                <div key={index} className={styles.orderItemDeliveryItem}>
                  <div className={styles.orderItemDeliveryItemImage}></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProfileOrderItem;
