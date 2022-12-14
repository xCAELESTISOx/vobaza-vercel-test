import React, { FC } from 'react';

import { RatingStars } from 'shared/ui/RatingStars';

import styles from './styles.module.scss';

interface ProductReviewsSidebar {
  reviewsInfo: any;
  onClickCreateReview?: () => void;
}

const ProductReviewsSidebar: FC<ProductReviewsSidebar> = ({ reviewsInfo, onClickCreateReview = () => {} }) => {
  return (
    <div className={styles.reviewsSidebar}>
      <div className={styles.reviewsSidebarBlock}>
        <div className={styles.reviewsAverageRating}>
          <div className={styles.reviewsAverageRatingValue}>{reviewsInfo.average_score}</div>
          <RatingStars size="Big" value={reviewsInfo.average_score} />
        </div>
        <div className={styles.reviewsAverageRatingNotion}>{`на основе ${reviewsInfo.count} отзывов`}</div>
        <button className={styles.reviewsBtn} onClick={onClickCreateReview}>
          Оставить отзыв
        </button>
      </div>

      <div className={styles.reviewsSidebarBlock}>
        <div className={styles.reviewsSidebarBlockTitle}>Отзывы с оценкой</div>
        <div className={styles.reviewsSidebarBlock}>
          <div className={styles.reviewsSidebarScores}>
            {reviewsInfo.countByScore.map((item) => (
              <div key={`${item.score}-${item.count}`} className={styles.reviewsSidebarScoresItem}>
                <RatingStars value={item.score} />
                <div className={styles.reviewsSidebarScoresCount}>{item.count}</div>
              </div>
            ))}
          </div>
          <button className={styles.reviewsBtn}>Смотреть все отзывы</button>
        </div>
      </div>
    </div>
  );
};

export { ProductReviewsSidebar };
