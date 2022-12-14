import React, { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// import type { IAttribute } from 'src/models/IAttributes';
import type { IGoodCard } from '../../model/IGood';
import { useFavorite } from '../../../../src/hooks/useFavorite';
import { toNumberWithSpaces } from 'shared/lib/formatters';
import { getImageVariantProps } from 'shared/lib/images';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { useCart } from '../../../../src/hooks/useCart';
import CardProductVariants from './CardProductVariants';

import PlaceholderImage from 'assets/images/placeholder.png';
import PlaceholderImageSmall from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

type Props = {
  good?: IGoodCard;
  isFixedHeight?: boolean;
};

const GoodsCard: FC<Props> = ({ good, isFixedHeight = true }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const cardRef = useRef(null);
  const cardContainerRef = useRef(null);
  const { currentFavorite, toggleFavorite } = useFavorite(good);
  const { addToCart } = useCart(good);

  const resetImage = () => {
    setCurrentImage(null);
  };

  const addToCartHandler = () => {
    const categories = good.parent_categories.map(({ name }) => name);

    (window as any).dataLayer.push({
      ecommerce: {
        currencyCode: 'RUB',
        add: {
          products: [
            {
              id: good.id,
              name: good.name,
              price: good.list_price || good.price,
              brand: good.brand,
              category: categories.join('/'),
              quantity: 1,
            },
          ],
        },
      },
    });
    addToCart();
  };

  const isExpress = good.labels && good.labels.find((good) => good.code === 'EXPRESS-DELIVERY')?.active;

  //Обработка случая когда на строке остается один элемент и при ховере он теряет высоту
  const setCardHeight = () => {
    cardContainerRef.current.style.minHeight = `${cardRef.current.clientHeight}px`;
  };

  // const renderFeatureValue = (feature: { attribute: IAttribute; value: any }) => {
  //   if (Array.isArray(feature.value)) {
  //     let str = '';
  //     feature.value.forEach((attribute) => {
  //       if (str) str += ', ';
  //       if (typeof attribute === 'object') {
  //         str += attribute.value;
  //       } else {
  //         str += attribute;
  //       }
  //     });
  //     return str;
  //   } else if (typeof feature.value === 'boolean') {
  //     if (feature.value) return 'Да';
  //     else return 'Нет';
  //   }
  //   return feature.value;
  // };

  useEffect(() => {
    if (isFixedHeight) {
      setCardHeight();
      window.addEventListener('resize', setCardHeight);
      return () => {
        window.removeEventListener('resize', setCardHeight);
      };
    }
  }, []);

  const displayImageSize = !currentImage?.main_image && {
    height: good.main_image?.variants.medium?.meta.height || '100%',
    width: good.main_image?.variants.medium?.meta.width || '100%',
  };

  return (
    <div className={styles.cardWrapper} ref={cardRef} onMouseLeave={resetImage}>
      <div className={styles.cardContainer} ref={cardContainerRef}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardLabel}>{isExpress ? 'Экспресс-доставка' : ''}</div>
            <div className={`${styles.cardIcon} ${currentFavorite ? styles.active : ''}`} onClick={toggleFavorite}>
              <Icon name="Favorite" />
            </div>
          </div>
          <div className={`${styles.cardImage} card__image`}>
            <Link
              href={
                currentImage ? `/product/${currentImage.slug}-${currentImage.sku}` : `/product/${good.slug}-${good.sku}`
              }
              passHref
            >
              <a target="_blank">
                {good.main_image ? (
                  <Image
                    {...getImageVariantProps(
                      currentImage ? currentImage.main_image?.variants : good.main_image?.variants,
                      'medium'
                    )}
                    {...displayImageSize}
                    height={278}
                    width={278}
                    objectFit="contain"
                    alt={good.name}
                  />
                ) : (
                  <Image src={PlaceholderImage} objectFit="contain" alt={good.name} unoptimized />
                )}
              </a>
            </Link>
            {good.list_price && (
              <div className={`${styles.cardSale} ${styles.cardSaleMobile}`}>
                {Math.round((good.price / good.list_price) * 100 - 100)}%
              </div>
            )}
          </div>
          <div className={styles.cardVariants}>
            <Link href={`/product/${good.slug}-${good.sku}`}  passHref>
              <a onMouseEnter={resetImage} target="_blank">
                <div className={styles.cardVariant}>
                  {good.main_image ? (
                    <Image
                      {...getImageVariantProps(good.main_image.variants, 'extra_small')}
                      objectFit="contain"
                      alt={good.name}
                    />
                  ) : (
                    <Image src={PlaceholderImageSmall} objectFit="contain" alt="" unoptimized />
                  )}
                </div>
              </a>
            </Link>
            <CardProductVariants good={good} setCurrentImage={setCurrentImage} />
          </div>
          <div className={styles.cardContent}>
            <Link href={`/product/${good.slug}-${good.sku}`} passHref>
              <a className={styles.cardTitle} title={good.name} target="_blank">
                {good.name}
              </a>
            </Link>
            <div className={styles.cardPriceBlock}>
              <div className={styles.cardPrice}>{toNumberWithSpaces(good.price)} ₽</div>
              {good.list_price && (
                <>
                  <div className={`${styles.cardPrice} ${styles.cardPriceOld}`}>
                    {toNumberWithSpaces(good.list_price)}
                  </div>
                  <div className={styles.cardSale}>{Math.round((good.price / good.list_price) * 100 - 100)}%</div>
                </>
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
              {/* <div className={styles.cardFeatures}>
                {good.valuable_attributes?.map((feature) => (
                  <div className={styles.cardFeature} key={feature.attribute.id}>
                    <div className={styles.cardFeatureTitle}>{feature.attribute.name} :</div>
                    <div className={styles.cardFeatureValue}>{renderFeatureValue(feature)}</div>
                  </div>
                ))}
              </div> */}
              <div className={styles.cardCart}>
                {good.is_available ? (
                  <Button icon="Cart" text="В корзину" onClick={addToCartHandler} />
                ) : (
                  <div className={styles.cardStock}>
                    <Icon name={'Cross'} /> Нет в наличии
                  </div>
                )}
              </div>
              <div className={styles.cardProvider}>{good.merchant.brand}</div>
            </div>
          </div>
          {isExpress && (
            <div className={styles.labelMobile}>
              <div className={styles.cardLabel}>Экспресс-доставка</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { GoodsCard };
