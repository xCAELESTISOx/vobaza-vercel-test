import { useRouter } from 'next/router';
import styles from '../../styles/Catalog.module.scss';

import Breadcrumbs, {
  BreadcrumbType,
} from '../../components/Layout/Breadcrumbs';
import CatalogList from '../../components/Catalog/List';
import GoodsBlock from '../../components/Goods/Block';
import normalizeGoods from '../../assets/utils/normalizeGoods';
import { api } from '../../assets/api';
import { GetServerSideProps } from 'next';
import { CategoryStatus, ICategory } from '../../src/models/ICategory';
import { IGoodCard } from '../../src/models/IGood';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Каталог мебели',
    href: '/katalog',
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

  return (
    <div className={styles.homePage}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className={styles.bannersBlock}>
        <div className="container">
          <h1 className={styles.sectionTitle}>
            Каталог мебели {page && ` – страница ${page}`}
          </h1>
          {categories && categories.length > 0 && (
            <CatalogList list={categories} />
          )}
          <GoodsBlock goods={goods} meta={meta} />
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  let goods = null;
  let meta = null;
  let categories = null;

  const { page } = query;

  try {
    const params = {
      limit,
      offset: page ? (Number(page) - 1) * limit : 0,
      format: 'PUBLIC_LIST',
    };

    const [goodsRes, categoryRes] = await Promise.all([
      api.getGoods(params),
      api.getRootCategories(),
    ]);

    goods = normalizeGoods(goodsRes.data.data);
    meta = goodsRes.data.meta;
    categories = categoryRes.data.data;
    categories = categories.filter(
      (category) => category.status === CategoryStatus.ACTIVE
    );
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      categories,
      goods,
      meta,
    },
  };
};
