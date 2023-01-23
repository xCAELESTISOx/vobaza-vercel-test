import React, { FC } from 'react';

import styles from './styles.module.scss';

// import InstaIconPrimary from './InstaIconPrimary';
// import FbIconPrimary from './FbIconPrimary';
import VkIconPrimary from './VkIconPrimary';
import SKIconPrimary from './SKIconPrimary';

const Socials: FC = () => {
  return (
    <div className={`${styles.socialsList} container`}>
      {/* <a
        href="https://www.instagram.com/vobaza.ru/"
        target="_blank"
        className={styles.socialsListItem}
        rel="noreferrer"
      >
        <InstaIconPrimary />
      </a>
      <a
        href="https://www.facebook.com/vobaza.ru"
        target="_blank"
        className={styles.socialsListItem}
        rel="noreferrer"
      >
        <FbIconPrimary />
      </a> */}
      <a href="https://vk.com/vobaza_official" target="_blank" className={styles.socialsListItem} rel="noreferrer">
        <VkIconPrimary />
      </a>
      <a href="https://sk.ru" target="_blank" className={styles.socialsListItem} rel="noreferrer">
        <SKIconPrimary />
      </a>
    </div>
  );
};

export default Socials;
