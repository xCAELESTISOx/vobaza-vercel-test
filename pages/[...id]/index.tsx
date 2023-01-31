import { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Head from 'next/head';

import type { ITag } from 'entities/tags';
import type { ICategory } from '../../entities/categories/model/ICategory';
import type { IFilter, IFilterFront, IFilterMeta } from '../../entities/filters/model/IFilter';

import { getCategoryBreadcrumps } from 'shared/lib/categories/getCategoryBreadcrumps';
import { getProductsList } from 'shared/lib/products/getProductsList';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { useSelector } from 'shared/lib/hooks/useSelector';
import { getCategoryProps } from 'entities/categories';

import Breadcrumbs from 'shared/ui/Breadcrumbs';

import { markTagsAsInvalid, resetTags, setCurrentTags, setTags } from 'src/store/tags';
import { setBaseFilters, setFilters, setCurrentFilters, markFiltersAsInvalid, resetFilters } from 'src/store/filters';

import { GoodsBlock } from '../../templates/GoodsBlock';
import { CategoryHeader } from 'widgets/categories';

import styles from 'app/styles/Home.module.scss';

export interface ICategoryProps {
  hasInvalidFilters: boolean;
  hasInvalidTags: boolean;
  category: ICategory;
  /** Доступные фильтры */
  filters: IFilter[];
  tags: ITag[];
  /** Базовые фильтры без учета примененных */
  baseFilters: IFilter[];
  currentTags: ITag[];
  /** Примененные фильтры */
  currentFilters: Record<number, IFilterFront> | null;
  params: Record<string, string | number | boolean | string[]>;
  filtersMeta: IFilterMeta;
}

export default function Catalog({
  hasInvalidFilters,
  hasInvalidTags,
  category,
  filters,
  tags,
  currentFilters,
  currentTags,
  baseFilters,
  params,
  filtersMeta,
}: ICategoryProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);

  const city = useSelector((state) => state.auth.city);
  const prevCity = Cookies.get('prevCity');
  const savedCity = Cookies.get('city') || '';

  const dispatch = useDispatch();
  const router = useRouter();

  const isExpress = router.asPath.includes('/ekspress-dostavka');
  const breadcrumbs = getCategoryBreadcrumps([...category.ancestors, category], currentTags, isExpress);
  const currentTag = currentTags[currentTags?.length - 1] || null;

  const index =
    currentTag?.robots
      ?.find((item) => item.toLocaleLowerCase() === 'index' || item.toLocaleLowerCase() === 'noindex')
      ?.toLocaleLowerCase() || 'index';

  const follow =
    currentTag?.robots
      ?.find((item) => item.toLocaleLowerCase() === 'follow' || item.toLocaleLowerCase() === 'nofollow')
      ?.toLocaleLowerCase() || 'follow';

  const currentTagRobots = `${index}, ${follow}`;

  const currentTagCanonical = currentTag?.canonical;

  const currentTagCanonicalLink = currentTagCanonical?.includes('vobaza.ru/')
    ? currentTagCanonical
    : currentTagCanonical?.[0] === '/'
    ? 'https://vobaza.ru' + currentTagCanonical
    : 'https://vobaza.ru/' + currentTagCanonical;

  const getProducts = async () => {
    setIsLoading(true);

    setProducts([]);

    const { products, meta, withError } = await getProductsList(params, currentTags);
    hasInvalidFilters = withError;

    setProducts(products);
    setMeta(meta);

    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(setTags(tags));
    dispatch(setCurrentTags(currentTags));
    if (hasInvalidTags) dispatch(markTagsAsInvalid());

    return () => {
      dispatch(resetTags());
    };
  }, [tags]);

  useEffect(() => {
    getProducts();
  }, [params]);

  useEffect(() => {
    // если prevCity есть, но он не идентичен городу(перешли на другую стр и поменяли город), то актуализируем
    if (prevCity && (city || savedCity) && prevCity !== (city || savedCity)) {
      Cookies.set('prevCity', city || savedCity);
    }
  }, []);

  useEffect(() => {
    // prevCity необходим для изменения сео при смене города

    // если нет куки - ставим
    if (!prevCity && (city || savedCity)) Cookies.set('prevCity', city || savedCity);

    if (prevCity && city && prevCity !== city && currentFilters) {
      Cookies.set('prevCity', city);

      router.reload();
    }
  }, [city]);

  useEffect(() => {
    dispatch(setBaseFilters(baseFilters));
    dispatch(setFilters(filters));
    dispatch(setCurrentFilters(currentFilters));

    if (hasInvalidFilters) dispatch(markFiltersAsInvalid());

    return () => {
      dispatch(resetFilters());
    };
  }, [filters]);

  return (
    <>
      <Head>
        {(filtersMeta.title || category.seo_title || currentTag?.title) && (
          <title>{currentTag?.title || filtersMeta.title || category.seo_title}</title>
        )}
        {(filtersMeta.keywords || category.keywords || currentTag?.keywords) && (
          <meta name="keywords" content={currentTag?.keywords || filtersMeta.keywords || category.keywords} />
        )}
        {(filtersMeta.description || category.seo_description || currentTag?.description) && (
          <meta
            name="description"
            content={currentTag?.description || filtersMeta.description || category.seo_description}
          />
        )}

        <meta name="robots" content={currentTagRobots} />

        {!!currentTagCanonical && <link rel="canonical" href={currentTagCanonicalLink} />}
      </Head>
      <div className={styles.page}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <section>
          <div className="container container--for-cards">
            <CategoryHeader
              category={category}
              currentTag={currentTag}
              isExpress={isExpress}
              filtersTitle={filtersMeta.h1}
            />
            <GoodsBlock
              withFilters={Boolean(filters)}
              categorySlug={category.slug}
              isExpress={isExpress}
              isListLoading={isLoading}
              goods={products}
              meta={meta}
            />
            {category.description && (
              <div className="seoText" dangerouslySetInnerHTML={{ __html: category.description }} />
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ICategoryProps> = getCategoryProps;
