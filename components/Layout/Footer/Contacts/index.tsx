import React, { FC } from 'react';

import styles from './styles.module.scss';
import { Button } from '@nebo-team/vobaza.ui.button';

type Props = {
  openPhoneCallModal: () => void;
};

const FooterContacts: FC<Props> = ({ openPhoneCallModal }) => {
  return (
    <div className={`${styles.contactsBlock} container`}>
      <div className={styles.contactsItem}>
        <div className={styles.contactsTitle}>
          Горячая линия и&nbsp;Доставка заказов
        </div>
        <a href="tel:+74951725622" className={styles.contactsPhone}>
          +7(495) 172-56-22
        </a>
        <div className={styles.contactsWorkTime}>
          ежедневно с&nbsp;9:00 до&nbsp;21:00
        </div>
        <Button
          className={styles.contactsButton}
          text="Заказать звонок"
          icon="Phone"
          size="big"
          onClick={openPhoneCallModal}
        />
      </div>
      <div className={styles.contactsItem}>
        <div className={styles.contactsTitle}>Электронная почта</div>
        <a href="mailto:notify@vobaza.ru" className={styles.contactsEmail}>
          notify@vobaza.ru
        </a>
      </div>
    </div>
  );
};

export default FooterContacts;
