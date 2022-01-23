import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import OrderDeliveryDrawer from './Drawer';

import tmpImg1 from './tmp/good1.jpg';
import Toggle from '../../../UI/Toggle';
import ItemCounter from '../../../UI/ItemCounter';
import { Button } from '@nebo-team/vobaza.ui.button';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select';
import { InputRadio } from '@nebo-team/vobaza.ui.inputs.input-radio';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox';

type Props = {
  address: string;
  delivery: any;
  setDelivery: (delivery: any) => void;
  elevatePrice: any;
  setElevatePrice: (elevatePrice: any) => void;
  assemblyPrice: any;
  setAssemblyPrice: (assemblyPrice: any) => void;
};

const tmpItems = [{}, {}, {}, {}, {}, {}];
const tmpTimeVariants = [
  {
    code: '0',
    value: '09:00 - 20:00',
  },
  {
    code: '1',
    value: '12:00 - 17:00',
  },
  {
    code: '2',
    value: '15:00 - 20:00',
  },
  {
    code: '3',
    value: '18:00 - 23:00',
  },
];

const OrderDelivery: FC<Props> = ({
  address,
  delivery,
  setDelivery,
  elevatePrice,
  setElevatePrice,
  assemblyPrice,
  setAssemblyPrice,
}) => {
  const [isDrawer, setIsDrawer] = useState(false);

  // Подъем и сборка
  const [date, setDate] = useState('');
  const [time, setTime] = useState<any>(tmpTimeVariants[0]);
  const [isElevate, setIsElevate] = useState(false);
  const [isElevateWithElevator, setIsElevateWithElevator] = useState('true');
  const [elevateType, setElevateType] = useState('all');
  const [floorCount, setFloorCount] = useState(0);
  const [elevateItems, setElevateItems] = useState([]);

  const [isAssembly, setIsAssembly] = useState(false);
  const [assemblyType, setAssemblyType] = useState('all');
  const [assemblyItems, setAssemblyItems] = useState([]);

  const toggleChangeDeliveryDrawer = () => {
    setIsDrawer(!isDrawer);
  };
  const toggleIsElevate = () => {
    setIsElevate(!isElevate);
  };
  const toggleIsAssembly = () => {
    setIsAssembly(!isAssembly);
  };

  const toggleElevateItems = (index) => {
    //
    if (elevateItems.includes(index)) {
      setElevateItems([...elevateItems.filter((item) => item !== index)]);
    } else {
      setElevateItems([...elevateItems, index]);
    }
  };
  const toggleAssemblyItems = (index) => {
    //
    if (assemblyItems.includes(index)) {
      setAssemblyItems([...assemblyItems.filter((item) => item !== index)]);
    } else {
      setAssemblyItems([...assemblyItems, index]);
    }
  };

  useEffect(() => {
    if (!delivery || !isElevate || isElevateWithElevator === 'true') {
      setElevatePrice(0);
    } else if (elevateType === 'particle') {
      setElevatePrice(elevateItems.length * 200 * floorCount);
    } else {
      setElevatePrice(tmpItems.length * 200 * floorCount);
    }
  }, [
    delivery,
    isElevate,
    floorCount,
    elevateType,
    isElevateWithElevator,
    elevateItems,
  ]);
  useEffect(() => {
    if (!delivery || !isAssembly) {
      setAssemblyPrice(0);
    } else if (assemblyType === 'particle') {
      setAssemblyPrice(assemblyItems.length * 3250);
    } else {
      setAssemblyPrice(tmpItems.length * 3250);
    }
  }, [delivery, isAssembly, assemblyType, assemblyItems]);

  return (
    <div className={styles.orderDelivery}>
      <OrderDeliveryDrawer
        withVariants={address.includes('Москва')}
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
            {/* TODO num2String */}
            <span>{tmpItems.length} товаров ・533 кг</span>
          </div>
        </div>
        {delivery && (
          <>
            <div className={styles.orderDeliveryInputs}>
              <div className={styles.orderDeliveryInput}>
                <InputText
                  label="Дата доставки"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className={styles.orderDeliveryInput}>
                <InputSelect
                  name="time"
                  label="Время доставки"
                  currentValue={tmpTimeVariants[time.code]}
                  variants={tmpTimeVariants}
                  onChange={(e) => setTime(e)}
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
                    {isElevate && (
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
                    {isElevateWithElevator === 'false' && (
                      <div className={styles.orderDeliveryRadioSubblock}>
                        <div className={styles.orderDeliveryTabs}>
                          <div
                            className={`${styles.orderDeliveryTab} ${
                              elevateType === 'all' ? styles.active : ''
                            }`}
                            onClick={() => {
                              setElevateType('all');
                            }}
                          >
                            Весь заказ
                          </div>
                          <div
                            className={`${styles.orderDeliveryTab} ${
                              elevateType === 'particle' ? styles.active : ''
                            }`}
                            onClick={() => {
                              setElevateType('particle');
                            }}
                          >
                            Выбранные товары
                          </div>
                        </div>
                        <div className={styles.orderDeliveryCounter}>
                          На какой этаж?
                          <ItemCounter
                            minCount={0}
                            itemCount={floorCount}
                            setItemCount={setFloorCount}
                          />
                        </div>
                        {elevateType === 'particle' && (
                          <div>
                            {tmpItems.map((item, index) => (
                              <div
                                key={index}
                                className={styles.orderDeliveryTableItem}
                              >
                                <InputCheckbox
                                  label={
                                    <div
                                      className={
                                        styles.orderDeliveryTableItemWrap
                                      }
                                    >
                                      <div
                                        className={
                                          styles.orderDeliveryTableItemImage
                                        }
                                      ></div>
                                      <div
                                        className={
                                          styles.orderDeliveryTableItemText
                                        }
                                      >
                                        Шкаф Соренто с раздвижными дверями дуб
                                        стирлинг. кофе структурный матовый 3
                                        двери
                                      </div>
                                    </div>
                                  }
                                  variation="secondary"
                                  initialValue={elevateItems.includes(index)}
                                  onChange={() => {
                                    toggleElevateItems(index);
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.orderDeliverySubblockToggleBlock}>
                <Toggle isActive={isAssembly} onClick={toggleIsAssembly}>
                  <div className={styles.orderDeliverySubblockToggle}>
                    Сборка{' '}
                    {isAssembly && (
                      <>
                        –&nbsp;<span>{assemblyPrice} ₽</span>
                      </>
                    )}
                  </div>
                </Toggle>
                {isAssembly && (
                  <div className={styles.orderDeliveryRadioBlock}>
                    <div className={styles.orderDeliveryRadioSubblock}>
                      <div className={styles.orderDeliveryTabs}>
                        <div
                          className={`${styles.orderDeliveryTab} ${
                            assemblyType === 'all' ? styles.active : ''
                          }`}
                          onClick={() => {
                            setAssemblyType('all');
                          }}
                        >
                          Весь заказ
                        </div>
                        <div
                          className={`${styles.orderDeliveryTab} ${
                            assemblyType === 'particle' ? styles.active : ''
                          }`}
                          onClick={() => {
                            setAssemblyType('particle');
                          }}
                        >
                          Выбранные товары
                        </div>
                      </div>
                      {assemblyType === 'particle' && (
                        <div>
                          {tmpItems.map((item, index) => (
                            <div
                              key={index}
                              className={styles.orderDeliveryTableItem}
                            >
                              <InputCheckbox
                                label={
                                  <div
                                    className={
                                      styles.orderDeliveryTableItemWrap
                                    }
                                  >
                                    <div
                                      className={
                                        styles.orderDeliveryTableItemImage
                                      }
                                    ></div>
                                    <div
                                      className={
                                        styles.orderDeliveryTableItemText
                                      }
                                    >
                                      Шкаф Соренто с раздвижными дверями дуб
                                      стирлинг. кофе структурный матовый 3 двери
                                    </div>
                                  </div>
                                }
                                variation="secondary"
                                initialValue={assemblyItems.includes(index)}
                                onChange={() => {
                                  toggleAssemblyItems(index);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <div className={styles.orderDeliveryItems}>
          {tmpItems.map((item, index) => (
            <div key={index} className={styles.orderDeliveryItem}>
              <Image src={tmpImg1} alt="" />
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
