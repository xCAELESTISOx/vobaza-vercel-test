import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICategory } from '../../../entities/categories/model/ICategory';
import PlaceholderImage from 'assets/images/placeholder_small.png';
import { getImageVariantProps } from 'shared/lib/images';

import styles from './styles.module.scss';

const getHref = (category: ICategory) => {
  let href = '/';
  if (category.ancestors && category.ancestors.length > 0) {
    href += `${category.ancestors[0]?.slug}/`;
  }
  href += `${category.slug}`;
  return href;
};

type Props = {
  categories: ICategory[];
};

const CategoriesList: FC<Props> = ({ categories }) => {
  return (
    <div className="container">
      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <Link key={category.id} href={getHref(category)}>
            <a className={styles.category}>
              <div className={styles.categoryContent}>
                <div className={styles.categoryImage}>
                  {category.image ? (
                    <Image
                      {...getImageVariantProps(category.image.variants, 'small')}
                      objectFit="contain"
                      alt={category.name}
                      width="100%"
                    />
                  ) : (
                    <Image src={PlaceholderImage} objectFit="contain" alt="" unoptimized width="100%" />
                  )}
                </div>
                <div className={styles.categoryTitle}>{category.name}</div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
