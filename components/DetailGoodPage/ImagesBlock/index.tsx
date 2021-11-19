import React, { useState, useRef } from 'react';

import { Navigation, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';

const ImagesBlock = ({ items }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className={styles.images}>
      <div className={styles.currentImage}>
        <Swiper
          className={styles.mainSwiper}
          modules={[Controller]}
          allowTouchMove={true}
          speed={600}
          loop
          controller={{ control: thumbsSwiper }}
          onSwiper={setMainSwiper}
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
          modules={[Navigation, Controller]}
          navigation={{
            prevEl: '.thumbs-swiper__prev',
            nextEl: '.thumbs-swiper__next',
          }}
          slidesPerView={'auto'}
          slidesPerGroup={2}
          spaceBetween={8}
          speed={600}
          slideToClickedSlide={true}
          loop
          controller={{ control: mainSwiper }}
          onSwiper={setThumbsSwiper}
        >
          {items.map((img, index) => (
            <SwiperSlide key={index} className={styles.thumbsSlide}>
              <img className={styles.thumbsSlideImage} src={img} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={`${styles.thumbsNavButton} thumbs-swiper__prev`}>
          <Icon name="ArrowLeft" />
        </div>
        <div
          className={`${styles.thumbsNavButton} ${styles.thumbsNavButtonNext} thumbs-swiper__next`}
        >
          <Icon name="ArrowRight" />
        </div>
      </div>
    </div>
  );
};

const ImagesBlockMemo = React.memo(ImagesBlock);

export { ImagesBlockMemo };
