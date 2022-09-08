import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ICategory } from '../../../src/models/ICategory';
import { getImageVariantProps } from 'assets/utils/images';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import PlaceholderImage from 'assets/images/placeholder_small.png';

import styles from './styles.module.scss';

type Props = {
  list: ICategory[];
};

const getHref = (category: ICategory) => {
  const newAncestors = category.ancestors?.reduce(
    (acc, ancestor, i) => {
      if (ancestor.parent_id) {
        const index = acc.findIndex((item) => item.id === ancestor.parent_id);

        const newAcc = [...acc];

        if (index > -1 && !newAcc[i].slug.includes(newAcc[index].slug + '/')) {
          newAcc[i].slug = newAcc[index].slug + '/' + newAcc[i].slug + '/' + category.slug;
        }

        return newAcc;
      } else {
        return acc;
      }
    },
    [...category.ancestors]
  );

  if (!newAncestors) {
    return category.slug;
  } else {
    return newAncestors?.length > 1
      ? newAncestors.filter((item) => item.parent_id)[0].slug
      : newAncestors[0].slug + '/' + category.slug;
  }
};

const normalizeCategories = (categories: ICategory[]) => {
  const newCategories = categories.map((item) => ({ ...item, slug: `/${getHref(item)}` }));
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
        <Link key={category.id} href={category.slug}>
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
