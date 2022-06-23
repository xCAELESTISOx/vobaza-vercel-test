import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import useToggle from 'src/hooks/useToggle';
import { num2str } from '../../../../assets/utils';
import useDebounce from 'src/hooks/useDebounce';
import { getImageVariantProps } from 'assets/utils/images';
import type { ICartGood } from '../../ListItem';
import type { IDeliveryVariants, ILocalOrder } from '../../../../src/models/IOrder';

import DeliveryLiftingAssembly from './DeliveryLiftingAssembly';
import OrderDeliveryDrawer from './Drawer';
import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select/dist';
import { InputCalendar } from 'components/UI/InputCalendar';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';
import { api } from 'assets/api';

type Props = {
  liftPrice: number;
  assemblyPrice: number;
  data: ILocalOrder;
  goods: ICartGood[];
  setLiftPrice: (value: number) => void;
  setAssemblyPrice: (assemblyPrice: number) => void;
  setFieldValue: (name: string, value: any) => void;
};

const OrderDelivery: FC<Props> = ({
  data,
  setFieldValue,
  goods,
  liftPrice,
  assemblyPrice,
  setLiftPrice,
  setAssemblyPrice,
}) => {
  const [isDrawerOpen, toggleDrawer] = useToggle(false);

  // Подъем и сборка
  const [deliveryVariants, setDeliveryVariants] = useState<IDeliveryVariants | null>(null);

  const { delivery, lift, address, assembly } = data;

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
      console.log(error);
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

  const checkAssemblyPrice = async () => {
    if (!assembly) {
      setAssemblyPrice(null);
    } else {
      const price = await getAssemblyPrice();
      setAssemblyPrice(price);
    }
  };
  const debouncedCheckAssemblyPrice = useDebounce(checkAssemblyPrice, 800);

  const getAssemblyPrice = async () => {
    if (!assembly) return null;
    try {
      const res = await api.getAssemblyPrice(address?.address);

      return res.data?.data?.price / 100 || 0;
    } catch (error) {
      console.log(error);
    }
    return 0;
  };

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

  useEffect(() => {
    if (!delivery) {
      setAssemblyPrice(null);
    } else {
      debouncedCheckAssemblyPrice();
    }
  }, [address?.address, assembly]);

  const goodsCount = goods.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  const timeSlots = deliveryVariants?.time_slots?.map(({ from, to }) => ({ value: `${from}-${to}` })) || [];
  const minDate = delivery?.min_date
    ? deliveryVariants?.types.find(({ name }) => name === delivery.name).min_date
    : undefined || undefined;

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
          <h2 className={styles.cartTitle}>Доставка ВоБаза</h2>
          <div className={styles.cartHeaderButtons}>
            <button className={styles.cartHeaderButton} onClick={toggleChangeDeliveryDrawer}>
              Изменить
            </button>
          </div>
        </div>
        <div className={styles.orderDeliveryText}>
          <div className={styles.orderDeliveryTextItem}>
            <Icon name="Car" />
            <span>
              {delivery ? `${delivery.name}, ${delivery.price} ₽` : `Нажмите "Оформить Заказ", мы свяжемся с Вами`}
            </span>
          </div>
          <div className={styles.orderDeliveryTextItem}>
            <Icon name="Scales" />
            <span>
              {goodsCount} {num2str(goodsCount, ['товар', 'товара', 'товаров'])} ・533 кг
            </span>
          </div>
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
            <DeliveryLiftingAssembly
              address={data.address}
              setFieldValue={setFieldValue}
              assemblyPrice={assemblyPrice}
              liftPrice={liftPrice}
              goods={goods}
              lift={lift}
            />
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
