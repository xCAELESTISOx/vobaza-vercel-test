import React from 'react';
import Link from 'next/link';

import type { ICategoryTag } from 'assets/api/modules/categories';

import styles from './styles.module.scss';

type Props = {
  isActive: boolean;
  tag: ICategoryTag;
  getTagUrl: (id: number) => string;
  getTagQuery: (id: number) => { [key: string | number]: string[] | number[] | string | number };
  onClick: () => void;
};

export const CategoryTagItem = ({ isActive, tag, getTagUrl, getTagQuery, onClick }: Props) => {
  const href = getTagUrl(tag.id);
  const params = getTagQuery(tag.id);

  return (
    <Link href={{ pathname: href, query: params }}>
      <a className={`${styles.tag} ${isActive ? styles.active : ''}`} onClick={onClick}>
        {tag.name}
      </a>
    </Link>
  );
};
