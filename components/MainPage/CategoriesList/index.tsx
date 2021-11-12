import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import tmpImg1 from './tmp/categ1.png';
import tmpImg2 from './tmp/categ2.png';
import tmpImg3 from './tmp/categ3.png';
import tmpImg4 from './tmp/categ4.png';
import tmpImg5 from './tmp/categ5.png';

const categories = [
  {
    title: 'Диваны',
    href: '/katalog/divany',
    image: tmpImg1,
  },
  {
    title: 'Кресла',
    href: '/katalog/kresla',
    image: tmpImg2,
  },
  {
    title: 'Кровати',
    href: '/katalog/krovati',
    image: tmpImg3,
  },
  {
    title: 'Шкафы',
    href: '/katalog/shkafy',
    image: tmpImg4,
  },
  {
    title: 'Диваны',
    href: '/katalog/divany',
    image: tmpImg1,
  },
  {
    title: 'Кресла',
    href: '/katalog/kresla',
    image: tmpImg2,
  },
  {
    title: 'Кровати',
    href: '/katalog/krovati',
    image: tmpImg3,
  },
  {
    title: 'Шкафы',
    href: '/katalog/shkafy',
    image: tmpImg4,
  },
  // {
  //   title: 'Стенки в гостиную',
  //   href: '/stenki',
  //   image: tmpImg5,
  // },
];

const CategoriesList: FC = () => {
  return (
    <div className="container">
      <div className={styles.categoriesList}>
        {categories.map((category, index) => (
          <Link key={category.title + index} href={category.href}>
            <a className={styles.category}>
              <div className={styles.categoryContent}>
                <div className={styles.categoryImage}>
                  <Image
                    className={styles.categoryImage}
                    src={category.image}
                    alt={category.title}
                  />
                </div>
                <div className={styles.categoryTitle}>{category.title}</div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
