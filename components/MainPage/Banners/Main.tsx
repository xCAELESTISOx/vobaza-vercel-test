import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Banner } from 'src/models/IBanner';

import styles from './styles.module.scss';

type Props = {
  slides: Array<Banner>;
};

type MainBannerContent = {
  title?: string;
  description?: string;
};

const MainBannerContent: FC<MainBannerContent> = (props) => {
  if (!props.title && !props.description) return null;

  return (
    <div className={styles.mainBannerContent}>
      <div
        className={styles.mainBannerTitle}
        dangerouslySetInnerHTML={{ __html: props.title }}
      ></div>
      <div className={styles.mainBannerDecription}>{props.description}</div>
    </div>
  );
};

const MainBanner: FC<Props> = ({ slides }) => {
  return (
    <div className={styles.mainBanner}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={8}
        speed={1000}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        breakpoints={{
          980: {
            spaceBetween: 0,
          },
        }}
        className={styles.swiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.mainSlide}>
              <Link href={slide.url}>
                <a className={styles.slide}>
                  {slide.desktop_image && (
                    <Image
                      className={styles.slideImage}
                      src={slide.desktop_image.variants.original.url}
                      layout="fill"
                      alt="Banner"
                      unoptimized
                    />
                  )}
                </a>
              </Link>
              <Link href={slide.url}>
                <a className={`${styles.slide} ${styles.slideMobile}`}>
                  {(slide.mobile_image || slide.desktop_image) && (
                    <Image
                      className={styles.slideImage}
                      src={
                        slide.mobile_image?.variants?.original.url ||
                        slide.desktop_image.variants.original.url
                      }
                      alt="Banner"
                      layout="fill"
                      objectFit="cover"
                      unoptimized
                    />
                  )}
                </a>
              </Link>
              <MainBannerContent
                title={slide.title}
                description={slide.description}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBanner;
