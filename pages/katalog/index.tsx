import { useRouter } from 'next/router';
import styles from '../../styles/Catalog.module.scss';

import Breadcrumbs, {
  BreadcrumbType,
} from '../../components/Layout/Breadcrumbs';
import CatalogList from '../../components/Catalog/List';
import GoodsBlock from '../../components/Goods/Block';
import FavoriteModal from '../../components/Goods/Modals/Favorite';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Каталог мебели',
    href: '/katalog',
  },
];

export default function Catalog() {
  const router = useRouter();
  const { page } = router.query as { [key: string]: string };

  return (
    <div className={styles.homePage}>
      <FavoriteModal />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className={styles.bannersBlock}>
        <div className="container">
          <h1 className={styles.sectionTitle}>
            Каталог мебели {page && ` – страница ${page}`}
          </h1>
          <CatalogList />
          {/* <GoodsBlock /> */}
        </div>
      </section>
    </div>
  );
}
