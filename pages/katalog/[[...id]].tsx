import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import normalizeGoods from '../../shared/lib/normalizers/normalizeGoods';
import type { IGoodCard } from '../../entities/products/model/IGood';
import type { ICategory } from '../../entities/categories/model/ICategory';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import CatalogList from '../../components/Catalog/List';
import { GoodsBlock } from '../../templates/GoodsBlock';

import styles from 'app/styles/Home.module.scss';
import { api } from '../../app/api';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Каталог мебели',
    href: '/katalog',
  },
];
const breadcrumbsExpress: BreadcrumbType[] = [
  {
    title: 'Экспресс-доставка',
    href: '/katalog/ekspress-dostavka',
  },
];

const limit = 40;

interface Props {
  categories: ICategory[];
  goods: IGoodCard[];
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  };
}

export default function Catalog({ categories, goods, meta }) {
  const router = useRouter();
  const { page } = router.query as { [key: string]: string };

  const isExpress = router.asPath.indexOf('/ekspress-dostavka') !== -1;

  return (
    <div className={styles.page}>
      <Breadcrumbs breadcrumbs={isExpress ? breadcrumbsExpress : breadcrumbs} />
      <section className={styles.bannersBlock}>
        <div className="container">
          <h1 className={styles.sectionTitle}>
            {isExpress ? 'Экспресс-доставка' : 'Каталог мебели'} {page && ` – страница ${page}`}
          </h1>
          {categories && categories.length > 0 && <CatalogList list={categories} />}
          <GoodsBlock isExpress={isExpress} goods={goods} meta={meta} />
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, resolvedUrl }) => {
  let goods = null;
  let meta = null;
  let categories = null;
  const isExpress = resolvedUrl.indexOf('/ekspress-dostavka') !== -1;

  const { page, sort } = query;

  try {
    const params = {
      limit,
      offset: page ? (Number(page) - 1) * limit : 0,
      format: 'PUBLIC_LIST',
      sort: sort || undefined,
      ...(isExpress && { 'filter[label]': 'EXPRESS-DELIVERY' }),
    };

    const [goodsRes, categoryRes] = await Promise.all([api.getGoods(params), api.getRootCategories()]);

    goods = normalizeGoods(goodsRes.data.data);
    meta = goodsRes.data.meta;
    categories = categoryRes.data.data;
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      isExpress,
      categories,
      goods,
      meta,
    },
  };
};
