import { FC } from 'react';
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
          <div key={breadcrumb.title} className={styles.breadcrumbBlock}>
            <div className={styles.breadcrumbsSeparator}>
              <Icon name="SmallArrowRight" />
            </div>
            <Link href={breadcrumb.href}>
              <a className={styles.breadcrumb}>{breadcrumb.title}</a>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
