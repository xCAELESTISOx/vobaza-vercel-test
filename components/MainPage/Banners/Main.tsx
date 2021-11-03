import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';

type Props = {
  slides: any[];
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
          <SwiperSlide key={slide.href} className={styles.mainSlide}>
            <Link href={slide.href}>
              <a className={styles.slide}>
                <Image
                  className={styles.slideImage}
                  src={slide.image}
                  alt="Banner"
                />
              </a>
            </Link>
            <Link href={slide.href}>
              <a className={`${styles.slide} ${styles.slideMobile}`}>
                <Image
                  className={styles.slideImage}
                  src={slide.mobileImage || slide.image}
                  alt="Banner"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBanner;
