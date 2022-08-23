import React from 'react';

import { ILocalOrderDelivery } from 'src/models/IOrder';
import type { ICartGood } from 'components/Cart/ListItem';

import { InputCalendar } from 'components/UI/InputCalendar';
import { InputSelect, Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { Button } from '@nebo-team/vobaza.ui.button';

import styles from './../styles.module.scss';
import DeliveryItems from '../ObtainingDeliveryParts/DeliveryItems';

const selfDeliveryTimeSlots: Variant<string | number>[] = [
  { code: '09:00-14:00', value: '09:00-14:00' },
  { code: '12:00-17:00', value: '12:00-17:00' },
  { code: '15:00-20:00', value: '15:00-20:00' },
  { code: '18:00-23:00', value: '18:00-23:00' },
];

interface IProps {
  minDate: string | Date;
  onDateSelect: (val: Date) => void;

  setTime: (time: Variant) => void;
  delivery: ILocalOrderDelivery;
  goods: ICartGood[];
}

export const ObtainingSelfDelivery = ({ minDate, onDateSelect, setTime, delivery, goods }: IProps) => {
  return (
    <>
      {delivery && (
        <>
          <div className={styles.orderDeliveryInputs}>
            <div className={styles.orderDeliveryInput}>
              <InputCalendar
                label="Дата самовывоза"
                name="date"
                value={delivery.date ? new Date(delivery.date) : undefined}
                calendarOptions={{
                  minDate: minDate ? new Date(minDate) : undefined,
                }}
                onChange={onDateSelect}
              />
            </div>
            <div className={styles.orderDeliveryInput}>
              <InputSelect
                name="time"
                label="Время самовывоза"
                currentValue={delivery.time}
                variants={selfDeliveryTimeSlots}
                onChange={setTime}
                keyField="value"
              />
            </div>
          </div>
        </>
      )}
      <DeliveryItems goods={goods} />
      <div className={styles.cartButton}>
        <Button
          text="Изменить"
          color="#fafafa"
          isFullScreen
          style={{
            color: '#af1ebe',
            backgroundColor: ' #f2f2f2',
            border: '1px solid #f2f2f2',
            fontWeight: 500,
          }}
        />
      </div>
    </>
  );
};
