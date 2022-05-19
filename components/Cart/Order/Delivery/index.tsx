import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

import { api } from 'assets/api';
import { num2str } from '../../../../assets/utils';
import { ICartGood } from '../../ListItem';
import { IOrderAddress, IOrderDelivery } from '../../../../src/models/IOrder';
import { IAddress } from 'src/models/IAddress';
import useDebounce from 'src/hooks/useDebounce';
import PlaceholderImage from 'assets/images/placeholder_small.png';
import { getImageVariantProps } from 'assets/utils/images';

import Toggle from '../../../UI/Toggle';
import ItemCounter from '../../../UI/ItemCounter';
import OrderDeliveryDrawer from './Drawer';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select/dist';
import { InputRadio } from '@nebo-team/vobaza.ui.inputs.input-radio/dist';

type Props = {
  goods: ICartGood[];
  address: IOrderAddress;
  currentUserAddress: IAddress;
  delivery: IOrderDelivery;
  setDelivery: (delivery: IOrderDelivery) => void;
  elevatePrice: any;
  setElevatePrice: (elevatePrice: any) => void;
  assemblyPrice: any;
  setAssemblyPrice: (assemblyPrice: any) => void;
};

const tmpTimeVariants = [
  {
    code: 'TI_09_12',
    value: '09:00 - 12:00',
  },
  {
    code: 'TI_12_15',
    value: '12:00 - 15:00',
  },
  {
    code: 'TI_15_18',
    value: '15:00 - 18:00',
  },
  {
    code: 'TI_18_21',
    value: '18:00 - 21:00',
  },
];

const OrderDelivery: FC<Props> = ({
  goods,
  address,
  currentUserAddress,
  delivery,
  setDelivery,
  elevatePrice,
  setElevatePrice,
  assemblyPrice,
  setAssemblyPrice,
}) => {
  const [isDrawer, setIsDrawer] = useState(false);

  // Подъем и сборка
  const [isElevate, setIsElevate] = useState(false);
  const [isElevateWithElevator, setIsElevateWithElevator] = useState('true');
  const [floorCount, setFloorCount] = useState(0);

  const [isAssembly, setIsAssembly] = useState(false);

  const setDate = (date: string) => {
    setDelivery({ ...delivery, date });
  };
  const setTime = (time) => {
    setDelivery({ ...delivery, time });
  };
  const toggleChangeDeliveryDrawer = () => {
    setIsDrawer(!isDrawer);
  };

  const toggleIsElevate = () => {
    setIsElevate(!isElevate);
  };
  const checkLiftPrice = async () => {
    if (!isElevate || !floorCount) {
      setElevatePrice(null);
    } else {
      const price = await getLiftPrice();
      setElevatePrice(price);
    }
  };
  const debouncedCheckLiftPrice = useDebounce(checkLiftPrice, 800);
  const getLiftPrice = async () => {
    if (!delivery) return null;
    try {
      const res = await api.getLiftPrice(
        isElevateWithElevator === 'true' ? 'FREIGHT' : 'PASSENGER',
        floorCount
      );

      return res.data?.data?.price / 100 || 0;
    } catch (error) {
      console.log(error);
    }
    return 0;
  };

  const toggleIsAssembly = () => {
    setIsAssembly(!isAssembly);
  };
  const checkAssemblyPrice = async () => {
    if (!isAssembly) {
      setAssemblyPrice(null);
    } else {
      const price = await getAssemblyPrice();
      setAssemblyPrice(price);
    }
  };
  const debouncedCheckAssemblyPrice = useDebounce(checkAssemblyPrice, 800);
  const getAssemblyPrice = async () => {
    if (!isAssembly) return null;
    try {
      const res = await api.getAssemblyPrice(
        currentUserAddress?.address || address?.address
      );

      return res.data?.data?.price / 100 || 0;
    } catch (error) {
      console.log(error);
    }
    return 0;
  };

  useEffect(() => {
    if (!delivery) {
      setElevatePrice(null);
      setIsElevate(false);
      setAssemblyPrice(null);
      setIsAssembly(false);
    }
  }, [delivery]);

  useEffect(() => {
    debouncedCheckLiftPrice();
  }, [isElevate, floorCount, isElevateWithElevator]);

  useEffect(() => {
    if (!delivery) {
      setAssemblyPrice(null);
    } else {
      debouncedCheckAssemblyPrice();
    }
  }, [address?.address, currentUserAddress?.address, isAssembly]);

  const goodsCount = goods.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  return (
    <div className={styles.orderDelivery}>
      <OrderDeliveryDrawer
        address={
          currentUserAddress ? currentUserAddress.address : address.address
        }
        setDelivery={setDelivery}
        onClose={toggleChangeDeliveryDrawer}
        isOpen={isDrawer}
      />
      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Доставка ВоБаза</h2>
          <div className={styles.cartHeaderButtons}>
            <button
              className={styles.cartHeaderButton}
              onClick={toggleChangeDeliveryDrawer}
            >
              Изменить
            </button>
          </div>
        </div>
        <div className={styles.orderDeliveryText}>
          <div className={styles.orderDeliveryTextItem}>
            <Icon name="Car" />
            <span>
              {delivery
                ? `${delivery.name}, ${delivery.price} ₽`
                : `Нажмите "Оформить Заказ", мы свяжемся с Вами`}
            </span>
          </div>
          <div className={styles.orderDeliveryTextItem}>
            <Icon name="Scales" />
            <span>
              {goodsCount} {num2str(goodsCount, ['товар', 'товара', 'товаров'])}{' '}
              ・533 кг
            </span>
          </div>
        </div>
        {delivery && (
          <>
            <div className={styles.orderDeliveryInputs}>
              <div className={styles.orderDeliveryInput}>
                <InputText
                  label="Дата доставки"
                  name="date"
                  value={delivery.date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className={styles.orderDeliveryInput}>
                <InputSelect
                  name="time"
                  label="Время доставки"
                  currentValue={delivery.time}
                  variants={tmpTimeVariants}
                  onChange={setTime}
                />
              </div>
            </div>
            <div className={styles.orderDeliverySubblock}>
              <h2 className={styles.orderDeliverySubblockTitle}>
                Подъем и сборка
              </h2>
              <div className={styles.orderDeliverySubblockToggleBlock}>
                <Toggle isActive={isElevate} onClick={toggleIsElevate}>
                  <div className={styles.orderDeliverySubblockToggle}>
                    Подъем на этаж{' '}
                    {typeof elevatePrice === 'number' &&
                      isElevate &&
                      !!floorCount && (
                        <>
                          –&nbsp;<span>{elevatePrice} ₽</span>
                        </>
                      )}
                  </div>
                </Toggle>
                {isElevate && (
                  <div className={styles.orderDeliveryRadioBlock}>
                    <div className={styles.orderDeliveryRadio}>
                      <InputRadio
                        currentValue={{
                          code: 'true',
                          value: 'true',
                        }}
                        label="Грузовой лифт"
                        value={isElevateWithElevator}
                        name="withElevator"
                        onChange={() => setIsElevateWithElevator('true')}
                      />
                    </div>
                    <div className={styles.orderDeliveryRadio}>
                      <InputRadio
                        currentValue={{
                          code: 'false',
                          value: 'false',
                        }}
                        label="Пассажирский лифт или по лестнице "
                        value={isElevateWithElevator}
                        name="withElevator"
                        onChange={() => setIsElevateWithElevator('false')}
                      />
                    </div>
                    <div className={styles.orderDeliveryRadioSubblock}>
                      <div className={styles.orderDeliveryCounter}>
                        На какой этаж?
                        <ItemCounter
                          minCount={0}
                          itemCount={floorCount}
                          setItemCount={setFloorCount}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.orderDeliverySubblockToggleBlock}>
                <Toggle isActive={isAssembly} onClick={toggleIsAssembly}>
                  <div className={styles.orderDeliverySubblockToggle}>
                    Сборка{' '}
                    {typeof assemblyPrice === 'number' && isAssembly && (
                      <>
                        –&nbsp;<span>{assemblyPrice} ₽</span>
                      </>
                    )}
                  </div>
                </Toggle>
              </div>
            </div>
          </>
        )}
        <div className={styles.orderDeliveryItems}>
          {goods.map((good) => (
            <div key={good.product.id} className={styles.orderDeliveryItem}>
              {good.product.main_image ? (
                <Image
                  {...getImageVariantProps(
                    good.product.main_image.variants,
                    'small'
                  )}
                  objectFit="contain"
                  alt={good.product.name}
                />
              ) : (
                <Image
                  src={PlaceholderImage}
                  objectFit="contain"
                  alt={good.product.name}
                  unoptimized
                />
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
