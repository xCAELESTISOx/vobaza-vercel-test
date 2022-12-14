import React from 'react';

import type { ILocalOrder } from 'src/models/IOrder';
import type { IAssemblyPrice } from 'src/models/IDelivery';
import type { ICartGood } from 'components/Cart/ListItem';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import { normalizeTimeSlots } from 'shared/lib/normalizers/normalizeTimeSlots';

import { InputCalendar } from 'shared/ui/InputCalendar';
import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select';
import { Button } from '@nebo-team/vobaza.ui.button';
import DeliveryAssembly from '../ObtainingDeliveryParts/DeliveryAssembly';
import DeliveryItems from '../ObtainingDeliveryParts/DeliveryItems';
import DeliveryLift from '../ObtainingDeliveryParts/DeliveryLift';

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

  const deliveryDate = delivery?.date ? new Date(delivery.date) : undefined;

  const newTimeSlots = normalizeTimeSlots(timeSlots, deliveryDate);

  return (
    <>
      {delivery && (
        <>
          <div className={styles.orderDeliveryInputs}>
            <div className={styles.orderDeliveryInput}>
              <InputCalendar
                label="Дата доставки"
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
                label="Время доставки"
                currentValue={delivery.time}
                variants={newTimeSlots}
                onChange={setTime}
                keyField="value"
              />
            </div>
          </div>

          <div className={styles.orderDeliverySubblock}>
            <h2 className={styles.orderDeliverySubblockTitle}>Подъем и сборка</h2>
            <DeliveryLift address={address} liftPrice={liftPrice} lift={lift} setFieldValue={setFieldValue} />
            <DeliveryAssembly
              goods={goods}
              assemblyPrice={assemblyPrice}
              address={address}
              setAssemblyPrice={setAssemblyPrice}
              setFieldValue={setFieldValue}
            />
          </div>
        </>
      )}
      <DeliveryItems goods={goods} />
      <div className={styles.cartButtonWrapper}>
        <Button className={styles.cartButton} text="Изменить" color="#fafafa" isFullScreen />
      </div>
    </>
  );
};
