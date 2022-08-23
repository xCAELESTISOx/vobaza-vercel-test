import React from 'react';

import type { ILocalOrder } from 'src/models/IOrder';
import type { IAssemblyPrice } from 'src/models/IDelivery';
import type { ICartGood } from 'components/Cart/ListItem';

import { InputCalendar } from 'components/UI/InputCalendar';
import { InputSelect, Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { Button } from '@nebo-team/vobaza.ui.button';
import DeliveryLiftingAssembly from '../ObtainingDeliveryParts/DeliveryLiftingAssembly';
import DeliveryItems from '../ObtainingDeliveryParts/DeliveryItems';

import styles from './../styles.module.scss';

interface IProps {
  minDate: string | Date;
  timeSlots: Variant<string | number>[];
  order: ILocalOrder;
  assemblyPrice: IAssemblyPrice;
  liftPrice: number;
  goods: ICartGood[];
  setAssemblyPrice: (assemblyPrice: IAssemblyPrice) => void;
  setFieldValue: (name: string, value: any) => void;
  onDateSelect: (val: Date) => void;
  setTime: (time: Variant) => void;
}

export const ObtainingDelivery = ({
  minDate,
  timeSlots,
  order,
  assemblyPrice,
  liftPrice,
  goods,
  setAssemblyPrice,
  onDateSelect,
  setFieldValue,
  setTime,
}: IProps) => {
  const { delivery, lift, address } = order;

  return (
    <>
      {delivery && (
        <>
          <div className={styles.orderDeliveryInputs}>
            <div className={styles.orderDeliveryInput}>
              <InputCalendar
                label="Дата доставки"
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
                label="Время доставки"
                currentValue={delivery.time}
                variants={timeSlots}
                onChange={setTime}
                keyField="value"
              />
            </div>
          </div>

          <DeliveryLiftingAssembly
            address={address}
            setFieldValue={setFieldValue}
            assemblyPrice={assemblyPrice}
            liftPrice={liftPrice}
            goods={goods}
            lift={lift}
            setAssemblyPrice={setAssemblyPrice}
          />
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
