import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import tmpImg1 from './tmp/collection1.jpg';
import tmpImg2 from './tmp/collection2.jpg';
import tmpImg3 from './tmp/collection3.jpg';
import tmpImg4 from './tmp/collection4.jpg';

const categories = [
  {
    title: 'Детские кровати-домики',
    href: '/krovati-domiki',
    image: tmpImg1,
  },
  {
    title: 'Прихожая «ФАН»',
    href: '/kollekcii/prihozhaya-fan',
    image: tmpImg2,
  },
  {
    title: 'Диваны «Бейкер 2»',
    description: 'Сочетание внешней строгости и комфортного отдыха',
    href: '/divany/model-beyker',
    image: tmpImg3,
  },
  {
    title: 'Модульная гостиная «Кельн»',
    description:
      'Оригинальная концепция · Практичность и эластичность · Продуманное хранение ',
    href: '/kollekcii/kollekciya-mebel-keln',
    image: tmpImg4,
  },
];

const Collections: FC = () => {
  return (
    <div className="container">
      <div className={styles.collections}>
        {categories.map((collection) => (
          <Link key={collection.title} href={collection.href}>
            <a className={styles.collection}>
              <div className={styles.collectionContent}>
                <div className={styles.collectionImageBlock}>
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles.collectionTextBlock}>
                  <div className={styles.collectionTitle}>
                    {collection.title}
                  </div>
                  {collection.description && (
                    <div className={styles.collectionDescription}>
                      {collection.description}
                    </div>
                  )}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
