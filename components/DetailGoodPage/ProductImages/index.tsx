import React, { useState } from 'react';
import { useLightbox } from 'simple-react-lightbox';

import { Navigation, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import styles from './styles.module.scss';

import { getImageVariantByFieldname } from '../../../assets/utils/images';
import { LightboxViewer } from './LightboxViewer';

const thumbsBreakpoints = {
  1300: { slidesPerView: 7 },
  1550: { slidesPerView: 8 },
};

const getImagesUrlsFromVariant = (images, fieldname: string) => {
  const urls = [];

  if (Array.isArray(images))
    images.forEach((image) => {
      const imageVariant = getImageVariantByFieldname(image, fieldname);

      if (imageVariant) urls.push({ url: imageVariant.url, id: image.id });
    });

  return urls;
};

const renderEmptyPlaceholder = () => {
  return (
    <SwiperSlide>
      <Icon className={styles.slideImage} name="ImagePlaceholder" />
    </SwiperSlide>
  );
};

const ProductImages = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  const { openLightbox } = useLightbox();

  const mainImages = getImagesUrlsFromVariant(images, 'original');
  const thumbsImages = getImagesUrlsFromVariant(images, 'small');

  const handleLightboxClosed = (e) => {
    if (mainSwiper) {
      mainSwiper.slideTo(+e.currentSlide.id + 1);
    }
  };

  const handleClickSlide = (index) => {
    return () => {
      openLightbox(index);
    };
  };

  const renderMainImages = () => {
    return mainImages.map((img, index) => (
      <SwiperSlide
        key={`main-slide-${img.id}`}
        onClick={handleClickSlide(index)}
      >
        <img className={styles.slideImage} src={img.url} alt="" />
      </SwiperSlide>
    ));
  };

  const renderThumbImages = () => {
    return thumbsImages.map((img) => (
      <SwiperSlide key={`thumb-slide-${img.id}`} className={styles.thumbsSlide}>
        <img className={styles.thumbsSlideImage} src={img.url} alt="" />
      </SwiperSlide>
    ));
  };

  return (
    <>
      <LightboxViewer images={mainImages} onClose={handleLightboxClosed} />

      <div className={styles.images}>
        <div className={styles.mainSwiperWrapper}>
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
            {!!mainImages.length && renderMainImages()}
            {!mainImages.length && renderEmptyPlaceholder()}
          </Swiper>
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
            {!!thumbsImages.length && renderThumbImages()}
            {!thumbsImages.length && renderEmptyPlaceholder()}
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
    </>
  );
};

const ProductImagesMemo = React.memo(ProductImages);

export { ProductImages, ProductImagesMemo };
