import React, { FC } from 'react';

import styles from './styles.module.scss';

import MastercardIcon from './MastercardIcon';
import VisaIcon from './VisaIcon';
import MirIcon from './MirIcon';
// import InstaIcon from './InstaIcon';
// import FbIcon from './FbIcon';
import VkIcon from './VkIcon';

const Credentials: FC = () => {
  return (
    <div className={`${styles.credentials} container`}>
      <div className={styles.copyright}>
        &copy;&nbsp;2022&nbsp;ООО &laquo;Вобаза&raquo;. Все права защищены. Все цены на&nbsp;сайте указаны
        в&nbsp;российских рублях с&nbsp;учетом НДС и&nbsp;без учета стоимости доставки.
      </div>
      <div className={styles.payments}>
        <div className={styles.payment}>
          <MastercardIcon />
        </div>
        <div className={styles.payment}>
          <VisaIcon />
        </div>
        <div className={styles.payment}>
          <MirIcon />
        </div>
      </div>
      <div className={styles.social}>
        <a href="https://vk.com/vobaza_official" target="_blank" className={styles.socialItem} rel="noreferrer">
          <VkIcon />
        </a>
        {/* <a
          href="https://www.instagram.com/vobaza.ru/"
          target="_blank"
          className={styles.socialItem}
          rel="noreferrer"
        >
          <InstaIcon />
        </a> */}
        {/* <a
          href="https://www.facebook.com/vobaza.ru"
          target="_blank"
          className={styles.socialItem}
          rel="noreferrer"
        >
          <FbIcon />
        </a> */}
      </div>
    </div>
  );
};

export default Credentials;
