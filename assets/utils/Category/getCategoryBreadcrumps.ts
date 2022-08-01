import type { BreadcrumbType } from 'components/Layout/Breadcrumbs';
import type { ICategory } from 'src/models/ICategory';
import type { ICategoryTag } from 'src/models/ICategoryTag';

export const getCategoryBreadcrumps = (categories: ICategory[], tags: ICategoryTag[], isExpress: boolean) => {
  const breadcrumbs: BreadcrumbType[] = [
    {
      title: isExpress ? 'Экспресс-доставка' : 'Каталог мебели',
      href: isExpress ? '/katalog/ekspress-dostavka' : '/katalog',
    },
  ];
  let href = '';

  categories.forEach((ancestor) => {
    href += '/' + ancestor.slug;
    breadcrumbs.push({
      title: ancestor.name,
      href: href + (isExpress ? '/ekspress-dostavka' : ''),
    });
  });

  tags.forEach((tag) => {
    href += '/' + tag.slug;
    breadcrumbs.push({
      title: tag.name,
      href: href + (isExpress ? '/ekspress-dostavka' : ''),
    });
  });

  return breadcrumbs;
};
