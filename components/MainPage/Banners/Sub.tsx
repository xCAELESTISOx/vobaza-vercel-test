import React, { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { BannerSlide } from './index';

import styles from './styles.module.scss';

type Props = {
  slides: Array<BannerSlide>;
};

type SubBannerContent = {
  title?: string;
  description?: string;
};

const SubBannerContent: FC<SubBannerContent> = (props) => {
  if (!props.title && !props.description) return null;

  return (
    <div className={styles.subBannerContent}>
      <div
        className={styles.subBannerTitle}
        dangerouslySetInnerHTML={{ __html: props.title }}
      ></div>
      <div className={styles.subBannerDecription}>{props.description}</div>
    </div>
  );
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
                  unoptimized
                />
              )}
              <SubBannerContent
                title={slide.title}
                description={slide.description}
              />
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
                      unoptimized
                    />
                  )}
                  <SubBannerContent
                    title={slide.title}
                    description={slide.description}
                  />
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
