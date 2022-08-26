import { EOrderDeliveryType, ILocalOrderDelivery, ITimeInterval } from 'src/models/IOrder';
import type { ILocalOrder } from 'src/models/IOrder';
import type { IReceiver } from 'components/Cart/Order/Receiver';
import type { ICartGood } from 'components/Cart/ListItem';

const convertDeliveryDate = (delivery: ILocalOrderDelivery): string => {
  if (delivery && delivery.date) {
    const { date } = delivery;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const newDate = year + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day);
    return newDate;
  }
  return undefined;
};

const convertDeliveryTime = (delivery: ILocalOrderDelivery): ITimeInterval | null => {
  if (!delivery?.time?.code) return undefined;

  const splitedTimeSlot = delivery.time.value.split('-');
  return {
    from: splitedTimeSlot[0],
    to: splitedTimeSlot[1],
  };
};

export const normalizeOrder = (
  data: ILocalOrder,
  token: string,
  customer: IReceiver,
  userAddressId?: number,
  goods?: ICartGood[]
) => {
  const { delivery, assembly, address, lift } = data;

  const isSelfDelivery = delivery?.tag === EOrderDeliveryType.self;

  const assemblyProductIds = !isSelfDelivery && assembly?.full_order ? goods.map((item) => item.product.id) : [];

  const deliveryDate = convertDeliveryDate(delivery);
  const time = convertDeliveryTime(delivery);

  const newData = {
    obtaining: {
      obtaining_type: isSelfDelivery ? 'SELF_DELIVERY' : 'DELIVERY',
      ...(!isSelfDelivery
        ? {
            delivery: {
              type: delivery ? delivery?.tag : EOrderDeliveryType.none,
              ...(lift && { lift: { full_order: true } }),
              date: deliveryDate,
              time_interval: time,
              ...(token
                ? {
                    address_id: userAddressId,
                    ...(lift && {
                      lift: {
                        ...(lift && lift?.elevator && { elevator: lift?.elevator }),
                        ...(address.floor && { floor: address.floor }),
                      },
                    }),
                  }
                : {
                    address: {
                      ...address,
                      ...(address.floor && { floor: address.floor }),
                      ...(lift && lift?.elevator && { elevator: lift?.elevator }),
                    },
                  }),
            },
          }
        : {
            self_delivery: {
              date: deliveryDate,
              time_interval: time,
              ...(token && { address_id: userAddressId }),
            },
          }),

      ...(!!assembly && !!assemblyProductIds.length && !!assembly?.full_order && { assembly: assemblyProductIds }),
    },
    ...(!token && { customer }),
    ...(customer.recipient && { recipient: customer.recipient }),
  } as any;

  return newData;
};
