import { EOrderDeliveryType } from 'src/models/IOrder';
import type { ILocalOrder } from 'src/models/IOrder';
import type { IReceiver } from 'components/Cart/Order/Receiver';

export const normalizeOrder = (data: ILocalOrder, token: string, customer: IReceiver, userAddressId?: number) => {
  const { delivery, lift, address, assembly } = data;

  const newData = {
    delivery: {
      type: delivery ? delivery.tag : EOrderDeliveryType.none,
    },
    ...(!token && { customer }),
    ...(customer.recipient && { recipient: customer.recipient }),
    ...(lift && { lift: { ...lift, floor: address.floor } }),
  } as any;

  if (token) {
    newData.delivery.address_id = userAddressId;
  } else {
    newData.delivery.address = {
      ...address,
      ...(address.floor && { floor: address.floor }),
      ...(lift.elevator && { elevator: lift.elevator }),
    };
  }

  if (delivery && delivery.date) {
    const { date } = delivery;

    if (date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const newDate = year + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day);

      newData.delivery.date = newDate;
    } else {
      newData.delivery.date = undefined;
    }
  }

  if (delivery && delivery.time) {
    const splitedTimeSlot = delivery.time.value.split('-');
    const newTimeSlot = {
      from: splitedTimeSlot[0],
      to: splitedTimeSlot[1],
    };

    newData.delivery.time_interval = newTimeSlot;
  }

  if (assembly && (assembly.product_ids?.length || assembly.full_order)) {
    newData.assembly = assembly;
  }

  return newData;
};
