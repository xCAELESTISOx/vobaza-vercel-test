import React, { FC } from 'react';
import Link from 'next/link';

import type { ITag } from 'entities/tags';

import styles from './styles.module.scss';

type Props = {
  isActive: boolean;
  tag: ITag;
  getTagUrl: (id: number) => string;
  getTagQuery: (id: number) => { [key: string | number]: string[] | number[] | string | number };
  onClick: () => void;
};

export const CategoryTagItem: FC<Props> = ({ isActive, tag, getTagUrl, getTagQuery, onClick }) => {
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
