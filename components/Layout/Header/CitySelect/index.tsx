import React, { FC } from 'react';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';

const CitySelect: FC = () => {
  return (
    <button className={styles.citySelect}>
      <Icon name="Location" />
      Ростов-на-Дону
      <Icon name="SmallArrowDown" />
    </button>
  );
};

export default CitySelect;
