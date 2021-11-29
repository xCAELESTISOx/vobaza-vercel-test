import { FC, Fragment } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';

export type BreadcrumbType = {
  title: string;
  href: string;
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
            <Link key={'123' + breadcrumb.title} href={breadcrumb.href}>
              <a className={styles.breadcrumb}>{breadcrumb.title}</a>
            </Link>
          </Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
