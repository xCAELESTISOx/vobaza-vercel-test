import type { GetServerSideProps } from 'next';
import React, { FC, useEffect, useState } from 'react';
import SimpleReactLightbox from 'simple-react-lightbox';
import Head from 'next/head';

import { useCart } from '../../../src/hooks/useCart';
import { useGoods } from 'src/context/goods';
import { mockProduct } from '../../../src/mock/detailProductPage';
import { useFavorite } from '../../../src/hooks/useFavorite';
import { prepareProductAttributes } from 'assets/utils/Category/product';
import type { BreadcrumbType } from '../../../components/Layout/Breadcrumbs';
import type { IGood } from 'src/models/IGood';
import type { Variant as SelectVariant } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';
import type { Variant as TabsVariant } from 'components/UI/SelectTabs';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import Breadcrumbs from '../../../components/Layout/Breadcrumbs';
import { ProductImagesMemo } from '../../../components/DetailGoodPage/ProductImages';
import { ProductVariants } from '../../../components/DetailGoodPage/ProductVariants';
import { ProductInfoAccordion } from '../../../components/DetailGoodPage/ProductInfoAccordion';
import { ProductAttributes } from '../../../components/DetailGoodPage/ProductAttributes';
import { ProductDescription } from '../../../components/DetailGoodPage/ProductDescription';
import { ProductSeller } from '../../../components/DetailGoodPage/ProductSeller';
import { ProductBadges } from '../../../components/DetailGoodPage/ProductBadges';
import { ProductPrice } from '../../../components/DetailGoodPage/ProductPrice';
import { ProductStock } from '../../../components/DetailGoodPage/ProductStock';
import { ProductDelivery } from '../../../components/DetailGoodPage/ProductDelivery';
import CartModal from '../../../components/Goods/Modals/Cart/Cart';
import OneClick from 'components/Goods/Modals/OneClick/OneClick';
import { ProductDocuments } from 'components/DetailGoodPage/ProductDocuments';
import { ProductCompare } from 'components/DetailGoodPage/ProductCompare';
import { ProductOptions } from 'components/DetailGoodPage/ProductOptions';
import GoodsList from 'components/Goods/List';

import { api } from '../../../assets/api';

import styles from './styles.module.scss';

interface DetailGoodPage {
  product: IGood;
  breadcrumbs: BreadcrumbType[];
}

const getPrice = (price: number) => {
  return price / 100;
};

const normalizeProductInfo = (product) => {
  const normalizeProductRules = {
    price: getPrice,
    list_price: getPrice,
    labels: (labels) => labels.filter((l) => l.active).map((l) => l.code),
  };

  const computedFields = {
    creditMinimalPayment: (product) => {
      return Math.round(product.price / 12);
    },
    loyaltyBonus: (product) => {
      return Math.ceil(product.price * 0.1);
    },
    inStonk: (product) => {
      return product.quantity > 0;
    },
  };

  for (const fieldname in normalizeProductRules) {
    const normalizer = normalizeProductRules[fieldname];

    if (!!product[fieldname] || product[fieldname] === 0) product[fieldname] = normalizer(product[fieldname]);
  }

  for (const fieldname in computedFields) {
    const newFieldnameValue = computedFields[fieldname](product);
    product[fieldname] = newFieldnameValue;
  }
};

const DetailGoodPage: FC<DetailGoodPage> = ({ product, breadcrumbs }) => {
  const { currentFavorite, toggleFavorite } = useFavorite(product);
  const { addToCart } = useCart(product);
  const { dispatch } = useGoods();

  const addToCartHandler = () => {
    addToCart();
  };

  const [selectedOptions, setSelectedOptions] = useState<any | null>(null);

  const handelSelectOption = (name: string, value: SelectVariant | TabsVariant) => {
    const options = { ...selectedOptions };

    options[name] = value;

    setSelectedOptions(options);
  };

  const openOneClickModal = () => {
    dispatch({ type: 'setOneClickGood', payload: product });
  };

  useEffect(() => {
    const options = {};
    if (product.variants && product.variants.variants)
      product.variants.variants.forEach((t) => {
        const currentOption = t.values.find((v) => v.is_current);
        options[t.attribute.id] = {
          code: currentOption.value.toString(),
          value: currentOption.value.toString(),
        };
      });

    setSelectedOptions(options);
  }, [product.variants]);

  const attributes = prepareProductAttributes(product.attributes);

  return (
    <>
      <Head>
        <meta name="keywords" content={product.seo.keywords} />
        {product.seo.title && <title>{product.seo.title}</title>}
      </Head>
      <SimpleReactLightbox>
        <div className={styles.homePage}>
          <CartModal />
          <OneClick />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <div className="container">
            <div className={styles.productInfo}>
              <div className={styles.productMobileCardHeader}>
                <ProductBadges badges={product.labels} />

                <h1 className={styles.productTitle}>
                  {product.seo.page_name || product.name}{' '}
                  <span className={styles.productSubinfo}>Артикул&nbsp;{product.sku}</span>
                </h1>
              </div>

              <div className={styles.left}>
                <div className={styles.leftContent}>
                  <div className={styles.leftMenu}>
                    {/* <div className={styles.leftMenuItem}>
                    <RatingStars
                      size="Small"
                      value={mockProduct.reviews.average_score}
                    />
                    <div className={styles.productReviews}>
                      {mockProduct.reviews.count} отзывов
                    </div>
                  </div> */}
                    <div className={styles.leftMenuActions}>
                      <button
                        className={`${styles.leftMenuActionBtn} ${currentFavorite ? styles.active : ''}`}
                        onClick={toggleFavorite}
                      >
                        <Icon name="Favorite" /> <span>{currentFavorite ? 'В избранном' : 'В избранное'}</span>
                      </button>
                      <ProductCompare id={product.id} />
                    </div>

                    <ProductBadges className={styles.mobileHidden} badges={product.labels} />
                  </div>

                  <ProductImagesMemo images={product.images} />

                  <ProductSeller className={styles.mobileHidden} merchant={product.merchant} />
                </div>
              </div>

              <div className={styles.right}>
                <div className={`${styles.productCardHeader} ${styles.mobileHidden}`}>
                  <h1 className={styles.productTitle}>{product.seo.page_name || product.name}</h1>
                  <div className={styles.productSubinfo}>
                    {product.subinfo && <>{product.subinfo} • </>}
                    Артикул&nbsp;{product.sku}
                  </div>
                </div>

                {product.variants.variant_products?.length > 1 && (
                  <div className={styles.productOptionList}>
                    <div className={styles.productOption}>
                      <ProductVariants id={product.id} items={product.variants.variant_products} />
                    </div>
                    <ProductOptions
                      variants={product.variants}
                      selectedOptions={selectedOptions}
                      handelSelectOption={handelSelectOption}
                    />
                  </div>
                )}

                <div className={styles.productInfoBlock}>
                  <ProductPrice
                    className={styles.productInfoShort}
                    price={product.price}
                    list_price={product.list_price}
                    beforeDiscountPrice={product.list_price}
                  />

                  <div className={styles.productStockInfo}>
                    <ProductStock inStock={product.inStonk} />
                    {/* <ProductLoyaltyBonus value={product.loyaltyBonus} /> */}
                  </div>
                </div>

                {product.inStonk && (
                  <>
                    <div className={styles.productOrderBtns}>
                      <Button text="В корзину" icon="Cart" size="big" onClick={addToCartHandler} />
                      <Button text="Заказать в 1 клик" variation="dashed" onClick={openOneClickModal} />
                    </div>

                    {/* <ProductCredit
                    className={styles.productInfoBlock}
                    creditPayment={product.creditMinimalPayment}
                  /> */}

                    <ProductDelivery
                      className={styles.productInfoBlock}
                      // pickup={mockProduct.pickup}
                      delivery={mockProduct.delivery}
                    />

                    <ProductSeller className={styles.mobileVisible} />
                  </>
                )}

                {(product.description_full || product.documents) && (
                  <div className={styles.productAccordionBlock}>
                    <ProductInfoAccordion title="Описание" autoDuration>
                      {product.description_full && <ProductDescription html={product.description_full} />}
                      {product.documents && <ProductDocuments documents={product.documents} />}
                    </ProductInfoAccordion>
                  </div>
                )}

                {(!!attributes.additional?.length || !!attributes.main?.length) && (
                  <div className={styles.productAccordionBlock}>
                    <ProductInfoAccordion title="Характеристики и размеры" autoDuration>
                      <ProductAttributes attributes={attributes} />
                    </ProductInfoAccordion>
                  </div>
                )}
              </div>
            </div>

            {/* <ProductReviews
            reviewsInfo={mockProduct.reviews}
            productInfo={{
              id: product.id,
              title: product.name,
              articleNumber: product.sku,
              price: product.price,
              image: product.images
                ? getImageVariantByFieldname(product.images[0], 'small')
                : null,
            }}
          /> */}

            <br />
            <br />
            <br />

            {product.set && product.set.length > 0 && (
              <div className={styles.productBlockList}>
                <h2 className={styles.productBlockTitle}>Товары из этой серии </h2>
                <GoodsList goods={product.set} />
              </div>
            )}
            {product.similar_products && product.similar_products.length > 0 && (
              <div className={styles.productBlockList}>
                <h2 className={styles.productBlockTitle}>Похожие товары </h2>
                <GoodsList goods={product.similar_products} />
              </div>
            )}
          </div>
        </div>
      </SimpleReactLightbox>
    </>
  );
};

const getProductSlug = (slug: string): string | null => {
  const parseSlug = slug.replace('/ekspress-dostavka', '').split('-')[0];

  return parseSlug || null;
};

export const getServerSideProps: GetServerSideProps<DetailGoodPage> = async ({ query }) => {
  const slug = getProductSlug(query.slug as string);
  const breadcrumbs = [
    {
      title: 'Каталог мебели',
      href: '/katalog',
    },
  ] as BreadcrumbType[];

  try {
    const productRes = await api.getGoodBySlug(slug);
    const product = productRes.data.data;

    const attributesRes = await api.getGoodAttributes(product.id);
    normalizeProductInfo(product);

    product.attributes = attributesRes.data.data;

    breadcrumbs.push({
      title: product.main_category.name,
      href: `/${product.main_category.slug}`,
      clickableLast: true,
    });

    return {
      props: {
        product,
        breadcrumbs,
      },
    };
  } catch (err) {
    console.error(err);
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export default DetailGoodPage;
