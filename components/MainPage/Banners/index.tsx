import React, { FC } from 'react';

import styles from './styles.module.scss';

import MainBanner from './Main';
import SubBanner from './Sub';

import tmpImg1 from './tmp/banner1.png';
import tmpImg2 from './tmp/banner2.png';
import tmpImg3 from './tmp/banner3.png';
import tmpMainImg1 from './tmp/main1.jpg';
import tmpMainImg2 from './tmp/main2.jpg';
import tmpMainImg3 from './tmp/main3.jpg';
import tmpMainMobileImg1 from './tmp/mainMobile1.jpg';
import tmpMainMobileImg2 from './tmp/mainMobile2.jpg';

const mainBaners = [
  {
    image: tmpMainImg1,
    mobileImage: tmpMainMobileImg1,
    href: '/ekspress-dostavka',
  },
  {
    image: tmpMainImg2,
    mobileImage: tmpMainMobileImg2,
    href: '/krovati-s-myagkim-izgolovem',
  },
  {
    image: tmpMainImg3,
    href: '/kollekciya-mebeli-kalgari',
  },
];
const subBaners = [
  {
    title: { __html: `Гарантия <br> лучшей цены` },
    description: 'всегда выгодно',
    image: tmpImg1,
    href: '/garantiya-luchshey-ceny',
  },
  {
    title: { __html: `Доставка <br> в день заказа` },
    description: 'быстро и просто',
    image: tmpImg2,
    href: '/dostavka',
  },
  {
    title: { __html: `Поможем <br> с выбором` },
    description: 'коллцентр всегда на связи',
    image: tmpImg3,
    href: '/kontakty',
  },
];

const BottomTabBar: FC = () => {
  return (
    <div className="container">
      <div className={styles.banners}>
        <MainBanner slides={mainBaners} />
        <div className={styles.subBannersBlock}>
          <SubBanner slides={subBaners} />
        </div>
      </div>
    </div>
  );
};

export default BottomTabBar;
