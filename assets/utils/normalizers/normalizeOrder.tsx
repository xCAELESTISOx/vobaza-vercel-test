import { EOrderDeliveryType } from 'src/models/IOrder';
import type { ILocalOrderDelivery, IOrderAddress, ITimeInterval } from 'src/models/IOrder';
import type { ILocalOrder } from 'src/models/IOrder';
import type { IReceiver } from 'components/Cart/Order/Receiver';

const convertDeliveryDate = (date?: ILocalOrderDelivery['date']): string => {
  if (date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const newDate = year + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day);
    return newDate;
  }
  return undefined;
};

const convertDeliveryTime = (time?: ILocalOrderDelivery['time']): ITimeInterval | null => {
  if (!time?.code) return undefined;

  const splitedTimeSlot = time.value.split('-');
  return {
    from: splitedTimeSlot[0],
    to: splitedTimeSlot[1],
  };
};

const normalizeAddressAndLift = (address: IOrderAddress, lift: ILocalOrder['lift'], authorized: boolean) => {
  if (authorized) {
    return {
      ...(lift && {
        lift: {
          ...(lift && lift?.elevator && { elevator: lift?.elevator }),
          ...(address.floor && { floor: address.floor }),
        },
      }),
    };
  }

  return {
    address: {
      ...address,
      ...(address.floor && { floor: address.floor }),
      ...(lift && lift?.elevator && { elevator: lift?.elevator }),
    },
  };
};

export const normalizeOrder = (data: ILocalOrder, token: string, customer: IReceiver, userAddressId?: number) => {
  const { delivery, assembly, address, lift } = data;

  const isAssembly = Boolean(assembly?.product_ids?.length || assembly?.full_order);
  const isSelfDelivery = delivery?.tag === EOrderDeliveryType.self;

  const newAddressAndLift = normalizeAddressAndLift(address, lift, Boolean(token));
  const newTime = convertDeliveryTime(delivery?.time);
  const newDate = convertDeliveryDate(delivery?.date);

  const newData = {
    obtaining: {
      obtaining_type: isSelfDelivery ? 'SELF_DELIVERY' : 'DELIVERY',
      ...(!isSelfDelivery
        ? {
            delivery: {
              type: delivery ? delivery?.tag : EOrderDeliveryType.none,
              ...(lift && { lift: { full_order: true } }),
              date: newDate,
              time_interval: newTime,
              address_id: userAddressId,
              ...newAddressAndLift,
            },
          }
        : {
            self_delivery: {
              date: newDate,
              time_interval: newTime,
              address_id: userAddressId,
            },
          }),
    },
    ...(!token && { customer }),
    ...(customer.recipient && { recipient: customer.recipient }),
    ...(isAssembly && { assembly }),
  } as any;

  return newData;
};
