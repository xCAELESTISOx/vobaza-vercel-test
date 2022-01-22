import React, { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { BannerSlide } from './index';

import styles from './styles.module.scss';

type Props = {
  slides: Array<BannerSlide>;
};

const SubBanner: FC<Props> = ({ slides }) => {
  return (
    <>
      <div className={styles.subBanners}>
        {slides.map((slide) => (
          <Link key={slide.id} href={slide.url}>
            <a className={styles.subBanner}>
              {slide.desktop_image && (
                <Image
                  src={slide.desktop_image}
                  alt="Banner"
                  layout="fill"
                  objectFit="cover"
                />
              )}
              <div className={styles.bannerContent}>
                <div
                  className={styles.bannerTitle}
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                ></div>
                <div className={styles.bannerDeacription}>
                  {slide.description}
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
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link href={slide.url}>
                <a className={styles.subBanner}>
                  {(slide.mobile_image || slide.desktop_image) && (
                    <Image
                      src={slide.mobile_image || slide.desktop_image}
                      alt="Banner"
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                  <div className={styles.bannerContent}>
                    <div
                      className={styles.bannerTitle}
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    ></div>
                    <div className={styles.bannerDeacription}>
                      {slide.description}
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

export default SubBanner;
