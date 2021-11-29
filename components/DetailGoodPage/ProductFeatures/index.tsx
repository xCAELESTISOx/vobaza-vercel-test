import React, { FC } from 'react';

import styles from './styles.module.scss';

interface FeatureItem {
  feature: {
    title: string;
    value: string | Array<string>;
  };
}

const FeatureItem: FC<FeatureItem> = ({ feature }) => {
  return (
    <div className={styles.featureItem}>
      <div className={styles.featureTitle}>{feature.title}:</div>
      {Array.isArray(feature.value) ? (
        <div className={styles.featureValueMultiple}>
          {feature.value.map((item) => (
            <div key={item} className={styles.featureValueMultipleItem}>
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.featureValueMultiple}>{feature.value}</div>
      )}
    </div>
  );
};

interface ProductFeatures {
  items: any;
}

const ProductFeatures: FC<ProductFeatures> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items &&
        items.map((featuresBlock) => (
          <div key={featuresBlock.label} className={styles.featuresBlock}>
            <div className={styles.featuresBlockLabel}>
              {featuresBlock.label}
            </div>
            <div>
              {featuresBlock.items &&
                featuresBlock.items.map((feature) => (
                  <FeatureItem key={feature.title} feature={feature} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export { ProductFeatures };
