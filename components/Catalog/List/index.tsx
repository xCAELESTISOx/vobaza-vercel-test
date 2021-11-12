import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import tmpImg1 from './tmp/categ1.png';

const CatalogList: FC = () => {
  return (
    <nav className={styles.catalog}>
      {[...Array(20)].map((category) => (
        <Link key={category} href="/katalog/divany">
          <a className={styles.category}>
            <div className={styles.categoryImage}>
              <Image src={tmpImg1} alt="" />
            </div>
            <div className={styles.categoryTitle}>Диваны</div>
            <Icon className={styles.categoryIcon} name="SmallArrowUp" />
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default CatalogList;
