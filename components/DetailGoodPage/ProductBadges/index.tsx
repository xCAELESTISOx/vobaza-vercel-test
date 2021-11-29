import React from 'react';

import styles from './styles.module.scss';

const badgesDict = {
  express_delivery: 'Экспресс-доставка',
  hit: 'Хит',
  bestseller: 'Бестселлер',
};

const ProductBadges = ({ badges, className = '' }) => {
  return (
    <div className={styles.badges + ' ' + className}>
      {badges.map((badge) => (
        <div key={badge} className={styles[badge]}>
          {badgesDict[badge]}
        </div>
      ))}
    </div>
  );
};

export { ProductBadges };
