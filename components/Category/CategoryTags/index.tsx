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

  const onTagClick = (tagId: number) => {
    const tag = currentTagsLevel.find((item) => item.id === tagId);

    if (!router.asPath.includes(tag.slug)) {
      setIsLoading(true);

      const routerQuery = router.query;
      delete routerQuery['page'];
      delete routerQuery['city'];
      delete routerQuery['id'];
      delete routerQuery[tag.filter.id];

      let newURL = tag.url;

      // if (currentTag?.tags.length) {
      //   newURL += '/' + tag.slug;
      // } else {
      //   if (currentTag) {
      //     newURL = newURL.replace(currentTag.slug, tag.slug);
      //   } else {
      //     newURL += '/' + tag.slug;
      //   }
      // }

      if (router.asPath.includes('/ekspress-dostavka')) {
        newURL += '/ekspress-dostavka';
      }

      router.push(
        {
          pathname: newURL,
          query: routerQuery,
        },
        null,
        { scroll: false }
      );
    }
  };

  return (
    <>
      {Boolean(currentTagsLevel?.length) && (
        <div className={styles.categoryTags}>
          {currentTagsLevel.map((tag) => (
            <CategoryTagItem key={tag.id} isActive={currentTag?.id === tag.id} tag={tag} onClick={onTagClick} />
          ))}
        </div>
      )}
    </>
  );
};
