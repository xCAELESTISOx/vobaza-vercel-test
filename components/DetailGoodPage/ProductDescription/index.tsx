import React, { FC } from 'react';

import styles from './styles.module.scss';

interface ProductDescription {
  html: string;
}

const ProductDescription: FC<ProductDescription> = ({ html }) => {
  return (
    <div
      className={styles.productDescription}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export { ProductDescription };
