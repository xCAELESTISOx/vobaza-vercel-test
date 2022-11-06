import type { ICategoryTag } from 'assets/api/modules/categories';

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
      data_type: 'STRING',
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
          values: ['100', '200'],
          data_type: 'STRING',
        },
        type: 'FILTER',
        url: '',
      },
      {
        id: 3,
        name: 'Узкие диваны',
        slug: 'narrow',
        tags: [],
        filter: {
          id: 13,
          type: 'NUMERIC_RANGE',
          values: ['1', '100'],
          data_type: 'STRING',
        },
        type: 'FILTER',
        url: '',
      },
    ],
    type: 'FILTER',
    url: '',
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
      data_type: 'STRING',
    },
    type: 'FILTER',
    url: '',
  },
];
