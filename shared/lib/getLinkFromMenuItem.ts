import type { IMenuItem } from 'src/models/IMenu';

export const getLinkFromMenuItem = (item: IMenuItem, isExpress = false) => {
  let url = '';

  if (item.item_type === 'NORMAL') {
    url = item.link;
  } else {
    item.category.ancestors?.forEach((ancestor) => {
      url += '/' + ancestor.slug;
    });
    url += '/' + item.category.slug;
  }

  return isExpress && url ? url + '/ekspress-dostavka' : url;
};
