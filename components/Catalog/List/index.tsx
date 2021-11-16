import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

import tmpImg1 from './tmp/categ1.png';

type Props = {
  list?: any[];
};

const CatalogList: FC<Props> = ({ list = [...Array(20)] }) => {
  return (
    <nav className={styles.catalog}>
      {list.map((category, index) => (
        <Link key={'category' + index} href="/katalog/divany">
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
