import { FC } from 'react';

import blogPosts from '../../src/mock/blog/blogPosts';

import BlogItem from './Item';

import styles from './styles.module.scss';

const BlogList: FC = () => {
  return (
    <div className={styles.blogList}>
      {blogPosts.map((item, index) => (
        <BlogItem post={item} key={index} />
      ))}
    </div>
  );
};
export default BlogList;
