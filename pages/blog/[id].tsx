import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Breadcrumbs, {
  BreadcrumbType,
} from '../../components/Layout/Breadcrumbs';

import blogPosts from '../../src/mock/blog/blogPosts';

import styles from '../../styles/BlogPost.module.scss';

const baseBreadcrumbs: BreadcrumbType[] = [
  {
    title: 'Блог',
    href: '/blog',
  },
];

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<any>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<any>(baseBreadcrumbs);

  useEffect(() => {
    const foundedPost = blogPosts.find((t) => t.slug === id);

    if (foundedPost) {
      setPost(foundedPost);
      setBreadcrumbs([
        ...baseBreadcrumbs,
        { title: foundedPost.title, href: `/${foundedPost.slug}` },
      ]);
    }
  }, [router]);

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {post && (
        <div className="container">
          <h1 className={`${styles.sectionTitle} ${styles.blogPostTitle}`}>
            {post.title}
          </h1>
          <div className={styles.blogPostDate}>{post.created_at}</div>
          <div
            className={styles.blogPostContent}
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          ></div>
        </div>
      )}
    </div>
  );
}
