import React, { FC, useEffect, useState } from 'react';

import { formatDate } from 'shared/lib/normalizers/normalizeTimeSlots';
import { useToggle } from 'shared/lib/hooks/useToggle';
import useDebounce from 'shared/lib/hooks/useDebounce';
import { num2str } from 'shared/lib';
import type { IDeliveryVariants, ILocalOrder, ILocalOrderDelivery, ITimeInterval } from 'src/models/IOrder';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select/dist';
import type { IAssemblyPrice } from 'src/models/IDelivery';
import type { ICartGood } from '../../ListItem';
import { EOrderDeliveryType } from 'src/models/IOrder';

import { ObtainingSelfDelivery } from './ObtainingSelfDelivery';
import { ObtainingDelivery } from './ObtainingDelivery';
import { OrderDeliveryDrawer } from './Drawer';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';
import { api } from 'app/api';

const getMinDate = (): Date => {
  const today = new Date();
  return new Date(today.getTime() + 24 * 3600000);
};

type Props = {
  liftPrice: number;
  orderWeight?: number;
  assemblyPrice: IAssemblyPrice;
  data: ILocalOrder;
  goods: ICartGood[];
  setLiftPrice: (value: number) => void;
  setAssemblyPrice: (assemblyPrice: IAssemblyPrice) => void;
  setFieldValue: (name: string, value: any) => void;
};

const convertTimeslots = (timeSlots: ITimeInterval[]): Variant[] =>
  timeSlots?.map(({ from, to }) => ({ code: `${from}-${to}`, value: `${from}-${to}` })) || [];

const findMinDate = (delivery: ILocalOrderDelivery, deliveryVariants: IDeliveryVariants): Date =>
  deliveryVariants?.types.find(({ name }) => name === delivery.name).min_date;

const OrderObtaining: FC<Props> = ({
  liftPrice,
  orderWeight,
  assemblyPrice,
  data,
  goods,
  setLiftPrice,
  setFieldValue,
  setAssemblyPrice,
}) => {
  const [deliveryVariants, setDeliveryVariants] = useState<IDeliveryVariants | null>(null);
  const [isDrawerOpen, toggleDrawer] = useToggle(false);

  const { delivery, lift, address } = data;

  const setTime = (time: Variant) => setFieldValue('delivery.time', time);
  const toggleChangeDeliveryDrawer = () => toggleDrawer(!isDrawerOpen);

  const getLiftPrice = async () => {
    if (!delivery || !lift) return null;

    try {
      const res = await api.getLiftPrice(lift.elevator, +address.floor);

      return res.data?.data?.price / 100 || 0;
    } catch (error) {
      console.error(error);
    }

    return 0;
  };

  const checkLiftPrice = async () => {
    if (!lift || !address?.floor) {
      setLiftPrice(0);
    } else {
      const price = await getLiftPrice();
      setLiftPrice(price);
    }
  };
  const debouncedCheckLiftPrice = useDebounce(checkLiftPrice, 800);

  const onDateSelect = (newDate: Date) => {
    if (Boolean(newDate) && formatDate(newDate) === formatDate(delivery!.date)) return;

    const date = newDate ? new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000) : null;
    setFieldValue('delivery.date', date);
  };

  useEffect(() => {
    if (!delivery) {
      setLiftPrice(0);
      setFieldValue('lift', null);
      setAssemblyPrice(null);
      setFieldValue('assembly', null);
    }
  }, [delivery]);

  useEffect(() => {
    debouncedCheckLiftPrice();
  }, [lift, address.floor]);

  const isSelfDelivery = delivery?.tag === EOrderDeliveryType.self;
  // ???????????????????????? ??????????????????
  const title = delivery?.tag
    ? {
        [EOrderDeliveryType.normal]: '???????????????? ????????????',
        [EOrderDeliveryType.self]: '??????????????????',
        [EOrderDeliveryType.express]: '????????????????-???????????????? ????????????',
      }[delivery.tag]
    : '???????????? ??????????????????';

  const deliveryTimeSlots = convertTimeslots(deliveryVariants?.time_slots);

  const goodsCount = goods.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  const minDate = isSelfDelivery
    ? delivery?.min_date
    : Boolean(delivery?.min_date) && findMinDate(delivery, deliveryVariants);

  const today = new Date();

  const isExpressToday =
    delivery && delivery?.tag === EOrderDeliveryType.express && today.getHours() + today.getMinutes() / 60 <= 17;

  return (
    <div className={styles.orderDelivery}>
      <OrderDeliveryDrawer
        address={address.address}
        setFieldValue={setFieldValue}
        setDeliveryVariants={setDeliveryVariants}
        onClose={toggleChangeDeliveryDrawer}
        isOpen={isDrawerOpen}
        deliveryTag={delivery?.tag || null}
      />

      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>{title}</h2>
          <div className={styles.cartHeaderButtons}>
            <button className={styles.cartHeaderButton} onClick={toggleChangeDeliveryDrawer}>
              ????????????????
            </button>
          </div>
        </div>
        <div className={`${styles.orderDeliveryText} ${Boolean(delivery) ? styles.row : ''}`}>
          <div className={styles.orderDeliveryTextItem}>
            <Icon name="Car" />
            <span>
              {delivery
                ? `${delivery.name}, ${delivery.price} ???`
                : `?????????????? "???????????????? ??????????", ???? ???????????????? ?? ???????? ?????? ?????????????????? ??????????????`}
            </span>
          </div>
          {orderWeight && (
            <div className={styles.orderDeliveryTextItem}>
              <Icon name="Scales" />
              <span>
                {goodsCount} {num2str(goodsCount, ['??????????', '????????????', '??????????????'])} {orderWeight} ????
              </span>
            </div>
          )}
        </div>

        {isSelfDelivery ? (
          <ObtainingSelfDelivery
            minDate={minDate}
            onDateSelect={onDateSelect}
            setTime={setTime}
            delivery={data.delivery}
            goods={goods}
            onClickChange={toggleChangeDeliveryDrawer}
          />
        ) : (
          <ObtainingDelivery
            minDate={isExpressToday ? minDate : getMinDate()}
            onDateSelect={onDateSelect}
            timeSlots={deliveryTimeSlots}
            setTime={setTime}
            order={data}
            setFieldValue={setFieldValue}
            assemblyPrice={assemblyPrice}
            liftPrice={liftPrice}
            goods={goods}
            setAssemblyPrice={setAssemblyPrice}
            onClickChange={toggleChangeDeliveryDrawer}
          />
        )}
      </div>
    </div>
  );
};

export default OrderObtaining;
