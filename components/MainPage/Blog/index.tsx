import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import blogPosts from '../../../src/mock/blog/blogPosts';

import styles from './styles.module.scss';

const Blog: FC = () => {
  return (
    <div className="container">
      <div className={styles.blog}>
        {blogPosts.slice(0, 6).map((post) => (
          <div key={post.title} className={styles.post}>
            <Link href={`/blog/${post.slug}`}>
              <a>
                <div className={styles.postImage}>
                  <Image src={post.cover} alt={post.title} />
                </div>
              </a>
            </Link>
            <Link href={`/blog/${post.slug}`}>
              <a className={styles.postTitle}>{post.title}</a>
            </Link>
            <div className={styles.postDate}>{post.created_at}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
