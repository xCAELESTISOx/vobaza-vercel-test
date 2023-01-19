import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { IBlogPost } from 'src/mock/blog/blogPosts';

import styles from './styles.module.scss';

interface Props {
  post: IBlogPost;
}

const BlogItem: FC<Props> = ({ post }) => {
  return (
    <div className={styles.blogItem}>
      <Link href={`/blog/${post.slug}`}>
        <a className={styles.blogItemImage}>
          <Image src={post.cover} alt="" />
        </a>
      </Link>
      <Link href={`/blog/${post.slug}`}>
        <a>
          <h2 className={styles.blogItemTitle}>{post.title}</h2>
        </a>
      </Link>
      <div className={styles.blogItemDate}>{post.created_at}</div>
    </div>
  );
};
export default BlogItem;
