import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import { api } from '../../../assets/api';

import SimpleReactLightbox from 'simple-react-lightbox';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Button } from '@nebo-team/vobaza.ui.button';
import { InputSelect } from '@nebo-team/vobaza.ui.inputs.input-select';
import Breadcrumbs from '../../../components/Layout/Breadcrumbs';
import { SelectTabs } from '../../../components/UI/SelectTabs';
import { ProductImagesMemo } from '../../../components/DetailGoodPage/ProductImages';
import { ProductVariants } from '../../../components/DetailGoodPage/ProductVariants';
import { ProductInfoAccordion } from '../../../components/DetailGoodPage/ProductInfoAccordion';
import { ProductAttributes } from '../../../components/DetailGoodPage/ProductAttributes';
import { ProductDescription } from '../../../components/DetailGoodPage/ProductDescription';
import { ProductSeller } from '../../../components/DetailGoodPage/ProductSeller';
import { ProductReviews } from '../../../components/DetailGoodPage/ProductReviews';
import { ProductBadges } from '../../../components/DetailGoodPage/ProductBadges';
import { RatingStars } from '../../../components/UI/RatingStars';
import { ProductPrice } from '../../../components/DetailGoodPage/ProductPrice';
import { ProductStock } from '../../../components/DetailGoodPage/ProductStock';
import { ProductLoyaltyBonus } from '../../../components/DetailGoodPage/ProductLoyaltyBonus';
import { ProductCredit } from '../../../components/DetailGoodPage/ProductCredit';
import { ProductDelivery } from '../../../components/DetailGoodPage/ProductDelivery';

import type { BreadcrumbType } from '../../../components/Layout/Breadcrumbs';
import type { GetServerSideProps } from 'next';

import styles from './styles.module.scss';

import { mockProduct } from '../../../src/mock/detailProductPage';
import { useFavorite } from '../../../src/hooks/useFavorite';
import { getImageVariantByFieldname } from '../../../assets/utils/images';

interface DetailGoodPage {
  product: any;
}

const getBreadcrumbs = (): BreadcrumbType[] => [
  {
    title: 'Каталог мебели',
    href: '/katalog',
  },
];

const getPrice = (price: number) => {
  return price / 100;
};

const normalizeProductInfo = (product) => {
  const normalizeProductRules = {
    price: getPrice,
    discount_price: getPrice,
    labels: (labels) => labels.filter((l) => l.active).map((l) => l.code),
  };

  const computedFields = {
    discount: (product) =>
      Math.round((product.discount_price / product.price) * 100 - 100),
    creditMinimalPayment: (product) => {
      const currentPrice = product.discount_price || product.price;
      return Math.round(currentPrice / 12);
    },
    loyaltyBonus: (product) => {
      const currentPrice = product.discount_price || product.price;
      return Math.ceil(currentPrice * 0.1);
    },
    inStonk: (product) => {
      return product.quantity > 0;
    },
  };

  for (const fieldname in normalizeProductRules) {
    const normalizer = normalizeProductRules[fieldname];

    if (!!product[fieldname] || product[fieldname] === 0)
      product[fieldname] = normalizer(product[fieldname]);
  }

  for (const fieldname in computedFields) {
    const newFieldnameValue = computedFields[fieldname](product);
    product[fieldname] = newFieldnameValue;
  }
};

const DetailGoodPage: FC<DetailGoodPage> = ({ product }) => {
  const { currentFavorite, toggleFavorite } = useFavorite(product);
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

  const breadcrumbs = getBreadcrumbs();
  breadcrumbs.push({
    title: product.main_category.name,
    href: `/${product.main_category.slug}`,
  });

  return (
    <SimpleReactLightbox>
      <div className={styles.homePage}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="container">
          <div className={styles.productInfo}>
            <div className={styles.productMobileCardHeader}>
              <ProductBadges badges={product.labels} />

              <h1 className={styles.productTitle}>
                {product.name}{' '}
                <span className={styles.productSubinfo}>
                  Артикул&nbsp;{product.sku}
                </span>
              </h1>
            </div>

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
                  <div className={styles.leftMenuActions}>
                    <button
                      className={`${styles.leftMenuActionBtn} ${
                        currentFavorite ? styles.active : ''
                      }`}
                      onClick={toggleFavorite}
                    >
                      <Icon name="Favorite" />{' '}
                      <span>
                        {currentFavorite ? 'Из избранного' : 'В избранное'}
                      </span>
                    </button>
                    <button className={styles.leftMenuActionBtn}>
                      <Icon name="Compare" /> <span>Сравнить</span>
                    </button>
                  </div>

                  <ProductBadges
                    className={styles.mobileHidden}
                    badges={product.labels}
                  />
                </div>

                <ProductImagesMemo images={product.images} />

                <ProductSeller
                  className={styles.mobileHidden}
                  merchant={product.merchant}
                />
              </div>
            </div>

            <div className={styles.right}>
              <div
                className={`${styles.productCardHeader} ${styles.mobileHidden}`}
              >
                <h1 className={styles.productTitle}>{product.name}</h1>
                <div className={styles.productSubinfo}>
                  {product.subinfo && <>{product.subinfo} • </>}
                  Артикул&nbsp;{product.sku}
                </div>
              </div>

              {/* <div className={styles.productOptionList}>
                <div className={styles.productOption}>
                  <ProductVariants
                    items={mockProduct.variants}
                    selected={selectedColorVariant}
                    onChange={setSelectedColorVariant}
                  />
                </div>
                {renderOptions()}
              </div> */}

              <div className={styles.productInfoBlock}>
                <ProductPrice
                  className={styles.productInfoShort}
                  price={product.price}
                  discountPrice={product.discount_price}
                  discount={product.discount}
                />

                <div className={styles.productStockInfo}>
                  <ProductStock inStock={product.inStonk} />
                  <ProductLoyaltyBonus value={product.loyaltyBonus} />
                </div>
              </div>

              <div className={styles.productOrderBtns}>
                <Button text="В корзину" icon="Cart" size="big" />
                <Button text="Заказать в 1 клик" variation="dashed" />
              </div>

              <ProductCredit
                className={styles.productInfoBlock}
                creditPayment={product.creditMinimalPayment}
              />

              <ProductDelivery
                className={styles.productInfoBlock}
                pickup={mockProduct.pickup}
                delivery={mockProduct.delivery}
              />

              <ProductSeller className={styles.mobileVisible} />

              {product.description_full && (
                <div className={styles.productAccordionBlock}>
                  <ProductInfoAccordion title="Описание" autoDuration>
                    <ProductDescription html={product.description_full} />
                  </ProductInfoAccordion>
                </div>
              )}

              <div className={styles.productAccordionBlock}>
                <ProductInfoAccordion
                  title="Характеристики и размеры"
                  autoDuration
                >
                  <ProductAttributes attributes={product.attributes} />
                </ProductInfoAccordion>
              </div>
            </div>
          </div>

          <ProductReviews
            reviewsInfo={mockProduct.reviews}
            productInfo={{
              id: product.id,
              title: product.name,
              articleNumber: product.sku,
              price: product.discount_price || product.price,
              image: product.images
                ? getImageVariantByFieldname(product.images[0], 'small')
                : null,
            }}
          />
        </div>
      </div>
    </SimpleReactLightbox>
  );
};

const getProductIdFromSlug = (slug: string) => {
  const parsedId = Number(slug.split('_').slice(-2, -1)[0]);

  return !isNaN(parsedId) ? parsedId : null;
};

export const getServerSideProps: GetServerSideProps<DetailGoodPage> = async ({
  query,
}) => {
  const productId = getProductIdFromSlug(query.slug as string);

  try {
    const [productRes, attributesRes] = await Promise.all([
      api.getGood(productId),
      api.getGoodAttributes(productId),
    ]);
    const product = productRes.data.data;
    normalizeProductInfo(productRes.data.data);

    product.attributes = attributesRes.data.data;

    return {
      props: {
        product: productRes.data.data,
      },
    };
  } catch (err) {}

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export default DetailGoodPage;
