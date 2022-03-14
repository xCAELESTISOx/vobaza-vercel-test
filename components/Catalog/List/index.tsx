import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';
import { ICategory } from '../../../src/models/ICategory';

import { Icon } from '@nebo-team/vobaza.ui.icon';

type Props = {
  list: ICategory[];
};

const getHref = (category: ICategory) => {
  let href = '/';
  if (category.ancestors && category.ancestors.length > 0) {
    href += `${category.ancestors[0]?.slug}_${category.ancestors[0]?.id}/`;
  }
  href += `${category.slug}_${category.id}`;
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
                  src={
                    category.image.variants.small?.url ||
                    category.image.variants.original.url
                  }
                  width={
                    category.image.variants.small?.meta.width ||
                    category.image.variants.original.meta.width
                  }
                  height={
                    category.image.variants.small?.meta.height ||
                    category.image.variants.original.meta.width
                  }
                  objectFit="contain"
                  alt={category.name}
                />
              ) : (
                <Icon name="ImagePlaceholder" />
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
