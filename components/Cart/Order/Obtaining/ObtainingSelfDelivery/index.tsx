import React from 'react';

import type { ILocalOrderDelivery } from 'src/models/IOrder';
import type { ICartGood } from 'components/Cart/ListItem';
import { normalizeTimeSlots } from 'shared/lib/normalizers/normalizeTimeSlots';

import { InputCalendar } from 'shared/ui/InputCalendar';
import DeliveryItems from '../ObtainingDeliveryParts/DeliveryItems';
import { InputSelect, Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { Button } from '@nebo-team/vobaza.ui.button';

import styles from './../styles.module.scss';

const selfDeliveryTimeSlots: Variant<string>[] = [
  { code: null, value: 'Нет' },
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
  onClickChange: () => void;
}

export const ObtainingSelfDelivery = ({ minDate, onDateSelect, setTime, delivery, goods, onClickChange }: IProps) => {
  const deliveryDate = delivery.date ? new Date(delivery.date) : undefined;
  const normalizedTimeSlots = normalizeTimeSlots(selfDeliveryTimeSlots, deliveryDate);

  return (
    <>
      {delivery && (
        <>
          <div className={styles.orderDeliveryInputs}>
            <div className={styles.orderDeliveryInput}>
              <InputCalendar
                label="Дата самовывоза"
                name="date"
                value={deliveryDate}
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
                variants={normalizedTimeSlots}
                onChange={setTime}
                keyField="value"
              />
            </div>
          </div>
        </>
      )}
      <DeliveryItems goods={goods} />
      <div className={styles.cartButtonWrapper}>
        <Button className={styles.cartButton} text="Изменить" color="#fafafa" isFullScreen onClick={onClickChange} />
      </div>
    </>
  );
};
