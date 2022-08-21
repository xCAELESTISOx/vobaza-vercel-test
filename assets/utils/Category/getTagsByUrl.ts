import type { ICategoryTag } from 'src/models/ICategoryTag';

// Получение текущих тегов по URLу
export const getTagsByUrl = (url: string, tags: ICategoryTag[], categoriesSlugs: string[]) => {
  // Выкидываем из URLа все лишнее и получаем только массив слагов категорий и тегов
  let tagsSlugs: string | string[] = url.replace('/ekspress-dostavka', '').split('?')[0];
  categoriesSlugs.forEach((slug) => (tagsSlugs = (tagsSlugs as string).replace('/' + slug, '')));
  tagsSlugs = tagsSlugs.split('/').filter((i) => i);

  let childrenTags: ICategoryTag[] = tags;
  const currentTags: ICategoryTag[] = [];
  let currentTagsLevel: ICategoryTag[] = tags;

  // Пробегаемся по дереву тегов и ищем нужный
  tagsSlugs.forEach((slug) => {
    const newTag = childrenTags.find((tag) => tag.slug === slug) || null;

    if (newTag) {
      childrenTags = newTag.tags;
      currentTags.push(newTag);
      if (newTag.tags?.length) {
        currentTagsLevel = newTag.tags;
      }
    } else {
      throw new Error(`Тег ${slug} не найден`);
    }
  });

  return { currentTags, currentTagsLevel };
};
