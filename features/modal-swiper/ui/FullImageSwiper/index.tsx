import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Navigation, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { ImageVariant } from 'src/models/IImage';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import ClientOnlyPortal from './ui/ClientOnlyPortal';

import styles from './styles.module.scss';

interface IFullImageSwiperProps {
  images: ImageVariant[];
  onClose: () => void;
  isOpen: boolean;
  thumbsImages: ImageVariant[];
  currentSlide: number;
  onCurrentSlide: (slideIndex: number) => void;
}

const FullImageSwiper = ({
  images,
  onClose,
  isOpen,
  thumbsImages,
  currentSlide,
  onCurrentSlide,
}: IFullImageSwiperProps) => {
  const [fullScreenThumbsSwiper, setFullScreenThumbsSwiper] = useState(null);
  const [fullScreenSwiper, setFullScreenSwiper] = useState(null);
  const [swiperClassList, setSwiperClassList] = useState(`${styles.backdrop} ${isOpen ? styles.backdropActive : styles.backdropHidden}`);

  const renderFullImages = () => {
    return images.map((img) => (
      <SwiperSlide key={`full-slide-${img.id}`}>
        <div className={styles.fullSlideImage}>
          <Image
            src={img.url}
            width={img.meta.width}
            height={img.meta.height}
            objectFit="contain"
            alt=""
            unoptimized
            priority
          />
        </div>
      </SwiperSlide>
    ));
  };

  const renderThumbImages = () => {
    return thumbsImages.map((img) => (
      <SwiperSlide key={`thumb-slide-${img.id}`} className={styles.fullThumbsSlide}>
        <div className={styles.thumbsSlideImage}>
          <Image src={img.url} width={img.meta.width} height={img.meta.height} objectFit="contain" alt="" unoptimized />
        </div>
      </SwiperSlide>
    ));
  };

  useEffect(() => {
    if (fullScreenSwiper) {
      if (isOpen) fullScreenSwiper.slideToLoop(currentSlide, 0);
      setSwiperClassList(`${styles.backdrop} ${isOpen ? styles.backdropActive : styles.backdropHidden}`);
    }
  }, [isOpen, fullScreenSwiper]);

  return (
    <>
      <ClientOnlyPortal selector="body">
        <div
          className={swiperClassList}
          id="full-image-swiper"
        >
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>
              <Icon name="Cross" />
            </button>
            <>
              <Swiper
                className={styles.fullSwiper}
                modules={[Navigation, Thumbs, Pagination]}
                speed={600}
                loop={images.length && images.length > 1}
                allowTouchMove
                centeredSlides
                preloadImages
                navigation={{
                  prevEl: '.product-swiper__prev',
                  nextEl: '.product-swiper__next',
                }}
                thumbs={{
                  swiper: fullScreenThumbsSwiper && !fullScreenThumbsSwiper?.destroyed ? fullScreenThumbsSwiper : null,
                }}
                pagination={{
                  el: '.product-images-pagination',
                  type: 'bullets',
                }}
                onActiveIndexChange={(swiper) => onCurrentSlide(swiper.activeIndex - 1 || 0)}
                onSwiper={(swiper) => setFullScreenSwiper(swiper)}
              >
                {Boolean(images.length) && renderFullImages()}
              </Swiper>
              <button className={`${styles.fullThumbsNavButton} product-swiper__prev`}>
                <Icon name="ArrowLeft" />
              </button>
              <button
                className={`${styles.fullThumbsNavButton} ${styles.fullThumbsNavButtonNext} product-swiper__next`}
              >
                <Icon name="ArrowRight" />
              </button>
            </>
            <>
              <div className={`product-images-pagination`} />
              <div className={styles.thumbsSwiperFull}>
                <Swiper
                  className={styles.swiper}
                  modules={[Thumbs]}
                  watchSlidesProgress
                  slidesPerView={'auto'}
                  centerInsufficientSlides
                  spaceBetween={8}
                  speed={600}
                  slideToClickedSlide
                  onSwiper={setFullScreenThumbsSwiper}
                >
                  {Boolean(thumbsImages.length) && renderThumbImages()}
                </Swiper>
              </div>
            </>
          </div>
        </div>
      </ClientOnlyPortal>
    </>
  );
};

export { FullImageSwiper };
