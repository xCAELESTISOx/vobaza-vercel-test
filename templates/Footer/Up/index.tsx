import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import React, { FC } from 'react';

import styles from './styles.module.scss';

const FooterUpBlock: FC = () => {
  const goUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.upBlock}>
      <button className={styles.upButton} onClick={goUp}>
        Наверх <Icon name="ArrowRight" />
      </button>
    </div>
  );
};

export default FooterUpBlock;
