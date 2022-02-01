import React, { FC, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';
import { IGood } from '../../../src/models/IGood';
import { useFavorite } from '../../../src/hooks/useFavorite';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Button } from '@nebo-team/vobaza.ui.button';

type Props = {
  good?: IGood;
  isFixedHeight?: boolean;
};

const GoodsCard: FC<Props> = ({ good, isFixedHeight = true }) => {
  // const [currentImage, setCurrentImage] = useState(0);
  const cardRef = useRef(null);
  const cardContainerRef = useRef(null);
  const { currentFavorite, toggleFavorite } = useFavorite(good);

  // const resetImage = () => {
  //   setCurrentImage(0);
  // };
  const addToCart = () => {
    //TODO Add to cart
  };

  const checkExpress = () => {
    if (good.labels.find((good) => good.code === 'EXPRESS-DELIVERY')?.active) {
      return true;
    }
    return false;
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

  const renderFeatureValue = (feature) => {
    if (typeof feature.value === 'object') {
      let str = '';
      feature.value.forEach((attribute) => {
        if (str) str += ', ';
        if (typeof attribute === 'object') {
          str += attribute.value;
        } else {
          str += attribute;
        }
      });
      return str;
    } else if (typeof feature.value === 'boolean') {
      if (feature.value) return 'Да';
      else return 'Нет';
    }
    return feature.value;
  };

  return (
    <div
      className={styles.cardWrapper}
      ref={cardRef}
      // onMouseLeave={resetImage}
    >
      <div className={styles.cardContainer} ref={cardContainerRef}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardLabel}>
              {checkExpress() ? 'Экспресс-доставка' : ''}
            </div>
            <div
              className={`${styles.cardIcon} ${
                currentFavorite ? styles.active : ''
              }`}
              onClick={toggleFavorite}
            >
              <Icon name="Favorite" />
            </div>
          </div>
          <div className={`${styles.cardImage} card__image`}>
            <Link href={`/product/${good.slug}_${good.id}_${good.sku}`}>
              <a>
                {good.images ? (
                  <Image
                    src={good.images[0].variants.original.url}
                    width={278}
                    height={278}
                    alt={good.name}
                  />
                ) : (
                  <Icon name="ImagePlaceholder" />
                )}
              </a>
            </Link>
            {good.discount_price && (
              <div className={`${styles.cardSale} ${styles.cardSaleMobile}`}>
                {Math.round((good.discount_price / good.price) * 100 - 100)}%
              </div>
            )}
          </div>
          <div className={styles.cardVariants}>
            <Link href={`/product/${good.slug}_${good.id}_${good.sku}`}>
              <a
                onMouseEnter={() => {
                  // setCurrentImage('');
                }}
              >
                <div className={styles.cardVariant}>
                  {good.images ? (
                    <Image
                      src={good.images[0].variants.original.url}
                      width={38}
                      height={38}
                      alt={good.name}
                    />
                  ) : (
                    <Icon name="ImagePlaceholder" />
                  )}
                </div>
              </a>
            </Link>
            {/* <Link href="/">
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
            </Link> */}
          </div>
          <div className={styles.cardContent}>
            <Link href={`/product/${good.slug}_${good.id}_${good.sku}`}>
              <a className={styles.cardTitle} title={good.name}>
                {good.name}
              </a>
            </Link>
            <div className={styles.cardPriceBlock}>
              <div className={styles.cardPrice}>
                {Intl.NumberFormat('ru-RU').format(
                  good.discount_price ? good.discount_price : good.price
                )}{' '}
                ₽
              </div>
              {good.discount_price && (
                <div className={`${styles.cardPrice} ${styles.cardPriceOld}`}>
                  {Intl.NumberFormat('ru-RU').format(good.price)}
                </div>
              )}
              {good.discount_price && (
                <div className={styles.cardSale}>
                  {Math.round((good.discount_price / good.price) * 100 - 100)}%
                </div>
              )}
            </div>
            {/* <div className={styles.cardReviewsBlock}>
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
            </div> */}
            <div className={styles.cardInfo}>
              <div className={styles.cardFeatures}>
                {good.attributes.map((feature) => (
                  <div
                    className={styles.cardFeature}
                    key={feature.attribute.id}
                  >
                    <div className={styles.cardFeatureTitle}>
                      {feature.attribute.name} :
                    </div>
                    <div className={styles.cardFeatureValue}>
                      {renderFeatureValue(feature)}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cardCart}>
                <Button icon="Cart" text="В корзину" onClick={addToCart} />
              </div>
              <div className={styles.cardProvider}>{good.merchant.brand}</div>
            </div>
          </div>
          {checkExpress() && (
            <div className={styles.labelMobile}>
              <div className={styles.cardLabel}>Экспресс-доставка</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodsCard;
