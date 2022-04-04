import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICategory } from '../../../src/models/ICategory';
import PlaceholderImage from 'assets/images/placeholder_small.png';
import { getImageVariantProps } from 'assets/utils/images';

import styles from './styles.module.scss';

const getHref = (category: ICategory) => {
  let href = '/';
  if (category.ancestors && category.ancestors.length > 0) {
    href += `${category.ancestors[0]?.slug}_${category.ancestors[0]?.id}/`;
  }
  href += `${category.slug}_${category.id}`;
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
                      {...getImageVariantProps(
                        category.image.variants,
                        'small'
                      )}
                      objectFit="contain"
                      alt={category.name}
                    />
                  ) : (
                    <Image
                      src={PlaceholderImage}
                      objectFit="contain"
                      alt=""
                      unoptimized
                    />
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
