import { FC } from 'react';
import BlogItem from './Item';
import styles from './styles.module.scss';

const BlogList: FC = () => {
  return (
    <div className={styles.blogList}>
      {[...Array(12)].map((item, index) => (
        <BlogItem key={index} />
      ))}
    </div>
  );
};
export default BlogList;
