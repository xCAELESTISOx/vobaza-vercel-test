import { FC, Fragment } from 'react';
import Link from 'next/link';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import { parseTagTitle } from 'features/categories';

import styles from './styles.module.scss';

export type BreadcrumbType = {
  title: string;
  href: string;
  clickableLast?: boolean;
};

type Props = {
  breadcrumbs: BreadcrumbType[];
};

const Breadcrumbs: FC<Props> = ({ breadcrumbs }) => {
  return (
    <div className="container">
      <nav className={styles.breadcrumbs}>
        <Link href="/">
          <a className={styles.breadcrumb}>Главная</a>
        </Link>
        {breadcrumbs.map((breadcrumb: BreadcrumbType) => (
          <Fragment key={breadcrumb.title}>
            <div key={breadcrumb.title} className={styles.breadcrumbsSeparator}>
              <Icon name="SmallArrowRight" />
            </div>
            <Link key={'title' + breadcrumb.title} href={breadcrumb.href}>
              <a
                className={`${styles.breadcrumb} ${breadcrumb.clickableLast ? styles.clickable : ''}`}
                dangerouslySetInnerHTML={{ __html: parseTagTitle(breadcrumb.title) }}
              />
            </Link>
          </Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
