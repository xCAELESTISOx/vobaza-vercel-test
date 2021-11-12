import React, { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import tmpImg1 from './tmp/good1.jpg';
import tmpImg2 from './tmp/good2.jpg';
import { Button } from '@nebo-team/vobaza.ui.button';

type Props = {
  good?: object;
  isFixedHeight?: boolean;
};

const GoodsCard: FC<Props> = ({ good, isFixedHeight = true }) => {
  const [currentImage, setCurrentImage] = useState(tmpImg1);
  const cardRef = useRef(null);
  const cardContainerRef = useRef(null);

  const resetImage = () => {
    setCurrentImage(tmpImg1);
  };
  const addToCart = () => {
    //TODO Add to cart
  };
  //Обработка случая когда на строке остается один элемент и при ховере он теряет высоту
  const setCardHeight = () => {
    cardContainerRef.current.style.minHeight = `${cardRef.current.clientHeight}px`;
  };
  useEffect(() => {
    if (isFixedHeight) {
      setCardHeight();
      window.addEventListener('resize', setCardHeight);
      return () => {
        window.removeEventListener('resize', setCardHeight);
      };
    }
  }, []);

  return (
    <div className={styles.cardWrapper} ref={cardRef} onMouseLeave={resetImage}>
      <div className={styles.cardContainer} ref={cardContainerRef}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardLabel}>Экспресс-доставка</div>
            <div className={styles.cardIcon}>
              <Icon name="Favorite" />
            </div>
          </div>
          <div className={`${styles.cardImage} card__image`}>
            <Link href="/">
              <a>
                <Image src={currentImage} alt="" />
              </a>
            </Link>
            <div className={`${styles.cardSale} ${styles.cardSaleMobile}`}>
              -13%
            </div>
          </div>
          <div className={styles.cardVariants}>
            <Link href="/">
              <a
                onMouseEnter={() => {
                  setCurrentImage(tmpImg1);
                }}
              >
                <div className={styles.cardVariant}>
                  <Image src={tmpImg1} alt="123" />
                </div>
              </a>
            </Link>
            <Link href="/">
              <a
                onMouseEnter={() => {
                  setCurrentImage(tmpImg2);
                }}
              >
                <div className={styles.cardVariant}>
                  <Image src={tmpImg2} alt="123" />
                </div>
              </a>
            </Link>
            <Link href="/">
              <a
                onMouseEnter={() => {
                  setCurrentImage(tmpImg1);
                }}
              >
                <div className={styles.cardVariant}>
                  <Image src={tmpImg1} alt="123" />
                </div>
              </a>
            </Link>
            <Link href="/">
              <a
                onMouseEnter={() => {
                  setCurrentImage(tmpImg1);
                }}
              >
                <div className={styles.cardVariant}>
                  <Image src={tmpImg1} alt="123" />
                </div>
              </a>
            </Link>
            <Link href="/">
              <a
                onMouseEnter={() => {
                  setCurrentImage(tmpImg1);
                }}
              >
                <div className={styles.cardVariant}>
                  <Image src={tmpImg1} alt="123" />
                </div>
              </a>
            </Link>
            <Link href="/">
              <a>
                <div className={styles.cardVariant}>+8</div>
              </a>
            </Link>
          </div>
          <div className={styles.cardContent}>
            <Link href="/">
              <a
                className={styles.cardTitle}
                title="Диван Ричмонд Зеленовато-синий"
              >
                Диван Ричмонд Зеленовато-синий
              </a>
            </Link>
            <div className={styles.cardPriceBlock}>
              <div className={styles.cardPrice}>51 990 ₽</div>
              <div className={`${styles.cardPrice} ${styles.cardPriceOld}`}>
                59 990 ₽
              </div>
              <div className={styles.cardSale}>-13%</div>
            </div>
            <div className={styles.cardReviewsBlock}>
              <div>
                <Link href="/">
                  <a className={styles.cardStars}>
                    <div className={styles.cardStar}>
                      <Icon name="Star" />
                    </div>
                    <div className={styles.cardStar}>
                      <Icon name="Star" />
                    </div>
                    <div className={styles.cardStar}>
                      <Icon name="Star" />
                    </div>
                    <div className={styles.cardStar}>
                      <Icon name="Star" />
                    </div>
                    <div className={styles.cardStar}>
                      <Icon name="Star" />
                    </div>
                  </a>
                </Link>
              </div>
              <div className={styles.cardReviews}>
                31 <span>Отзыв</span>
              </div>
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.cardFeatures}>
                <div className={styles.cardFeature}>
                  <div className={styles.cardFeatureTitle}>
                    Размер ШхГхВ (см) :
                  </div>
                  <div className={styles.cardFeatureValue}>169х110х93</div>
                </div>
                <div className={styles.cardFeature}>
                  <div className={styles.cardFeatureTitle}>Наполнитель:</div>
                  <div className={styles.cardFeatureValue}>
                    Ортопедические латы, Высокоэластичный ППУ, Синтепон
                  </div>
                </div>
              </div>
              <div className={styles.cardCart}>
                <Button icon="Cart" text="В корзину" onClick={addToCart} />
              </div>
              <div className={styles.cardProvider}>ВоБаза</div>
            </div>
          </div>
          <div className={styles.labelMobile}>
            <div className={styles.cardLabel}>Экспресс-доставка</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsCard;
