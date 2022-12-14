import React from 'react';

import type { ITimeInterval } from 'src/models/IOrder';
import { formatOrderDate, formatOrderTimeInterval } from 'shared/lib/formatters';

import styles from './styles.module.scss';

interface IProps {
  date: string | Date;
  timeInterval: ITimeInterval;
  isSelfDelivery?: boolean;
}

const ProfileOrderDateTime = ({ date, timeInterval, isSelfDelivery }: IProps) => {
  return (
    <div className={styles.orderItemDeliveryDate}>
      <div>Дата и время {isSelfDelivery ? 'самовывоза' : 'доставки'}</div>
      <div className={styles.orderItemDeliveryDateItem}>
        {formatOrderDate(date as string, false, true)} {formatOrderTimeInterval(timeInterval)}
      </div>
    </div>
  );
};

export default ProfileOrderDateTime;
