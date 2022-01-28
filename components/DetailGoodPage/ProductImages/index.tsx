import React, { useState } from 'react';

import { Navigation, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';

import { SRLWrapper } from 'simple-react-lightbox';
import { getImageVariantByFieldname } from '../../../assets/utils/images';

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
    thumbnailsPosition: 'bottom',
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

const thumbsBreakpoints = {
  1300: { slidesPerView: 7 },
  1550: { slidesPerView: 8 },
};

const getImagesUrlsFromVariant = (images, fieldname: string) => {
  const urls = [];

  images.forEach((image) => {
    const imageVariant = getImageVariantByFieldname(image, fieldname);

    if (imageVariant) urls.push({ url: imageVariant.url, id: image.id });
  });

  return urls;
};

const ProductImages = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  const mainImages = getImagesUrlsFromVariant(images, 'original');
  const thumbsImages = getImagesUrlsFromVariant(images, 'small');

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
            modules={[Navigation, Thumbs, Pagination]}
            speed={600}
            loop
            allowTouchMove
            navigation={{
              prevEl: '.product-swiper__prev',
              nextEl: '.product-swiper__next',
            }}
            thumbs={{ swiper: thumbsSwiper }}
            pagination={{
              el: '.product-images-pagination',
              type: 'bullets',
            }}
            onSwiper={setMainSwiper}
          >
            {mainImages &&
              mainImages.map((img, index) => (
                <SwiperSlide key={`main-slide-${img.id}`}>
                  <img src={img.url} alt="" />
                </SwiperSlide>
              ))}
          </Swiper>
        </SRLWrapper>
      </div>
      <div className={`${styles.pagination} product-images-pagination`}></div>
      <div className={styles.thumbsSwiper}>
        <Swiper
          className={styles.swiper}
          watchSlidesProgress
          slidesPerView={5}
          spaceBetween={8}
          speed={600}
          slideToClickedSlide
          centerInsufficientSlides
          breakpoints={thumbsBreakpoints}
          onSwiper={setThumbsSwiper}
        >
          {thumbsImages &&
            thumbsImages.map((img) => (
              <SwiperSlide
                key={`thumb-slide-${img.id}`}
                className={styles.thumbsSlide}
              >
                <img className={styles.thumbsSlideImage} src={img.url} alt="" />
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

const ProductImagesMemo = React.memo(ProductImages);

export { ProductImages, ProductImagesMemo };
