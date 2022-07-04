import React, { useState } from 'react';
import Image from 'next/image';
import { useLightbox } from 'simple-react-lightbox';
import { Navigation, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getImageVariantByFieldname } from '../../../assets/utils/images';
import PlaceholderImageFull from 'assets/images/placeholder.png';
import PlaceholderImage from 'assets/images/placeholder_small.png';

import { LightboxViewer } from './LightboxViewer';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

const thumbsBreakpoints = {
  1300: { slidesPerView: 7 },
  1550: { slidesPerView: 8 },
};

const getImagesUrlsFromVariant = (images, fieldname: string) => {
  const urls = [];

  if (Array.isArray(images))
    images.forEach((image) => {
      const imageVariant = getImageVariantByFieldname(image, fieldname);

      if (imageVariant)
        urls.push({
          url: imageVariant.url,
          id: image.id,
          meta: imageVariant.meta,
        });
    });

  return urls;
};

const renderEmptyPlaceholder = (isThumb?: boolean) => {
  return (
    <div className={styles.slideImage}>
      <Image
        src={isThumb ? PlaceholderImage : PlaceholderImageFull}
        objectFit="contain"
        alt=""
        unoptimized
      />
    </div>
  );
};

const ProductImages = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  const { openLightbox } = useLightbox();

  const fullImages = getImagesUrlsFromVariant(images, 'original');
  const mainImages = getImagesUrlsFromVariant(images, 'large');
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
        <div className={styles.slideImage}>
          <Image
            src={img.url}
            width={780}
            height={550}
            objectFit="contain"
            alt=""
            unoptimized
          />
        </div>
      </SwiperSlide>
    ));
  };

  const renderThumbImages = () => {
    return thumbsImages.map((img) => (
      <SwiperSlide key={`thumb-slide-${img.id}`} className={styles.thumbsSlide}>
        <div className={styles.thumbsSlideImage}>
          <Image
            src={img.url}
            width={img.meta.width}
            height={img.meta.height}
            objectFit="contain"
            alt=""
            unoptimized
          />
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <>
      <LightboxViewer images={fullImages} onClose={handleLightboxClosed} />

      <div className={styles.images}>
        {
          mainImages.length > 0 ?
            <>
              <div className={styles.mainSwiperWrapper}>
                <Swiper
                  className={styles.mainSwiper}
                  modules={[Navigation, Thumbs, Pagination]}
                  speed={600}
                  loop={mainImages.length && mainImages.length > 1}
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
                </Swiper>
              </div>
            </> : renderEmptyPlaceholder()
        }
        {
          mainImages.length > 1 &&
          <>
            <div className={`${styles.pagination} product-images-pagination`}></div>
            <div className={styles.thumbsSwiper}>
              <Swiper
                className={styles.swiper}
                modules={[Thumbs]}
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
          </>
        }
      </div>
    </>
  );
};

const ProductImagesMemo = React.memo(ProductImages);

export { ProductImages, ProductImagesMemo };
