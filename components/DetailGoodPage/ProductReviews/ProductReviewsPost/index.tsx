import React, { FC } from 'react';

import { RatingStars } from '../../../UI/RatingStars';

import styles from './styles.module.scss';

interface ProductReviewsPost {
  post: any;
}

const ProductReviewsPost: FC<ProductReviewsPost> = ({ post = {} }) => {
  const formatedDate = new Date(post.created_at).toLocaleDateString('ru-ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewUsername}>{post.user}</div>
        <RatingStars size="Small" value={post.score} />
        <div className={styles.reviewDate}>{formatedDate}</div>
      </div>
      {post.content && (
        <>
          <div className={styles.reviewBody}>
            {post.content.positive && (
              <div className={styles.reviewTextBlock}>
                <div className={styles.reviewTextBlockTitle}>Достоинства</div>
                <p>{post.content.positive}</p>
              </div>
            )}
            {post.content.negative && (
              <div className={styles.reviewTextBlock}>
                <div className={styles.reviewTextBlockTitle}>Недостатки</div>
                <p>{post.content.negative}</p>
              </div>
            )}
            {post.content.comment && (
              <div className={styles.reviewTextBlock}>
                <div className={styles.reviewTextBlockTitle}>Комментарии</div>
                <p>{post.content.comment}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export { ProductReviewsPost };
