import React, { Dispatch, FC, SetStateAction } from 'react';

import type { ITag } from 'entities/tags';
import { getTagsByUrl } from 'shared/lib/categories/getTagsByUrl';
import { useAdvancedRouter } from 'shared/lib/useAdvancedRouter';

import { CategoryTagItem } from 'entities/tags/ui/CategoryTagItem';

import styles from './styles.module.scss';

type Props = {
  categorySlug: string;
  tags: ITag[];
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
};

export const CategoryTags: FC<Props> = ({ categorySlug, tags, setIsLoading }) => {
  const { router } = useAdvancedRouter();

  const { currentTags, currentTagsLevel } = getTagsByUrl(router.asPath, tags, ['divany', categorySlug]);

  const currentTag = currentTags[currentTags.length - 1];

  const getTagUrl = (tagId: number) => {
    const tag = currentTagsLevel.find((item) => item.id === tagId);

    if (tag.type === 'REDIRECT') return tag.redirect_url || '/';

    return router.asPath.includes('/ekspress-dostavka') ? tag.url + '/ekspress-dostavka' : tag.url;
  };

  const getTagQuery = (tagId: number) => {
    const tag = currentTagsLevel.find((item) => item.id === tagId);

    if (tag.type === 'REDIRECT') return {};

    const routerQuery = { ...router.query };

    delete routerQuery['page'];
    delete routerQuery['city'];
    delete routerQuery['id'];
    // delete routerQuery[tag.filter.id];

    tag.filters.forEach((filter) => {
      delete routerQuery[filter.id];
    });

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
