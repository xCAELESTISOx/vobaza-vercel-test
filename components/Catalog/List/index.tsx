import { FC, useEffect, useState } from 'react';
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
  let href = '';
  category.ancestors?.forEach((ancestor) => {
    href += `/${ancestor.slug}`;
  });
  href += `/${category.slug}`;
  return href;
};

// Анцесторы приходят в обратном порядке, поэтому нам нужно их реверсить
const normalizeCategories = (categories: ICategory[]) => {
  const newCategories = categories.map((category) => {
    const newAncestors = category.ancestors.slice().reverse();
    return { ...category, ancestors: newAncestors };
  });

  return newCategories;
};

const CatalogList: FC<Props> = ({ list }) => {
  const [categoryiesList, setCategoryiesList] = useState(normalizeCategories(list));

  useEffect(() => {
    setCategoryiesList(normalizeCategories(list));
  }, [list]);

  return (
    <nav className={styles.catalog}>
      {categoryiesList.map((category) => (
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
