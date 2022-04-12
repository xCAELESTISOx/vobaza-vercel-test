import React, { FC, useState } from 'react';

import { ProductReviewsPost } from './ProductReviewsPost';
import { ProductReviewsSidebar } from './ProductReviewsSidebar';
import { CreateReviewModal } from './CreateReviewModal';

import styles from './styles.module.scss';

interface ProductReviews {
  reviewsInfo: any;
  productInfo: any;
}

const ProductReviews: FC<ProductReviews> = ({ reviewsInfo, productInfo }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <CreateReviewModal
        active={isOpenModal}
        onClose={closeModal}
        productInfo={productInfo}
      />

      <section className={styles.reviewsBlock}>
        <h2 className={styles.reviewsBlockTitle}>Отзывы</h2>
        <div className={styles.reviewsContainer}>
          <ProductReviewsSidebar
            reviewsInfo={reviewsInfo}
            onClickCreateReview={openModal}
          />
          <div className={styles.reviewsList}>
            {reviewsInfo.posts.map((post) => (
              <ProductReviewsPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export { ProductReviews };
