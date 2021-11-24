import { FC, useState } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import OrderDeliveryDrawer from './Drawer';

import tmpImg1 from './tmp/good1.jpg';
import tmpImg2 from './tmp/good2.jpg';
import { Button } from '@nebo-team/vobaza.ui.button';

const OrderDelivery: FC = () => {
  const [isDrawer, setIsDrawer] = useState(false);

  const toggleChangeDeliveryDrawer = () => {
    setIsDrawer(!isDrawer);
  };

  return (
    <div className={styles.orderDelivery}>
      <OrderDeliveryDrawer
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
            <Icon name="Phone" />
            <span>
              Нажмите &laquo;Оформить Заказ&raquo;, мы&nbsp;свяжемся с&nbsp;Вами
            </span>
          </div>
          <div className={styles.orderDeliveryTextItem}>
            <Icon name="Phone" />
            <span>6 товаров ・533 кг</span>
          </div>
        </div>
        <div className={styles.orderDeliveryItems}>
          <div className={styles.orderDeliveryItem}>
            <Image src={tmpImg1} alt="" />
          </div>
          <div className={styles.orderDeliveryItem}>
            <Image src={tmpImg2} alt="" />
          </div>
          <div className={styles.orderDeliveryItem}>
            <Image src={tmpImg1} alt="" />
          </div>
          <div className={styles.orderDeliveryItem}>
            <Image src={tmpImg2} alt="" />
          </div>
          <div className={styles.orderDeliveryItem}>
            <Image src={tmpImg1} alt="" />
          </div>
          <div className={styles.orderDeliveryItem}>
            <Image src={tmpImg2} alt="" />
          </div>
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
