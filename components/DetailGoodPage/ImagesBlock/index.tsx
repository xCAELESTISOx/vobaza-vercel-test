import React, { useState } from 'react';

import { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';

const ImagesBlock = ({ items }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className={styles.images}>
      <div className={styles.currentImage}>
        <Swiper
          className={styles.mainSwiper}
          modules={[Navigation, Thumbs]}
          speed={600}
          loop
          allowTouchMove
          navigation={{
            prevEl: '.product-swiper__prev',
            nextEl: '.product-swiper__next',
          }}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {items.map((img, index) => (
            <SwiperSlide key={index}>
              <div>
                <img src={img} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.thumbsSwiper}>
        <Swiper
          className={styles.swiper}
          watchSlidesProgress
          slidesPerView={'auto'}
          spaceBetween={8}
          speed={600}
          slideToClickedSlide
          centerInsufficientSlides
          onSwiper={setThumbsSwiper}
        >
          {items.map((img, index) => (
            <SwiperSlide key={index} className={styles.thumbsSlide}>
              <img className={styles.thumbsSlideImage} src={img} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`${styles.thumbsNavButton} product-swiper__prev`}>
          <Icon name="ArrowLeft" />
        </button>
        <button
          className={`${styles.thumbsNavButton} ${styles.thumbsNavButtonNext} product-swiper__next`}
        >
          <Icon name="ArrowRight" />
        </button>
      </div>
    </div>
  );
};

const ImagesBlockMemo = React.memo(ImagesBlock);

export { ImagesBlockMemo };
