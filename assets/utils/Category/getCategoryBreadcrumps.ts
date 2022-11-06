import type { ICategoryTag } from 'assets/api/modules/categories';
import type { BreadcrumbType } from 'components/Layout/Breadcrumbs';
import type { ICategory } from 'src/models/ICategory';

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

const sortAncestors = (newAncestors: ICategory[], ancestors: ICategory[]): ICategory[] => {
  const lastEl = newAncestors.length ? newAncestors[newAncestors.length - 1] : null;

  if (ancestors.length === newAncestors.length) return newAncestors;

  if (!lastEl) {
    const first = ancestors.find((item) => {
      return !item.parent_id;
    });

    return sortAncestors([first], ancestors);
  } else {
    const newEl = ancestors.find((item) => {
      return item.parent_id === lastEl.id;
    });

    return sortAncestors([...newAncestors, newEl], ancestors);
  }
};

const getNestedSlugAncestors = (index: number, sortedAncestors: ICategory[]): ICategory[] => {
  sortedAncestors[0].slug = (sortedAncestors[0].slug.includes('/') ? '' : '/') + sortedAncestors[0].slug;
  if (index === 0) return getNestedSlugAncestors(1, sortedAncestors);

  const newSortedAncestors = [...sortedAncestors];
  if (!newSortedAncestors[index]) return newSortedAncestors;
  newSortedAncestors[index].slug = newSortedAncestors[index - 1].slug + '/' + newSortedAncestors[index].slug;

  return getNestedSlugAncestors(index + 1, newSortedAncestors);
};

export const getProductBreadcrumbs = (ancestors: ICategory[], mainCategory: ICategory): BreadcrumbType[] => {
  const sortedAncestors = [...sortAncestors([], ancestors), mainCategory];

  const breadcrumbs = getNestedSlugAncestors(0, sortedAncestors).map((item) => {
    return {
      title: item.name,
      href: item.slug,
      clickableLast: true,
    };
  });

  return [
    {
      title: 'Каталог мебели',
      href: '/katalog',
    },
    ...breadcrumbs,
  ];
};
