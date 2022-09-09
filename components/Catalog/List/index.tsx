import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { ICategory } from '../../../src/models/ICategory';
import { getImageVariantProps } from 'assets/utils/images';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

type Props = {
  list: ICategory[];
};

const getHref = (routerPath: string, category: ICategory) => {
  const index = routerPath.indexOf('?');
  if (!category.ancestors?.length) return '/' + category.slug;
  const path = index > -1 ? routerPath.slice(0, index) : routerPath;
  return path + '/' + category.slug;
};

const CatalogList: FC<Props> = ({ list }) => {
  const [categoryiesList, setCategoryiesList] = useState(list);

  useEffect(() => {
    setCategoryiesList(list);
  }, [list]);

  const router = useRouter();

  return (
    <nav className={styles.catalog}>
      {categoryiesList.map((category) => (
        <Link key={category.id} href={getHref(router.asPath, category)}>
          <a className={styles.category}>
            <div className={styles.categoryImage}>
              {category.image ? (
                <Image
                  {...getImageVariantProps(category.image.variants, 'small')}
                  objectFit="contain"
                  alt={category.name}
                />
              ) : (
                <Image src={PlaceholderImage} objectFit="contain" alt={category.name} unoptimized />
              )}
            </div>
            <div className={styles.categoryTitle}>{category.name}</div>
            <Icon className={styles.categoryIcon} name="SmallArrowUp" />
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default CatalogList;
