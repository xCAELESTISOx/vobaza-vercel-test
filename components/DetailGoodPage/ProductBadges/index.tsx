import React from 'react';

import styles from './styles.module.scss';

const badgesDict = {
  HIT: 'Хит',
  NEW: 'Новинка',
  BESTSELLER: 'Бестселлер',
  'EXPRESS-DELIVERY': 'Экспресс-доставка',
};

const ProductBadges = ({ badges, className = '' }) => {
  const containerClasses = [className, styles.productBadges].join(' ');

  return (
    <div className={containerClasses}>
      {badges.map((badgeType) => (
        <div key={badgeType} className={`${styles.badge} ${styles[badgeType]}`}>
          {badgesDict[badgeType]}
        </div>
      ))}
    </div>
  );
};

export { ProductBadges };
