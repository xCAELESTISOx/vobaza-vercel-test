import React, { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { BannerSlide } from './index';

import styles from './styles.module.scss';

type Props = {
  slides: Array<BannerSlide>;
};

const MainBanner: FC<Props> = ({ slides }) => {
  return (
    <div className={styles.mainBanner}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={8}
        speed={1000}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        breakpoints={{
          980: {
            spaceBetween: 0,
          },
        }}
        className={styles.swiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.mainSlide}>
            <Link href={slide.url}>
              <a className={styles.slide}>
                {slide.desktop_image && (
                  <Image
                    className={styles.slideImage}
                    src={slide.desktop_image}
                    layout="fill"
                    alt="Banner"
                  />
                )}
              </a>
            </Link>
            <Link href={slide.url}>
              <a className={`${styles.slide} ${styles.slideMobile}`}>
                {(slide.mobile_image || slide.desktop_image) && (
                  <Image
                    className={styles.slideImage}
                    src={slide.mobile_image || slide.desktop_image}
                    alt="Banner"
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBanner;
