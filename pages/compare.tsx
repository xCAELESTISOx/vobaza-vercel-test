import styles from '../styles/Home.module.scss';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import CompareList from '../components/Compare/List';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Сравнение характеристик',
    href: '/compare',
  },
];

export default function Compare() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container">
        <h1 className={styles.sectionTitle}>Сравнить</h1>
        <CompareList />
      </div>
    </div>
  );
}
