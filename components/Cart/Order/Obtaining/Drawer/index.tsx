import { FC, useEffect, useState } from 'react';

import type { IDeliveryVariants, ILocalOrderDelivery } from 'src/models/IOrder';
import { EOrderDeliveryType } from '../../../../../src/models/IOrder';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import Drawer from 'src/hoc/withDrawer';

import { api } from 'assets/api';
import styles from './styles.module.scss';

type Props = {
  address: string;
  setFieldValue: (name: string, value: any) => void;
  setDeliveryVariants: (variants: IDeliveryVariants) => void;
  isOpen: boolean;
  onClose: () => void;
  deliveryTag: EOrderDeliveryType | null;
};

const getTommorrow = () => {
  const nowDate = new Date();
  const nextDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate() + 1,
    -nowDate.getTimezoneOffset() / 60
  );

  return nextDate.toISOString().slice(0, 10);
};

const OrderDeliveryDrawer: FC<Props> = ({
  address,
  setFieldValue,
  setDeliveryVariants,
  isOpen = false,
  onClose,
  deliveryTag,
}) => {
  const [variants, setVariants] = useState<ILocalOrderDelivery[]>([]);
  const [currentVariant, setCurrentVariant] = useState<ILocalOrderDelivery>(null);

  const selfDeliveryItem: ILocalOrderDelivery = {
    name: 'Самовывоз',
    price: 0,
    tag: EOrderDeliveryType.self,
    date: null,
    min_date: getTommorrow(),
  };

  const setDeliveryHandler = () => {
    if (deliveryTag === currentVariant?.tag) {
      return onClose();
    }

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

  const onClickClose = () => {
    const activeVariant = variants.find((variant) => deliveryTag === variant.tag);
    const activeSelfDelivery = deliveryTag === EOrderDeliveryType.self ? selfDeliveryItem : activeVariant;
    const oldCurrentVariant = deliveryTag ? activeSelfDelivery : null;

    setCurrentVariant(oldCurrentVariant);
    onClose();
  };

  const styleOrderDelivery = (orderDelivery: ILocalOrderDelivery) => {
    if (!currentVariant) return null;

    if (deliveryTag === orderDelivery.tag && deliveryTag === currentVariant.tag) {
      return styles.active;
    }

    if (currentVariant && currentVariant.tag === orderDelivery.tag) {
      return styles.active;
    }

    return '';
  };

  useEffect(() => {
    async function getDeliveryPrice() {
      try {
        const res = await api.getDeliveryTypes(address);
        const { types, time_slots } = res.data.data;

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
      onClose={onClickClose}
      onButtonClick={setDeliveryHandler}
    >
      <div className={styles.deliveryDrawerCards}>
        {variants.length > 0 &&
          variants.map((variant: ILocalOrderDelivery) => (
            <div
              key={variant.tag}
              className={`${styles.deliveryDrawerCard} ${styleOrderDelivery(variant)}`}
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

        {/* Самовывоз */}
        <div
          className={`${styles.deliveryDrawerCard} ${styleOrderDelivery(selfDeliveryItem)}`}
          onClick={() => {
            setCurrentVariant(selfDeliveryItem);
          }}
        >
          <Icon className={styles.deliveryDrawerCardIcon} name="Checkmark" />
          <div className={styles.deliveryDrawerCardType}>{selfDeliveryItem.name}</div>
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
