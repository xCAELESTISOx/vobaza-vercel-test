import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';
import type { ICategory } from '../../../src/models/ICategory';
import PlaceholderImage from 'assets/images/placeholder_small.png';
import { getImageVariantProps } from 'assets/utils/images';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

type Props = {
  list: ICategory[];
};

const getHref = (category: ICategory) => {
  let href = '/';
  if (category.ancestors && category.ancestors.length > 0) {
    href += `${category.ancestors[0]?.slug}/`;
  }
  href += `${category.slug}`;
  return href;
};

const CatalogList: FC<Props> = ({ list }) => {
  return (
    <nav className={styles.catalog}>
      {list.map((category) => (
        <Link key={category.id} href={getHref(category)}>
          <a className={styles.category}>
            <div className={styles.categoryImage}>
              {category.image ? (
                <Image
                  {...getImageVariantProps(category.image.variants, 'small')}
                  objectFit="contain"
                  alt={category.name}
                />
              ) : (
                <Image
                  src={PlaceholderImage}
                  objectFit="contain"
                  alt={category.name}
                  unoptimized
                />
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
