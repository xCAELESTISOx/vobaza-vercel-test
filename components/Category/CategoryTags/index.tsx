import React, { Dispatch, SetStateAction } from 'react';

import type { ICategoryTag } from 'assets/api/modules/categories';
import { getTagsByUrl } from 'assets/utils/Category/getTagsByUrl';
import { useAdvancedRouter } from 'assets/utils/useAdvancedRouter';

import { CategoryTagItem } from 'components/Category/CategoryTags/CategoryTagItem';

import styles from './styles.module.scss';

type Props = {
  categorySlug: string;
  tags: ICategoryTag[];
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
};

export const CategoryTags = ({ categorySlug, tags, setIsLoading }: Props) => {
  const { router } = useAdvancedRouter();

  const { currentTags, currentTagsLevel } = getTagsByUrl(router.asPath, tags, ['divany', categorySlug]);

  const currentTag = currentTags[currentTags.length - 1];

  const getTagUrl = (tagId: number) => {
    const tag = currentTagsLevel.find((item) => item.id === tagId);

    return router.asPath.includes('/ekspress-dostavka') ? tag.url + '/ekspress-dostavka' : tag.url;
  };

  const getTagQuery = (tagId: number) => {
    const tag = currentTagsLevel.find((item) => item.id === tagId);
    const routerQuery = { ...router.query };

    delete routerQuery['page'];
    delete routerQuery['city'];
    delete routerQuery['id'];
    delete routerQuery[tag.filter.id];
    console.log(routerQuery);
    return routerQuery;
  };

  const onTagClick = () => {
    setIsLoading(true);
  };

  return (
    <>
      {Boolean(currentTagsLevel?.length) && (
        <div className={styles.categoryTags}>
          {currentTagsLevel.map((tag) => (
            <CategoryTagItem
              key={tag.id}
              isActive={currentTag?.id === tag.id}
              tag={tag}
              getTagUrl={getTagUrl}
              getTagQuery={getTagQuery}
              onClick={onTagClick}
            />
          ))}
        </div>
      )}
    </>
  );
};
