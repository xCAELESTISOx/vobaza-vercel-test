import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICategory } from '../../../src/models/ICategory';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

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
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
