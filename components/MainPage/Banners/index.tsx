import React, { FC } from 'react';

import { getLastImageVariant } from '../../../assets/utils/images';

import MainBanner from './Main';
import SubBanner from './Sub';

import type { Banner } from '../../../src/models/IBanner';

import styles from './styles.module.scss';

interface Props {
  forSlider: Array<Banner>;
  forMiniature: Array<Banner>;
}

interface BannerSlide extends Omit<Banner, 'desktop_image' | 'mobile_image'> {
  desktop_image: string;
  mobile_image: string;
}

const normalizeSlide = (item: Banner): BannerSlide => {
  const desktop_image = getLastImageVariant(item.desktop_image);
  const mobile_image = getLastImageVariant(item.mobile_image);

  const result = {
    ...item,
    desktop_image: desktop_image ? desktop_image.url : null,
    mobile_image: mobile_image ? mobile_image.url : null,
  };

  return result;
};

const BottomTabBar: FC<Props> = (props) => {
  const { forSlider, forMiniature } = props;

  const sliderSlides = forSlider.map(normalizeSlide);
  const miniatureSlides = forMiniature.map(normalizeSlide);

  return (
    <div className="container">
      <div className={styles.banners}>
        <MainBanner slides={sliderSlides} />
        <div className={styles.subBannersBlock}>
          <SubBanner slides={miniatureSlides} />
        </div>
      </div>
    </div>
  );
};

export default BottomTabBar;
export type { BannerSlide };
