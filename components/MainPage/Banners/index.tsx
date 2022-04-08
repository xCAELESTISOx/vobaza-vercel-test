import React, { FC } from 'react';

import MainBanner from './Main';
import SubBanner from './Sub';

import type { Banner } from '../../../src/models/IBanner';

import styles from './styles.module.scss';

interface Props {
  forSlider: Array<Banner>;
  forMiniature: Array<Banner>;
}

const Banners: FC<Props> = ({ forSlider, forMiniature }) => {
  return (
    <div className="container">
      <div className={styles.banners}>
        <MainBanner slides={forSlider} />
        <div className={styles.subBannersBlock}>
          <SubBanner slides={forMiniature} />
        </div>
      </div>
    </div>
  );
};

export default Banners;
