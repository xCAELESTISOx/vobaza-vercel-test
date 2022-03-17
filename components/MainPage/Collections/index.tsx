import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICollection } from '../../../src/models/ICollection';

import styles from './styles.module.scss';

type Props = {
  collections: ICollection[];
};

const Collections: FC<Props> = ({ collections }) => {
  return (
    <div className="container">
      <div className={styles.collections}>
        {collections.map((collection: ICollection) =>
          collection ? (
            <Link key={collection.id} href={collection.url}>
              <a className={styles.collection}>
                <div className={styles.collectionContent}>
                  <div className={styles.collectionImageBlock}>
                    <Image
                      src={collection.desktop_image.variants[0].url}
                      layout="fill"
                      objectFit="cover"
                      alt={collection.title}
                    />
                  </div>
                  <div
                    className={`${styles.collectionImageBlock} ${styles.mobile}`}
                  >
                    <Image
                      src={collection.mobile_image.variants[0].url}
                      layout="fill"
                      objectFit="cover"
                      alt={collection.title}
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
          ) : (
            <div className={styles.collection}></div>
          )
        )}
      </div>
    </div>
  );
};

export default Collections;
