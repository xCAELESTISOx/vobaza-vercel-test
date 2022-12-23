import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { ICategory } from 'entities/categories/model/ICategory';
import type { ITag } from 'entities/tags';

import tmpBannerImg1 from 'src/tmp/bannerFilter.jpg';
import tmpBannerImg2 from 'src/tmp/bannerFilterMob.jpg';
import expressBanner from 'assets/images/express-banner.jpg';
import expressBannerMobile from 'assets/images/express-banner_mobile.jpg';

import CatalogList from 'components/Catalog/List';

import styles from './styles.module.scss';

type Props = {
  isExpress: boolean;
  currentTag: ITag;
  category: ICategory;
  filtersTitle: string;
};

const CategoryHeader: FC<Props> = ({ isExpress, currentTag, category, filtersTitle }) => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <>
      <div className={styles.bannerBlockMobile}>
        <div className={!isExpress ? styles.displayNone : ''}>
          <Image src={expressBannerMobile} alt="Banner" />
        </div>
        <Link href={router.asPath.split('?')[0] + '/ekspress-dostavka'}>
          <a className={isExpress ? styles.displayNone : ''}>
            <Image src={tmpBannerImg2} alt="Banner" />
          </a>
        </Link>
      </div>
      <h1 className={styles.sectionTitle}>
        {filtersTitle || currentTag?.page_title || category.name} {page && page !== '1' && ` – страница ${page}`}  
      </h1>
      {category.children?.length > 0 && <CatalogList list={category.children} />}
      <div className={styles.bannerBlock}>
        <div className={!isExpress ? styles.displayNone : ''}>
          <Image src={expressBanner} priority alt="Banner" />
        </div>
        <Link href={router.asPath.split('?')[0] + '/ekspress-dostavka'}>
          <a className={isExpress ? styles.displayNone : ''}>
            <Image src={tmpBannerImg1} alt="Banner" />
          </a>
        </Link>
      </div>
    </>
  );
};

export { CategoryHeader };
