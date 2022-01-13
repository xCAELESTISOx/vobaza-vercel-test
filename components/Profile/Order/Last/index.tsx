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
const ProfileOrderLast: FC<Props> = ({ item }) => {
  return (
    <div className={styles.orderItem}>
      <div className={styles.orderItemHeader}>
        <div className={styles.orderItemId}>Последний заказ №{item.id} </div>
        <div className={styles.orderItemDateBlock}>
          <div>{item.date}</div>
          <div> {item.price} ₽ </div>
        </div>
      </div>
      <div className={styles.orderItemDelivery}>
        <div className={styles.orderItemDeliveryItems}>
          {item.delivery[0].items.map((image, index) => (
            <div key={index} className={styles.orderItemDeliveryItem}>
              <div className={styles.orderItemDeliveryItemImage}></div>
            </div>
          ))}
        </div>
        <Link href={`/profile/orders/${item.id}`}>
          <a className={styles.orderItemLink}>
            Посмотреть заказ <Icon name="ArrowRight" />
          </a>
        </Link>
      </div>
    </div>
  );
};
export default ProfileOrderLast;
