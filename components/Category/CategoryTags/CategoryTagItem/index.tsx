import React from 'react';

import type { ICategoryTag } from 'assets/api/modules/categories';
import { useAdvancedRouter } from 'assets/utils/useAdvancedRouter';

import styles from './styles.module.scss';

type Props = {
  isActive: boolean;
  tag: ICategoryTag;
  onClick: (id: number) => void;
};

export const CategoryTagItem = ({ isActive, tag, onClick }: Props) => {
  const { router } = useAdvancedRouter();
  const onClickHandler = () => {
    tag.type === 'REDIRECT' ? router.push(tag.redirect_url || '/') : onClick(tag.id);
  };

  return (
    <div className={`${styles.tag} ${isActive ? styles.active : ''}`} onClick={onClickHandler}>
      {tag.name}
    </div>
  );
};
