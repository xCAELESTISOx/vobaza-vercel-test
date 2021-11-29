import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import SimpleReactLightbox from 'simple-react-lightbox';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Button } from '@nebo-team/vobaza.ui.button';
import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select';
import Breadcrumbs from '../../components/Layout/Breadcrumbs';
import { SelectTabs } from '../../components/UI/SelectTabs';
import { ImagesBlockMemo } from '../../components/DetailGoodPage/ImagesBlock';
import { ProductVariants } from '../../components/DetailGoodPage/ProductVariants';
import { ProductInfoAccordion } from '../../components/DetailGoodPage/ProductInfoAccordion';
import { ProductFeatures } from '../../components/DetailGoodPage/ProductFeatures';
import { ProductDescription } from '../../components/DetailGoodPage/ProductDescription';
import { ProductSeller } from '../../components/DetailGoodPage/ProductSeller';
import { ProductReviews } from '../../components/DetailGoodPage/ProductReviews';

import type { BreadcrumbType } from '../../components/Layout/Breadcrumbs';

import styles from './styles.module.scss';

import { product as mockProduct } from './mock';
import { RatingStars } from '../../components/UI/RatingStars';

interface props {}

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Каталог мебели',
    href: '/katalog',
  },
  {
    title: 'Диваны',
    href: '/katalog/divany',
  },
];

const badgesDict = {
  express_delivery: 'Экспресс-доставка',
  hit: 'Хит',
  bestseller: 'Бестселлер',
};

const DetailGoodPage = ({}) => {
  const [selectedColorVariant, setSelectedColorVariant] = useState<any>(
    mockProduct.variants[0]
  );

  const [selectedOptions, setSelectedOptions] = useState<any>({});

  useEffect(() => {
    const options = {};
    mockProduct.options.forEach((t) => {
      options[t.id] = t.variants[0];
    });

    setSelectedOptions(options);
  }, []);

  const handelSelectOption = (name, e) => {
    const options = { ...selectedOptions };

    options[name] = e;

    setSelectedOptions(options);
  };

  const renderOptions = () => {
    return mockProduct.options.map((option) => (
      <div className={styles.productOption} key={option.id}>
        {option.variants.length > 5 ? (
          <InputSelect
            name={option.id}
            label={option.label}
            currentValue={selectedOptions[option.id]}
            variants={option.variants}
            onChange={(e) => handelSelectOption(option.id, e)}
          />
        ) : (
          <SelectTabs
            label={option.label}
            value={selectedOptions[option.id]}
            variants={option.variants.map((v) => ({
              code: v.code,
              text: v.value,
            }))}
            onChange={(e) => handelSelectOption(option.id, e)}
          />
        )}
      </div>
    ));
  };

  return (
    <SimpleReactLightbox>
      <div className={styles.homePage}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="container">
          <div className={styles.goodInfo}>
            <div className={styles.left}>
              <div className={styles.leftContent}>
                <div className={styles.leftMenu}>
                  <div className={styles.leftMenuItem}>
                    <RatingStars
                      size="Small"
                      value={mockProduct.reviews.average_score}
                    />
                    <div className={styles.productReviews}>
                      {mockProduct.reviews.count} отзывов
                    </div>
                  </div>
                  <div className={styles.leftMenuItem}>
                    <button className={styles.leftMenuActionBtn}>
                      <Icon name="Favorite" /> В избранное
                    </button>
                  </div>
                  <div className={styles.leftMenuItem}>
                    <button className={styles.leftMenuActionBtn}>
                      <Icon name="Compare" /> Сравнить
                    </button>
                  </div>
                  {mockProduct.info_badges.map((badge) => (
                    <div
                      key={badge}
                      className={`${styles.leftMenuBadge} ${styles[badge]}`}
                    >
                      {badgesDict[badge]}
                    </div>
                  ))}
                </div>

                <ImagesBlockMemo items={mockProduct.images} />

                <ProductSeller />
              </div>
            </div>

            <div className={styles.right}>
              <h1 className={styles.productTitle}>{mockProduct.title}</h1>
              <div className={styles.productSubinfo}>
                {mockProduct.subinfo && <>{mockProduct.subinfo} • </>}
                Артикул {mockProduct.article_number}
              </div>
              <div className={styles.productOptionList}>
                <div className={styles.productOption}>
                  <ProductVariants
                    items={mockProduct.variants}
                    selected={selectedColorVariant}
                    onChange={setSelectedColorVariant}
                  />
                </div>
                {renderOptions()}
              </div>

              <div className={styles.productInfoBlock}>
                <div className={styles.productPriceInfo}>
                  <div className={styles.productPriceActual}>
                    {mockProduct.price_with_discount} ₽
                  </div>
                  <div className={styles.productPriceOld}>
                    {mockProduct.price} ₽
                  </div>
                  <div className={styles.productDiscount}>
                    <span>-{mockProduct.discount}%</span>
                  </div>
                </div>

                <div className={styles.productStockInfo}>
                  <div className={styles.productStock}>
                    {mockProduct.in_stock ? (
                      <>
                        <Icon
                          className={styles.productInStock}
                          name="Checkmark"
                        />{' '}
                        В наличии
                      </>
                    ) : (
                      <>
                        <Icon className={styles.productOutStock} name="Cross" />{' '}
                        Закончился
                      </>
                    )}
                  </div>
                  {!!mockProduct.loyalty_bonus && (
                    <div className={styles.productLoyalty}>
                      <Icon
                        className={styles.productOutStock}
                        name="SmallLogo"
                      />{' '}
                      <Link href="#">
                        <a className={styles.productLoyaltyLink}>
                          {mockProduct.loyalty_bonus} вобаллов за покупку
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.productOrderBtns}>
                <Button text="В корзинку" icon="Cart" size="big" />
                <Button text="Заказать в 1 клик" variation="dashed" />
              </div>

              <div className={styles.productCredit}>
                <span className={styles.productCreditPayment}>
                  Кредит от <span>{mockProduct.credit.payment}</span> ₽/мес
                </span>
                <Button text="Оформить в кредит онлайн" variation="dashed" />
              </div>

              <div className={styles.productDelivery}>
                <h3 className={styles.productDeliveryTitle}>Доставит ВоБаза</h3>

                <div className={styles.productDeliveryItem}>
                  <Link href="#">
                    <a className={styles.productDeliveryItemType}>Самовывоз</a>
                  </Link>
                  {` из ${mockProduct.pickup.places_count} пункта ВоБаза с ${mockProduct.pickup.nearest_date}`}
                </div>

                {mockProduct.delivery.default && (
                  <div className={styles.productDeliveryItem}>
                    <Link href="#">
                      <a className={styles.productDeliveryItemType}>Доставка</a>
                    </Link>
                    {` от ${mockProduct.delivery.default.start_price} рублей с ${mockProduct.delivery.default.nearest_date}`}
                  </div>
                )}

                {mockProduct.delivery.default && (
                  <div className={styles.productDeliveryItem}>
                    <Link href="#">
                      <a className={styles.productDeliveryItemType}>
                        Экспресс-доставка
                      </a>
                    </Link>
                    {` от ${mockProduct.delivery.express.start_price} рублей с ${mockProduct.delivery.express.nearest_date}`}
                  </div>
                )}
              </div>

              <div className={styles.productAccordionBlock}>
                <ProductInfoAccordion title="Описание" autoDuration>
                  <ProductDescription html={mockProduct.description} />
                </ProductInfoAccordion>
              </div>

              <div className={styles.productAccordionBlock}>
                <ProductInfoAccordion
                  title="Характеристики и размеры"
                  autoDuration
                >
                  <ProductFeatures items={mockProduct.features} />
                </ProductInfoAccordion>
              </div>
            </div>
          </div>

          <ProductReviews
            reviewsInfo={mockProduct.reviews}
            productInfo={{
              id: mockProduct.id,
              title: mockProduct.title,
              articleNumber: mockProduct.article_number,
              price: mockProduct.price_with_discount,
              img: mockProduct.images[0] || '',
            }}
          />
        </div>
      </div>
    </SimpleReactLightbox>
  );
};

export default DetailGoodPage;
