import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import tmpImg1 from './tmp/oblojka1.jpg';

const BlogItem: FC = () => {
  return (
    <div className={styles.blogItem}>
      <Link href="/blog/dvuhyarusnaya-krovat-dlya-detey-za-i-protiv">
        <a className={styles.blogItemImage}>
          <Image src={tmpImg1} alt="" />
        </a>
      </Link>
      <Link href="/blog/dvuhyarusnaya-krovat-dlya-detey-za-i-protiv">
        <a>
          <h2 className={styles.blogItemTitle}>
            Двухъярусная кровать для детей: за и против
          </h2>
        </a>
      </Link>
      <div className={styles.blogItemDate}>24 Ноя 2021</div>
    </div>
  );
};
export default BlogItem;
