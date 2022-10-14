import type { ICategoryTag } from 'src/models/ICategoryTag';

/** Получение текущих тегов по URL`у */
export const getTagsByUrl = (url: string, tags: ICategoryTag[], categoriesSlugs: string[]) => {
  // Выкидываем из URL`а все лишнее и получаем только массив слагов категорий и тегов
  let tagsSlugs: string | string[] = url.replace('/ekspress-dostavka', '').split('?')[0];
  categoriesSlugs.forEach((slug) => (tagsSlugs = (tagsSlugs as string).replace('/' + slug, '')));
  tagsSlugs = tagsSlugs.split('/').filter(Boolean);
  //

  const currentTags: ICategoryTag[] = [];
  let childrenTags: ICategoryTag[] = tags;
  let currentTagsLevel: ICategoryTag[] = tags;
  // let hasInvalidTags = false;

  // Пробегаемся по дереву тегов и ищем нужный
  tagsSlugs.forEach((slug) => {
    const newTag = childrenTags.find((tag) => tag.slug === slug) || null;

    if (newTag) {
      childrenTags = newTag.tags;
      currentTags.push(newTag);
      if (newTag.tags?.length) {
        currentTagsLevel = newTag.tags;
      }
    }
    // } else {
    //   hasInvalidTags = true;
    // }
  });
  //

  return { currentTags, currentTagsLevel };
};
