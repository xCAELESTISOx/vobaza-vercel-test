import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import type { ITag } from 'entities/tags';
import type { DeviceType } from 'entities/tags/model/ITag';
import { getTagsByUrl } from 'shared/lib/categories/getTagsByUrl';
import { useAdvancedRouter } from 'shared/lib/useAdvancedRouter';

import { CategoryTagItem } from 'entities/tags/ui/CategoryTagItem';

import styles from './styles.module.scss';

const filterByDevice = (tags: ITag[], currentDevice: DeviceType, showHiddenTags: boolean) => {
  return tags.filter((tag) => showHiddenTags || !tag.device_to_hide || !tag.device_to_hide?.includes(currentDevice));
};

type Props = {
  categorySlug: string;
  tags: ITag[];
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
};

export const CategoryTags: FC<Props> = ({ categorySlug, tags, setIsLoading }) => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [showMore, setShowMore] = useState<Record<DeviceType, boolean>>({
    MOBILE: false,
    DESKTOP: false,
  });
  const { router } = useAdvancedRouter();

  const { currentTags, currentTagsLevel } = getTagsByUrl(router.asPath, tags, ['divany', categorySlug]);

  const currentTag = currentTags[currentTags.length - 1];

  const currentDevice: DeviceType = screenWidth === null ? null : screenWidth <= 500 ? 'MOBILE' : 'DESKTOP';

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

    tag.filters.forEach((filter) => {
      delete routerQuery[filter.id];
    });

    return routerQuery;
  };

  const onTagClick = () => {
    setIsLoading(true);
  };

  const filteredTags = filterByDevice(currentTagsLevel, currentDevice, !!showMore[currentDevice]);
  const isVisibleMoreButton = filteredTags.length < currentTagsLevel.length;

  const handleClick = () => {
    setShowMore((prev) => {
      return { ...prev, [currentDevice]: !prev[currentDevice] };
    });
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window?.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {Boolean(currentTagsLevel?.length && currentDevice) && (
        <div className={styles.categoryTags}>
          {filteredTags.map((tag) => (
            <CategoryTagItem
              key={tag.id}
              isActive={currentTag?.id === tag.id}
              tag={tag}
              getTagUrl={getTagUrl}
              getTagQuery={getTagQuery}
              onClick={onTagClick}
            />
          ))}

          {(isVisibleMoreButton || showMore[currentDevice]) && (
            <button className={styles.filtersButton} onClick={handleClick}>
              {showMore[currentDevice] ? 'Скрыть' : 'Показать еще'}
            </button>
          )}
        </div>
      )}
    </>
  );
};
