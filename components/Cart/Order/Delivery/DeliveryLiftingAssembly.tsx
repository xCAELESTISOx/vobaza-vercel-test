import React from 'react';

import type { ICartGood } from 'components/Cart/ListItem';
import type { ILocalOrder } from 'src/models/IOrder';

import DeliveryAssembly from './DeliveryAssembly';
import DeliveryLift from './DeliveryLift';

import styles from './styles.module.scss';

type Props = {
  liftPrice: number;
  assemblyPrice: number;
  goods: ICartGood[];
  address: ILocalOrder['address'];
  lift: ILocalOrder['lift'] | null;
  setAssemblyPrice: (value: number | null) => void;
  setFieldValue: (name: string, value: any) => void;
};

const DeliveryLiftingAssembly = ({
  liftPrice,
  assemblyPrice,
  goods,
  address,
  lift,
  setAssemblyPrice,
  setFieldValue,
}: Props) => {
  return (
    <div className={styles.orderDeliverySubblock}>
      <h2 className={styles.orderDeliverySubblockTitle}>Подъем и сборка</h2>
      <DeliveryLift address={address} liftPrice={liftPrice} lift={lift} setFieldValue={setFieldValue} />
      <DeliveryAssembly
        goods={goods}
        assemblyPrice={assemblyPrice}
        address={address}
        setAssemblyPrice={setAssemblyPrice}
        setFieldValue={setFieldValue}
      />
    </div>
  );
};

export default DeliveryLiftingAssembly;
