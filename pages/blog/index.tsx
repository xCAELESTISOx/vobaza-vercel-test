import { useAdvancedRouter } from 'shared/lib/useAdvancedRouter';

import { Pagination } from '@nebo-team/vobaza.ui.pagination/dist';
import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import BlogList from '../../components/Blog';

import styles from 'app/styles/Blog.module.scss';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Блог',
    href: '/blog',
  },
];

export default function Blog() {
  const { router, replaceRouterQuery } = useAdvancedRouter();
  const { page } = router.query as { [key: string]: string };

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
          <Pagination variation="secondary" pageCount={1} activePage={+page || 1} onChange={onChangePagination} />
        </div>
      </div>
    </div>
  );
}
