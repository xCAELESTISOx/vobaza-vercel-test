import React, { FC } from 'react';
import Link from 'next/link';

import { getFileSize } from 'assets/utils';
import { IGoodDocument } from 'src/models/IGood';

import styles from './styles.module.scss';

interface ProductDocuments {
  documents?: IGoodDocument[];
}

const ProductDocuments: FC<ProductDocuments> = ({ documents }) => {
  return (
    <div className={styles.productDocuments}>
      {documents.map((document: IGoodDocument) => (
        <div className={styles.productDocument} key={document.id}>
          <div className={styles.productDocumentBadge}>{document.type}</div>
          <div>
            <Link href={document.url}>
              <a
                className={styles.productDocumentLink}
                target="_blank"
                rel="noreferrer"
              >
                {document.name}
              </a>
            </Link>
            <div className={styles.productDocumentSize}>
              {getFileSize(document.size)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { ProductDocuments };
