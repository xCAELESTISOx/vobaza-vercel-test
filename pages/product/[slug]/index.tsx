import SimpleReactLightbox from 'simple-react-lightbox';
import React, { FC, useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { normalizeProductAttributes, normalizeProductInfo } from 'assets/utils/normalizers/normalizeGoods';
import { normalizeProductVariation } from 'assets/utils/normalizers/Products/normalizeProductVariation';
import { getProductBreadcrumbs } from 'assets/utils/Category/getCategoryBreadcrumps';
import { mockProduct } from '../../../src/mock/detailProductPage';
import { useFavorite } from '../../../src/hooks/useFavorite';
import { useCart } from '../../../src/hooks/useCart';
import { useDispatch } from 'src/hooks/useDispatch';
import { setOneClickGood } from 'src/store/goods';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select/dist/input-select';
import type { BreadcrumbType } from '../../../components/Layout/Breadcrumbs';
import type { IGood, ProductVariantValue } from 'src/models/IGood';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import Breadcrumbs from '../../../components/Layout/Breadcrumbs';
import { ProductImages } from '../../../components/DetailGoodPage/ProductImages';
import { ProductVariants } from '../../../components/features/product-variation/ProductVariants';
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
import { ProductOptions } from 'components/features/product-variation/ProductOptions';
import GoodsList from 'components/Goods/List';

import { api } from '../../../assets/api';
import styles from './styles.module.scss';

const booleanVariantToText = (value: ProductVariantValue) => {
  return typeof value === 'boolean' ? (value ? 'YES' : 'NO') : value.toString();
};

interface DetailGoodPage {
  product: IGood;
  breadcrumbs: BreadcrumbType[];
}

const getProductOptions = (variation: IGood['variants'], productId: number): Record<number, Variant> | null => {
  if (!variation?.variants) return null;
  const { products } = variation;
  const currentProduct = products.find(({ id }) => id === productId);
  const options = {};

  currentProduct.attributes.forEach((attribute) => {
    options[attribute.id] = {
      code: booleanVariantToText(attribute.value),
      value: booleanVariantToText(attribute.value),
    };
  });

  return options;
};

const DetailGoodPage: FC<DetailGoodPage> = ({ product, breadcrumbs }) => {
  const { currentFavorite, toggleFavorite } = useFavorite(product);

  const [selectedOptions, setSelectedOptions] = useState<Record<number, Variant>>(null);
  const { addToCart } = useCart(product);
  const dispatch = useDispatch();
  const router = useRouter();

  const productVariants = normalizeProductVariation(product.variants);

  const addToCartHandler = () => {
    addToCart();

    (window as any).dataLayer.push({
      ecommerce: {
        currencyCode: 'RUB',
        add: {
          products: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              brand: product.brand,
              category: product.main_category.slug,
            },
          ],
        },
      },
    });
  };

  const handelSelectOption = (name: string, value: Variant) => {
    const options = { ...selectedOptions };
    options[name] = value;

    const parameters = Object.values(options).map(({ code }) => code);

    // Определение товара, соответствующего выбранным опциям вариации
    const { slug, sku } = product.variants.products.find(({ attributes }) => {
      return attributes.every(
        (attr) =>
          Object.keys(options).includes(attr.id.toString()) &&
          parameters.includes(Array.isArray(attr.value) ? attr.value[0].toString() : attr.value.toString())
      );
    });

    router.push(`/product/${slug}-${sku}`);

    setSelectedOptions(options);
  };

  const openOneClickModal = () => {
    dispatch(setOneClickGood(product));
  };

  useEffect(() => {
    (window as any).dataLayer.push({
      ecommerce: {
        currencyCode: 'RUB',
        detail: {
          products: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              brand: product.brand,
              category: product?.main_category.slug,
            },
          ],
        },
      },
    });
  }, []);

  useEffect(() => {
    setSelectedOptions(getProductOptions(product.variants, product.id));
  }, [product.id]);

  return (
    <>
      <Head>
        <meta name="keywords" content={product.seo.keywords} />
        {product.seo.title && <title>{product.seo.title}</title>}
      </Head>
      <SimpleReactLightbox>
        <div className={styles.page}>
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

                  <ProductImages images={product.images} />
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

                {selectedOptions && selectedOptions && (
                  <div className={styles.productOptionList}>
                    <div className={styles.productOption}>
                      <ProductVariants
                        productId={product.id}
                        selectedOptions={selectedOptions}
                        productVariants={product.variants.products}
                        attributesVariants={product.variants.variants}
                      />
                    </div>
                    <ProductOptions
                      variants={productVariants}
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
                  </div>
                </div>

                {product.inStonk && (
                  <>
                    <div className={styles.productOrderBtns}>
                      <Button text="В корзину" icon="Cart" size="big" onClick={addToCartHandler} />
                      <Button text="Заказать в 1 клик" variation="dashed" onClick={openOneClickModal} />
                    </div>

                    <ProductDelivery className={styles.productInfoBlock} delivery={mockProduct.delivery} />

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

                {Boolean(product.attributes.additional?.length || product.attributes.main?.length) && (
                  <div className={styles.productAccordionBlock}>
                    <ProductInfoAccordion title="Характеристики и размеры" autoDuration>
                      <ProductAttributes attributes={product.attributes} />
                    </ProductInfoAccordion>
                  </div>
                )}
              </div>
            </div>

            <br />
            <br />
            <br />

            {product.set && product.set.length > 0 && (
              <div className={styles.productBlockList}>
                <h2 className={styles.productBlockTitle}>Товары из этой серии </h2>
                <GoodsList goods={product.set} />
              </div>
            )}
          </div>

          {/* FIXME: Компонент ниже вызывает:
              "Hydration failed because the initial UI does not match what was rendered on the server" */}
          <div className="container container--for-cards">
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

  try {
    const productRes = await api.getGoodBySlug(slug);

    let product = normalizeProductInfo(productRes.data.data);

    const attributesRes = await api.getGoodAttributes(product.id);

    const attributes = normalizeProductAttributes(attributesRes.data.data);

    product = { ...product, attributes };

    const category = await api.getCategoryBySlug(product.main_category.slug);
    const { ancestors } = category.data.data;

    const breadcrumbs = getProductBreadcrumbs(ancestors, product.main_category);

    return {
      props: {
        product,
        breadcrumbs,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default DetailGoodPage;
