import { FC, useEffect, useState } from 'react';

import type { IDeliveryVariants, ILocalOrderDelivery } from 'src/models/IOrder';
import { EOrderDeliveryType } from '../../../../../src/models/IOrder';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import Drawer from 'src/hoc/withDrawer';

import styles from './styles.module.scss';
import { api } from 'assets/api';

type Props = {
  address: string;
  setFieldValue: (name: string, value: any) => void;
  setDeliveryVariants: (variants: IDeliveryVariants) => void;
  isOpen: boolean;
  onClose: () => void;
};

const OrderDeliveryDrawer: FC<Props> = ({ address, setFieldValue, setDeliveryVariants, isOpen = false, onClose }) => {
  const [variants, setVariants] = useState<ILocalOrderDelivery[]>([]);
  const [currentVariant, setCurrentVariant] = useState<ILocalOrderDelivery>(null);

  const setDeliveryHandler = () => {
    try {
      if (currentVariant) {
        setFieldValue('delivery', currentVariant);
      } else {
        setFieldValue('delivery', null);
      }
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function getDeliveryPrice() {
      try {
        const res = await api.getDeliveryTypes(address);
        const { types, time_slots } = res.data?.data;

        const variantsArr = [];

        if (types) {
          if (types.normal) {
            const newItem: ILocalOrderDelivery = {
              name: 'Доставка',
              price: Math.round(types.normal.price / 100),
              tag: EOrderDeliveryType.normal,
              date: null,
              min_date: types.normal.min_date,
            };
            variantsArr.push(newItem);
          }
          if (types.express) {
            const newItem: ILocalOrderDelivery = {
              name: 'Экспресс-доставка',
              price: Math.round(types.express.price / 100),
              tag: EOrderDeliveryType.express,
              date: null,
              min_date: types.express.min_date,
            };
            variantsArr.push(newItem);
          }
        }

        const deliveryVariants = {
          time_slots,
          types: variantsArr,
        };
        setDeliveryVariants(deliveryVariants);

        setVariants(variantsArr);
      } catch (error) {
        console.error(error);
      }
    }
    if (address) {
      setCurrentVariant(null);
      // setDelivery(null);
      setFieldValue('delivery', null);
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
                currentVariant && currentVariant.tag === variant.tag ? styles.active : ''
              }`}
              onClick={() => {
                setCurrentVariant(variant);
              }}
            >
              <Icon className={styles.deliveryDrawerCardIcon} name="Checkmark" />
              <div className={styles.deliveryDrawerCardType}>{variant.name}</div>
              <div className={styles.deliveryDrawerCardPrice}>{variant.price} ₽</div>
            </div>
          ))}
        <div
          className={`${styles.deliveryDrawerCard} ${!currentVariant ? styles.active : ''}`}
          onClick={() => {
            setCurrentVariant(null);
          }}
        >
          <Icon className={styles.deliveryDrawerCardIcon} name="Checkmark" />
          <div className={styles.deliveryDrawerCardType}>Оформить заказ с менеджером</div>
          <div className={styles.deliveryDrawerCardPrice}>Бесплатно</div>
        </div>
      </div>
      {!currentVariant && (
        <p className={styles.deliveryDrawerText}>
          Нажмите кнопку &laquo;Оформить заказ&raquo;, с&nbsp;вами свяжется менеджер для уточнения даты и&nbsp;стоимости
          доставки.
        </p>
      )}
    </Drawer>
  );
};
export default OrderDeliveryDrawer;
