import React from 'react';

import type { ICategoryTag } from 'src/models/ICategoryTag';

import styles from './styles.module.scss';

type Props = {
  isActive: boolean;
  tag: ICategoryTag;
  onClick: (id: number) => void;
};

export const CategoryTagItem = ({ isActive, tag, onClick }: Props) => {
  const onClickHandler = () => {
    onClick(tag.id);
  };

  return (
    <div className={`${styles.tag} ${isActive ? styles.active : ''}`} onClick={onClickHandler}>
      {tag.name}
    </div>
  );
};
