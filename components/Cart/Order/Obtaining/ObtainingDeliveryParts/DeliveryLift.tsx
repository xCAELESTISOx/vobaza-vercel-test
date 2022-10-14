import React from 'react';

import type { ILocalOrder } from 'src/models/IOrder';
import type { ElevatorType } from 'src/models/IAddress';

import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';
import { InputRadio } from '@nebo-team/vobaza.ui.inputs.input-radio/dist/input-radio';
import ItemCounter from 'components/UI/ItemCounter';
import Toggle from 'components/UI/Toggle';

import styles from './../styles.module.scss';

type Props = {
  liftPrice: number;
  address: ILocalOrder['address'];
  lift: ILocalOrder['lift'] | null;
  setFieldValue: (name: string, value: any) => void;
};

const DeliveryLift = ({ liftPrice, address, lift, setFieldValue }: Props) => {
  const setCounter = (val: number) => {
    setFieldValue('address.floor', val);
  };

  const toggleIsElevate = () => {
    if (lift) {
      setFieldValue('lift', null);
    } else {
      setFieldValue('lift', { elevator: address.elevator || 'NONE', floor: address.floor || 1, full_order: true });
    }
  };

  const handleElevatorChange = async (val: boolean | { code: string; value: ElevatorType }) => {
    if (val) {
      if (typeof val === 'boolean' || val.value === 'FREIGHT') {
        setFieldValue('lift.elevator', 'FREIGHT');
      } else {
        setFieldValue('lift.elevator', 'PASSENGER');
      }
    } else {
      setFieldValue('lift.elevator', 'NONE');
    }
  };

  return (
    <div className={styles.orderDeliverySubblockToggleBlock}>
      <Toggle isActive={Boolean(lift)} onClick={toggleIsElevate}>
        <div className={styles.orderDeliverySubblockToggle}>
          Подъем на этаж{' '}
          {liftPrice && lift && address.floor ? (
            <>
              –&nbsp;<span>{liftPrice} ₽</span>
            </>
          ) : null}
        </div>
      </Toggle>
      {lift && (
        <div className={styles.orderDeliveryLift}>
          <InputCheckbox
            variation="secondary"
            label="Лифт"
            initialValue={lift.elevator !== 'NONE'}
            onChange={handleElevatorChange}
          />
          <div className={styles.orderDeliveryRadioBlock}>
            <div className={styles.orderDeliveryRadio}>
              <InputRadio
                currentValue={{ code: lift.elevator, value: lift.elevator }}
                value="FREIGHT"
                label="Грузовой"
                name="elevator"
                onChange={handleElevatorChange as any}
                disabled={lift.elevator === 'NONE'}
              />
            </div>
            <div className={styles.orderDeliveryRadio}>
              <InputRadio
                currentValue={{ code: lift.elevator, value: lift.elevator }}
                value="PASSENGER"
                label="Пассажирский"
                name="elevator"
                onChange={handleElevatorChange as any}
                disabled={lift.elevator === 'NONE'}
              />
            </div>
          </div>
          <div className={styles.orderDeliveryRadioSubblock}>
            <div className={styles.orderDeliveryCounter}>
              На какой этаж?
              <ItemCounter minCount={1} itemCount={address.floor} setItemCount={setCounter} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryLift;
