import { FC, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import Drawer from '../../../../../src/hoc/withDrawer';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import {
  IOrderDelivery,
  IOrderDeliveryType,
} from '../../../../../src/models/IOrder';
import { api } from 'assets/api';

type Props = {
  address: string;
  setDelivery: (delivery: IOrderDelivery) => void;
  isOpen: boolean;
  onClose: () => void;
};

const tmpVariants = [
  {
    name: 'Доставка',
    price: 990,
    tag: IOrderDeliveryType.normal,
    date: '',
    time: null,
  },
  {
    name: 'Экспресс-доставка',
    price: 1980,
    tag: IOrderDeliveryType.express,
    date: '',
    time: null,
  },
];

const OrderDeliveryDrawer: FC<Props> = ({
  address,
  setDelivery,
  isOpen = false,
  onClose,
}) => {
  const [variants, setVariants] = useState([]);
  const [currentVariant, setCurrentVariant] = useState<IOrderDelivery>(null);

  const setDeliveryHandler = () => {
    try {
      if (currentVariant) {
        setDelivery(currentVariant);
      } else {
        setDelivery(null);
      }
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getDeliveryPrice() {
      try {
        const res = await api.getDeliveryPrice(address);
        const variantsArr = [];

        if (res.data?.data?.normal) {
          variantsArr.push({
            name: 'Доставка',
            price: Math.round(res.data.data.normal / 100),
            tag: IOrderDeliveryType.normal,
            date: '',
            time: null,
          });
        }
        if (res.data?.data?.express) {
          variantsArr.push({
            name: 'Экспресс-доставка',
            price: Math.round(res.data.data.express / 100),
            tag: IOrderDeliveryType.express,
            date: '',
            time: null,
          });
        }
        setVariants(variantsArr);
      } catch (error) {
        console.log(error);
      }
    }
    if (address) {
      setCurrentVariant(null);
      setDelivery(null);
      getDeliveryPrice();
    }
  }, [address]);

  return (
    <Drawer
      title="Способ получения"
      buttonText="Подтвердить"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={setDeliveryHandler}
    >
      <div className={styles.deliveryDrawerCards}>
        {variants.length > 0 &&
          variants.map((variant: any) => (
            <div
              key={variant.tag}
              className={`${styles.deliveryDrawerCard} ${
                currentVariant && currentVariant.tag === variant.tag
                  ? styles.active
                  : ''
              }`}
              onClick={() => {
                setCurrentVariant(variant);
              }}
            >
              <Icon
                className={styles.deliveryDrawerCardIcon}
                name="Checkmark"
              />
              <div className={styles.deliveryDrawerCardType}>
                {variant.name}
              </div>
              <div className={styles.deliveryDrawerCardPrice}>
                {variant.price} ₽
              </div>
            </div>
          ))}
        <div
          className={`${styles.deliveryDrawerCard} ${
            !currentVariant ? styles.active : ''
          }`}
          onClick={() => {
            setCurrentVariant(null);
          }}
        >
          <Icon className={styles.deliveryDrawerCardIcon} name="Checkmark" />
          <div className={styles.deliveryDrawerCardType}>
            Оформить заказ с менеджером
          </div>
          <div className={styles.deliveryDrawerCardPrice}>Бесплатно</div>
        </div>
      </div>
      {!currentVariant && (
        <p className={styles.deliveryDrawerText}>
          Нажмите кнопку &laquo;Оформить заказ&raquo;, с&nbsp;вами свяжется
          менеджер для уточнения даты и&nbsp;стоимости доставки.
        </p>
      )}
    </Drawer>
  );
};
export default OrderDeliveryDrawer;
