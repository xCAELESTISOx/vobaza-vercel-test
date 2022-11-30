import React, { FC, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import type { IGoodCard } from '../../../src/models/IGood';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import GoodsCard from '../Card';

import styles from './styles.module.scss';

type Props = {
  goods: IGoodCard[];
};
const GoodsSwiper: FC<Props> = ({ goods }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const setTopOffset = (el) => {
    if (prevRef && prevRef.current) {
      prevRef.current.style.top = el.clientHeight / 2 + 'px';
    }
    if (nextRef && nextRef.current) {
      nextRef.current.style.top = el.clientHeight / 2 + 'px';
    }
  };

  useEffect(() => {
    const el = document.querySelector('.card__image');
    if (el) {
      setTopOffset(el);
      window.addEventListener('resize', () => setTopOffset(el));
    }
    return () => {
      window.removeEventListener('resize', setTopOffset);
    };
  }, []);

  return (
    <div className="container">
      <div className={styles.goodsSwiperBlock}>
        <div className={styles.goodsSwiperPanel} />
        <div className={`${styles.goodsSwiperPanel} ${styles.left}`} />
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.custom-swiper__prev',
            nextEl: '.custom-swiper__next',
          }}
          className={styles.swiper}
          slidesPerView={'auto'}
          spaceBetween={8}
          breakpoints={{
            576: {
              slidesPerView: 3,
            },
            1025: {
              slidesPerView: 4,
            },
            1441: {
              slidesPerView: 5,
            },
          }}
        >
          {goods.map((good) => (
            <SwiperSlide key={good.id}>
              <GoodsCard good={good} isFixedHeight={false} />
            </SwiperSlide>
          ))}
          <div ref={prevRef} className={`${styles.swiperNavButton} custom-swiper__prev`}>
            <Icon name="ArrowLeft" />
          </div>
          <div ref={nextRef} className={`${styles.swiperNavButton} ${styles.swiperNavButtonNext} custom-swiper__next`}>
            <Icon name="ArrowRight" />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default GoodsSwiper;
