import React, { FC, useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getFullProductProps, getProductInitialOptions } from 'entities/products';
import { useFavorite } from '../../../shared/lib/hooks/useFavorite';
import { mockProduct } from '../../../src/mock/detailProductPage';
import { useCart } from '../../../shared/lib/hooks/useCart';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { setOneClickGood } from 'src/store/goods';
import { metric } from 'features/metric';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { IGood, IProductVariant, IVariantProduct } from 'entities/products';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import { ProductImages } from 'components/DetailGoodPage/ProductImages';
import { ProductInfoAccordion } from 'components/DetailGoodPage/ProductInfoAccordion';
import { ProductAttributes } from 'components/DetailGoodPage/ProductAttributes';
import { ProductDescription } from 'components/DetailGoodPage/ProductDescription';
import { ProductSeller } from 'components/DetailGoodPage/ProductSeller';
import { ProductBadges } from 'components/DetailGoodPage/ProductBadges';
import { ProductPrice } from 'components/DetailGoodPage/ProductPrice';
import { ProductStock } from 'components/DetailGoodPage/ProductStock';
import { ProductDelivery } from 'components/DetailGoodPage/ProductDelivery';
import { ProductDocuments } from 'components/DetailGoodPage/ProductDocuments';
import { ProductCompare } from 'components/DetailGoodPage/ProductCompare';
import { ProductsList, CartModal, OneClickModal, ProductOptions } from 'widgets/products';
import { SelectVariationOption } from 'features/product-variation';

import styles from './styles.module.scss';

interface DetailGoodPage {
  product: IGood;
  options: IProductVariant<{ product: IVariantProduct; param: Variant }>[];
  breadcrumbs: BreadcrumbType[];
}

const DetailGoodPage: FC<DetailGoodPage> = ({ product, options, breadcrumbs }) => {
  const { currentFavorite, toggleFavorite } = useFavorite(product);

  const [selectedOptions, setSelectedOptions] = useState<Record<number, (string | number)[]>>(null);
  const { addToCart } = useCart(product);
  const dispatch = useDispatch();
  const router = useRouter();

  const addToCartHandler = () => {
    addToCart();
    metric.addProduct(product, product.main_category.slug);
  };

  const handelSelectOption: SelectVariationOption = (id, variantProduct) => {
    const options = { ...selectedOptions };
    options[id] = variantProduct.attributes.find((attr) => attr.id == id)?.value;

    // ?????????????????????? ????????????, ???????????????????????????????? ?????????????????? ???????????? ????????????????
    const { slug } = variantProduct;

    router.push(`/product/${slug}`, undefined, { scroll: false });

    setSelectedOptions(options);
  };

  const openOneClickModal = () => dispatch(setOneClickGood(product));

  useEffect(() => {
    metric.detail(product);
  }, []);

  useEffect(() => {
    setSelectedOptions(getProductInitialOptions(product.variants, product.id));
  }, [product.id]);

  return (
    <>
      <Head>
        <meta name="keywords" content={product.seo.keywords} />
        {product.seo.title && <title>{product.seo.title}</title>}
      </Head>
      <div className={styles.page}>
        <CartModal />
        <OneClickModal />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="container">
          <div className={styles.productInfo}>
            <div className={styles.productMobileCardHeader}>
              <ProductBadges badges={product.labels} />

              <h1 className={styles.productTitle}>
                {product.seo.page_name || product.name}{' '}
                <span className={styles.productSubinfo}>??????????????&nbsp;{product.sku}</span>
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
                      <Icon name="Favorite" /> <span>{currentFavorite ? '?? ??????????????????' : '?? ??????????????????'}</span>
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
                  {product.subinfo && <>{product.subinfo} ??? </>}
                  ??????????????&nbsp;{product.sku}
                </div>
              </div>

              {selectedOptions && (
                <div className={styles.productOptionList}>
                  <ProductOptions
                    currentProductId={product.id}
                    options={options}
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
                </div>
              </div>

              {product.inStonk && (
                <>
                  <div className={styles.productOrderBtns}>
                    <Button
                      text="?? ??????????????"
                      icon="Cart"
                      size="big"
                      onClick={addToCartHandler}
                      disabled={!product.price}
                    />
                    {!!product.price && (
                      <Button text="???????????????? ?? 1 ????????" variation="dashed" onClick={openOneClickModal} />
                    )}
                  </div>

                  <ProductDelivery className={styles.productInfoBlock} delivery={mockProduct.delivery} />

                  <ProductSeller className={styles.mobileVisible} />
                </>
              )}

              {(product.description_full || product.documents) && (
                <div className={styles.productAccordionBlock}>
                  <ProductInfoAccordion title="????????????????" autoDuration>
                    {product.description_full && <ProductDescription html={product.description_full} />}
                    {product.documents && <ProductDocuments documents={product.documents} />}
                  </ProductInfoAccordion>
                </div>
              )}

              {Boolean(product.attributes.additional?.length || product.attributes.main?.length) && (
                <div className={styles.productAccordionBlock}>
                  <ProductInfoAccordion title="???????????????????????????? ?? ??????????????" autoDuration>
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
              <h2 className={styles.productBlockTitle}>???????????? ???? ???????? ?????????? </h2>
              <ProductsList goods={product.set} />
            </div>
          )}
        </div>

        {/* FIXME: ?????????????????? ???????? ????????????????:
            "Hydration failed because the initial UI does not match what was rendered on the server" */}
        <div className="container container--for-cards">
          {product.similar_products && product.similar_products.length > 0 && (
            <div className={styles.productBlockList}>
              <h2 className={styles.productBlockTitle}>?????????????? ???????????? </h2>
              <ProductsList goods={product.similar_products} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<DetailGoodPage> = getFullProductProps;

export default DetailGoodPage;
