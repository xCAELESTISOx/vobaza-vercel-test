import type { ICategoryTag } from 'src/models/ICategoryTag';

// Теги для категории pryamye_divany
export const mockCategoryTags: ICategoryTag[] = [
  {
    id: 1,
    name: 'Красного цвета',
    slug: 'red',
    filter: {
      id: 3,
      type: 'LISTED',
      values: ['Красный'],
    },
    tags: [
      {
        id: 2,
        name: 'Широкие диваны',
        slug: 'wide',
        title: 'Широкие диваны',
        tags: [],
        filter: {
          id: 13,
          type: 'NUMERIC_RANGE',
          values: [100, 200],
        },
      },
      {
        id: 3,
        name: 'Узкие диваны',
        slug: 'narrow',
        tags: [],
        filter: {
          id: 13,
          type: 'NUMERIC_RANGE',
          values: [1, 100],
        },
      },
    ],
  },
  {
    id: 4,
    name: 'Серенькие',
    slug: 'grey',
    tags: [],
    filter: {
      id: 3,
      type: 'LISTED',
      values: ['Серый'],
    },
  },
];
