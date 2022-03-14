import { FC, useState } from 'react';

import styles from './styles.module.scss';
import Drawer from '../../../../../src/hoc/withDrawer';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { InputRadio } from '@nebo-team/vobaza.ui.inputs.input-radio';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const OrderPaymentDrawer: FC<Props> = ({ isOpen = false, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setPaymentHandler = () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Drawer
      title="Способ оплаты "
      buttonText="Подтвердить"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={setPaymentHandler}
    >
      <div className={styles.PaymentDrawerCards}>
        <div className={`${styles.PaymentDrawerCard} ${styles.active}`}>
          <Icon className={styles.PaymentDrawerCardIcon} name="Checkmark" />
          <div className={styles.PaymentDrawerCardType}>При получении</div>
        </div>
      </div>
      <div className={styles.PaymentDrawerSubTitle}>Варианты оплаты </div>
      <div className={styles.PaymentDrawerRadioBlock}>
        <InputRadio
          currentValue={{
            code: '1',
            value: '1',
          }}
          label="Наличными"
          value="1"
          name="payment"
          onChange={() => {}}
        />
        <Icon name="Wallet" />
      </div>
    </Drawer>
  );
};
export default OrderPaymentDrawer;
