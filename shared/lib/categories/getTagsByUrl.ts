import type { ITag } from 'entities/tags';

type GetTagsByUrl = {
  currentTags: ITag[];
  currentTagsLevel: ITag[];
  hasInvalidTags: boolean;
};

/** Получение текущих тегов по URL`у */
export const getTagsByUrl = (url: string, tags: ITag[], categoriesSlugs: string[]): GetTagsByUrl => {
  // Выкидываем из URL`а все лишнее и получаем только слагb категорий и тегов
  let slugs: string = url.replace('/ekspress-dostavka', '').split('?')[0];

  // Вырезаем слаги категорий, оставляя только слаги тегов
  categoriesSlugs.forEach((slug) => {
    slugs = slugs.replace('/' + slug, '');
  });
  const tagsSlugs = slugs.split('/').filter(Boolean);

  const currentTags: ITag[] = [];
  let childrenTags: ITag[] = tags;
  let currentTagsLevel: ITag[] = tags;
  let hasInvalidTags = false;

  // Пробегаемся по дереву тегов и ищем подходящие
  tagsSlugs.forEach((slug) => {
    const newTag = childrenTags.find((tag) => tag.slug === slug) || null;

    if (newTag) {
      childrenTags = newTag.tags;
      currentTags.push(newTag);
      if (newTag.tags?.length) {
        currentTagsLevel = newTag.tags;
      }
    } else {
      hasInvalidTags = true;
    }
  });
  //

  return { currentTags, currentTagsLevel, hasInvalidTags };
};
