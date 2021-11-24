import { FC, useState } from 'react';

import styles from './styles.module.scss';
import Drawer from '../../../../../src/hoc/withDrawer';

import { Icon } from '@nebo-team/vobaza.ui.icon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const OrderDeliveryDrawer: FC<Props> = ({ isOpen = false, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setDeliveryHandler = () => {
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
      title="Способ получения"
      buttonText="Подтвердить"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={setDeliveryHandler}
    >
      <div className={styles.deliveryDrawerCards}>
        <div className={`${styles.deliveryDrawerCard} ${styles.active}`}>
          <Icon className={styles.deliveryDrawerCardIcon} name="Checkmark" />
          <div className={styles.deliveryDrawerCardType}>
            Оформить заказ с менеджером
          </div>
          <div className={styles.deliveryDrawerCardPrice}>Бесплатно</div>
        </div>
      </div>
      <p className={styles.deliveryDrawerText}>
        Нажмите кнопку &laquo;Оформить заказ&raquo;, с&nbsp;вами свяжется
        менеджер для уточнения даты и&nbsp;стоимости доставки.
      </p>
    </Drawer>
  );
};
export default OrderDeliveryDrawer;
