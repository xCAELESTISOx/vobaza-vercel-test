import type { ICategoryTag } from 'src/models/ICategoryTag';

type GetTagsByUrl = {
  currentTags: ICategoryTag[];
  currentTagsLevel: ICategoryTag[];
  hasInvalidTags: boolean;
};

/** Получение текущих тегов по URL`у */
export const getTagsByUrl = (url: string, tags: ICategoryTag[], categoriesSlugs: string[]): GetTagsByUrl => {
  // Выкидываем из URL`а все лишнее и получаем только слагb категорий и тегов
  let slugs: string = url.replace('/ekspress-dostavka', '').split('?')[0];

  // Вырезаем слаги категорий, оставляя только слаги тегов
  categoriesSlugs.forEach((slug) => {
    slugs = slugs.replace('/' + slug, '');
  });
  const tagsSlugs = slugs.split('/').filter(Boolean);

  const currentTags: ICategoryTag[] = [];
  let childrenTags: ICategoryTag[] = tags;
  let currentTagsLevel: ICategoryTag[] = tags;
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
