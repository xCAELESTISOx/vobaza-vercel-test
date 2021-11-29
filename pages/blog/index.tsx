import { useRouter } from 'next/router';

import styles from '../../styles/Blog.module.scss';

import { Pagination } from '@nebo-team/vobaza.ui.pagination';
import Breadcrumbs, {
  BreadcrumbType,
} from '../../components/Layout/Breadcrumbs';
import BlogList from '../../components/Blog';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Блог',
    href: '/blog',
  },
];

export default function Blog() {
  const router = useRouter();
  const { page } = router.query as { [key: string]: string };

  const replaceRouterQuery = (
    updateQuery: { [key: string]: string | number },
    exclude: Array<string> = []
  ) => {
    const prevQuery = { ...router.query };

    if (exclude) {
      exclude.forEach((el) => delete prevQuery[el]);
    }

    router.replace({
      query: {
        ...prevQuery,
        ...updateQuery,
      },
    });
  };
  const onChangePagination = (value: number) => {
    replaceRouterQuery({ page: value });
  };

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container">
        <h1 className={styles.sectionTitle}>Блог</h1>
        <BlogList />
        <div className={styles.blogPagination}>
          <Pagination
            variation="secondary"
            pageCount={6}
            activePage={+page || 1}
            onChange={onChangePagination}
          />
        </div>
      </div>
    </div>
  );
}
