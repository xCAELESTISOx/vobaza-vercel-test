import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';

type Props = {
  slides: any[];
};

const MainBanner: FC<Props> = ({ slides }) => {
  return (
    <>
      <div className={styles.subBanners}>
        {slides.map((banner) => (
          <Link key={banner.href} href={banner.href}>
            <a className={styles.subBanner}>
              <Image src={banner.image} alt="Banner" objectFit="cover" />
              <div className={styles.bannerContent}>
                <div
                  className={styles.bannerTitle}
                  dangerouslySetInnerHTML={banner.title}
                ></div>
                <div className={styles.bannerDeacription}>
                  {banner.description}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className={styles.subBannersMobile}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={8}
          speed={600}
          className={styles.swiper}
        >
          {slides.map((banner) => (
            <SwiperSlide key={banner.href}>
              <Link href={banner.href}>
                <a className={styles.subBanner}>
                  <Image
                    src={banner.image}
                    alt="Banner"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={styles.bannerContent}>
                    <div
                      className={styles.bannerTitle}
                      dangerouslySetInnerHTML={banner.title}
                    ></div>
                    <div className={styles.bannerDeacription}>
                      {banner.description}
                    </div>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MainBanner;
