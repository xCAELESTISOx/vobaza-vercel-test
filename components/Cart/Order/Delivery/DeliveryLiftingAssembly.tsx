import React, { useState } from 'react';

import type { ILocalOrder } from 'src/models/IOrder';

import { InputRadio } from '@nebo-team/vobaza.ui.inputs.input-radio/dist/input-radio';
import ItemCounter from 'components/UI/ItemCounter';
import Toggle from 'components/UI/Toggle';

import styles from './styles.module.scss';

type Props = {
  address: ILocalOrder['address'];
  lift: ILocalOrder['lift'] | null;
  assembly: ILocalOrder['assembly'];
  liftPrice: number;
  assemblyPrice: number;
  setFieldValue: (name: string, value: any) => void;
};

const DeliveryLiftingAssembly = ({ address, liftPrice, setFieldValue, assembly, assemblyPrice, lift }: Props) => {
  const [isAssembly, setIsAssembly] = useState(false);

  const setCounter = (val: number) => {
    setFieldValue('address.floor', val);
  };

  const toggleIsElevate = () => {
    if (lift) {
      setFieldValue('lift', null);
    } else {
      setFieldValue('lift', { elevator: 'NONE', floor: 1 });
    }
  };

  const toggleIsAssembly = () => {
    setIsAssembly(!isAssembly);
  };

  return (
    <div className={styles.orderDeliverySubblock}>
      <h2 className={styles.orderDeliverySubblockTitle}>Подъем и сборка</h2>
      <div className={styles.orderDeliverySubblockToggleBlock}>
        <Toggle isActive={!!lift} onClick={toggleIsElevate}>
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
          <div className={styles.orderDeliveryRadioBlock}>
            <div className={styles.orderDeliveryRadio}>
              <InputRadio
                currentValue={{ code: 'FREIGHT', value: 'FREIGHT' }}
                label="Грузовой лифт"
                value={lift.elevator}
                name="elevator"
                onChange={() => setFieldValue('lift.elevator', 'FREIGHT')}
              />
            </div>
            <div className={styles.orderDeliveryRadio}>
              <InputRadio
                currentValue={{
                  code: 'NONE',
                  value: 'NONE',
                }}
                label="Пассажирский лифт или по лестнице "
                value={lift.elevator}
                name="elevator"
                onChange={() => setFieldValue('lift.elevator', 'NONE')}
              />
            </div>
            <div className={styles.orderDeliveryRadioSubblock}>
              <div className={styles.orderDeliveryCounter}>
                На какой этаж?
                <ItemCounter minCount={1} itemCount={+address.floor} setItemCount={setCounter} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.orderDeliverySubblockToggleBlock}>
        <Toggle isActive={isAssembly} onClick={toggleIsAssembly}>
          <div className={styles.orderDeliverySubblockToggle}>
            Сборка{' '}
            {assemblyPrice && isAssembly ? (
              <>
                –&nbsp;<span>{assemblyPrice} ₽</span>
              </>
            ) : null}
          </div>
        </Toggle>
      </div>
    </div>
  );
};

export default DeliveryLiftingAssembly;
