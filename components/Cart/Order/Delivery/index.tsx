import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import { useToggle } from 'src/hooks/useToggle';
import { num2str } from '../../../../assets/utils';
import useDebounce from 'src/hooks/useDebounce';
import { getImageVariantProps } from 'assets/utils/images';
import type { ICartGood } from '../../ListItem';
import type { IDeliveryVariants, ILocalOrder, ILocalOrderDelivery, ITimeInterval } from '../../../../src/models/IOrder';
import type { IAssemblyPrice } from 'src/models/IDelivery';
import { EOrderDeliveryType } from '../../../../src/models/IOrder';

import DeliveryLiftingAssembly from './DeliveryLiftingAssembly';
import OrderDeliveryDrawer from './Drawer';
import { InputSelect, Variant } from '@nebo-team/vobaza.ui.inputs.input-select/dist';
import { InputCalendar } from 'components/UI/InputCalendar';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import { api } from 'assets/api';
import styles from './styles.module.scss';

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

const selfDeliveryTimeSlots = [
  { code: '09:00-14:00', value: '09:00-14:00' },
  { code: '12:00-17:00', value: '12:00-17:00' },
  { code: '15:00-20:00', value: '15:00-20:00' },
  { code: '18:00-23:00', value: '18:00-23:00' },
];

const convertTimeslots = (timeSlots: ITimeInterval[]): Variant[] =>
  timeSlots?.map(({ from, to }) => ({ code: `${from}-${to}`, value: `${from}-${to}` })) || [];

const findMinDate = (delivery: ILocalOrderDelivery, deliveryVariants: IDeliveryVariants): Date =>
  deliveryVariants?.types.find(({ name }) => name === delivery.name).min_date;

const OrderDelivery: FC<Props> = ({
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

  const setTime = (time) => {
    setFieldValue('delivery.time', time);
  };
  const toggleChangeDeliveryDrawer = () => {
    toggleDrawer(!isDrawerOpen);
  };

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

  const onDateSelect = (val: Date) => {
    setFieldValue('delivery.date', val);
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

  const deliveryTimeSlots = convertTimeslots(deliveryVariants?.time_slots);

  const goodsCount = goods.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  const timeSlots = isSelfDelivery ? selfDeliveryTimeSlots : deliveryTimeSlots;
  const minDate = isSelfDelivery ? delivery?.min_date : !!delivery?.min_date && findMinDate(delivery, deliveryVariants);

  return (
    <div className={styles.orderDelivery}>
      <OrderDeliveryDrawer
        address={address.address}
        setFieldValue={setFieldValue}
        setDeliveryVariants={setDeliveryVariants}
        onClose={toggleChangeDeliveryDrawer}
        isOpen={isDrawerOpen}
      />
      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>{isSelfDelivery ? 'Самовывоз' : 'Доставка ВоБаза'}</h2>
          <div className={styles.cartHeaderButtons}>
            <button className={styles.cartHeaderButton} onClick={toggleChangeDeliveryDrawer}>
              Изменить
            </button>
          </div>
        </div>
        <div className={`${styles.orderDeliveryText} ${!!delivery ? styles.row : ''}`}>
          <div className={styles.orderDeliveryTextItem}>
            <Icon name="Car" />
            <span>
              {delivery ? `${delivery.name}, ${delivery.price} ₽` : `Нажмите "Оформить Заказ", мы свяжемся с Вами`}
            </span>
          </div>
          {orderWeight && (
            <div className={styles.orderDeliveryTextItem}>
              <Icon name="Scales" />
              <span>
                {goodsCount} {num2str(goodsCount, ['товар', 'товара', 'товаров'])} {orderWeight} кг
              </span>
            </div>
          )}
        </div>
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
            {!isSelfDelivery && (
              <DeliveryLiftingAssembly
                address={data.address}
                setFieldValue={setFieldValue}
                assemblyPrice={assemblyPrice}
                liftPrice={liftPrice}
                goods={goods}
                lift={lift}
                setAssemblyPrice={setAssemblyPrice}
              />
            )}
          </>
        )}
        <div className={styles.orderDeliveryItems}>
          {goods.map(({ product }) => (
            <div key={product.id} className={styles.orderDeliveryItem}>
              {product.main_image ? (
                <Image
                  {...getImageVariantProps(product.main_image.variants, 'small')}
                  objectFit="contain"
                  alt={product.name}
                />
              ) : (
                <Image src={PlaceholderImage} objectFit="contain" alt={product.name} unoptimized />
              )}
            </div>
          ))}
        </div>
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
      </div>
    </div>
  );
};
export default OrderDelivery;
