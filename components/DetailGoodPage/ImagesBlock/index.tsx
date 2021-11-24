import React, { useState } from 'react';

import { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';

import { SRLWrapper } from 'simple-react-lightbox';

const options = {
  settings: {
    disablePanzoom: true,
    overlayColor: 'rgba(255, 255, 255, 1)',
  },
  thumbnails: {
    showThumbnails: true,
    thumbnailsAlignment: 'center',
    thumbnailsContainerPadding: '8px',
    thumbnailsGap: '8px 8px',
    thumbnailsPosition: 'left',
    thumbnailsSize: ['70px', '70px'],
  },
  buttons: {
    showAutoplayButton: false,
    showDownloadButton: false,
    showFullscreenButton: false,
    showThumbnailsButton: false,
    backgroundColor: '#f2f2f2',
    iconColor: '#af1ebe',
  },
};

const ImagesBlock = ({ items }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  const onLightboxClosed = (e) => {
    if (mainSwiper) {
      mainSwiper.slideTo(+e.currentSlide.id);
    }
  };

  return (
    <div className={styles.images}>
      <div className={styles.currentImage}>
        <SRLWrapper options={options} callbacks={{ onLightboxClosed }}>
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
            onSwiper={setMainSwiper}
          >
            {items.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </SRLWrapper>
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
