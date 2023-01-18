import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Navigation, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getImageVariantByFieldname } from 'shared/lib/images';
import PlaceholderImageFull from 'assets/images/placeholder.png';
import PlaceholderImage from 'assets/images/placeholder_small.png';
import type { ImageVariant } from 'src/models/IImage';

import { FullImageSwiper } from 'features/modal-swiper';
import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

const thumbsBreakpoints = {
  1300: { slidesPerView: 7 },
  1550: { slidesPerView: 8 },
};

const getImagesUrlsFromVariant = (images, fieldname: string, altVariant?: string): ImageVariant[] => {
  const urls = [];

  if (Array.isArray(images))
    images.forEach((image) => {
      const imageVariant = getImageVariantByFieldname(image, fieldname, altVariant);

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
      <Image src={isThumb ? PlaceholderImage : PlaceholderImageFull} objectFit="contain" alt="" unoptimized />
    </div>
  );
};

const ProductImages = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fullImages = getImagesUrlsFromVariant(images, 'original');
  const mainImages = getImagesUrlsFromVariant(images, 'large', 'original');
  const thumbsImages = getImagesUrlsFromVariant(images, 'small');

  const handleClose = () => {
    setIsFullScreen(false);
    if (mainSwiper) {
      mainSwiper.slideToLoop(currentSlide);
    }
  };

  const handleClickSlide = (index) => {
    return () => {
      setIsFullScreen(true);
      setCurrentSlide(index);
    };
  };

  const renderMainImages = () => {
    return mainImages.map((img, index) => (
      <SwiperSlide key={`main-slide-${img.id}`} onClick={handleClickSlide(index)}>
        <div className={styles.slideImage}>
          <Image src={img.url} width={780} height={550} objectFit="contain" alt="" unoptimized />
        </div>
      </SwiperSlide>
    ));
  };

  const renderThumbImages = () => {
    return thumbsImages.map((img) => (
      <SwiperSlide key={`thumb-slide-${img.id}`} className={styles.thumbsSlide}>
        <div className={styles.thumbsSlideImage}>
          <Image src={img.url} width={img.meta.width} height={img.meta.height} objectFit="contain" alt="" unoptimized />
        </div>
      </SwiperSlide>
    ));
  };

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isFullScreen]);

  const moreOneImage = mainImages.length > 1;

  return (
    <>
      <FullImageSwiper
        onClose={handleClose}
        images={fullImages}
        isOpen={isFullScreen}
        thumbsImages={thumbsImages}
        currentSlide={currentSlide}
        onCurrentSlide={setCurrentSlide}
      />

      <div className={styles.images}>
        {mainImages.length > 0 ? (
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
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null }}
                pagination={{
                  el: '.product-images-pagination',
                  type: 'bullets',
                }}
                onSwiper={setMainSwiper}
              >
                {Boolean(mainImages.length) && renderMainImages()}
              </Swiper>
            </div>
          </>
        ) : (
          renderEmptyPlaceholder()
        )}
        {moreOneImage && (
          <>
            <div className={`${styles.pagination} product-images-pagination`} />
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
                {Boolean(thumbsImages.length) && renderThumbImages()}
              </Swiper>

              <button className={`${styles.thumbsNavButton} product-swiper__prev`}>
                <Icon name="ArrowLeft" />
              </button>
              <button className={`${styles.thumbsNavButton} ${styles.thumbsNavButtonNext} product-swiper__next`}>
                <Icon name="ArrowRight" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const ProductImagesMemo = React.memo(ProductImages);

export { ProductImages, ProductImagesMemo };
