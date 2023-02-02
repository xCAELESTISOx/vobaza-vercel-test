import React, { FC } from 'react';
import Link from 'next/link';

import type { ITag } from 'entities/tags';
import { parseTagTitle } from 'widgets/categories';

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

  const queryWithoutUtm = Object.fromEntries(
    Object.entries(params).filter(
      (item) => item[0] === 'sort' || item[0] === 'city' || item[0] === 'page' || !isNaN(+item[0])
    )
  );

  return (
    <Link href={{ pathname: href, query: queryWithoutUtm }}>
      <a
        className={`${styles.tag} ${isActive ? styles.active : ''}`}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: parseTagTitle(tag.name) }}
      />
    </Link>
  );
};
