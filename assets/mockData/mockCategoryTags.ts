import type { ITag } from 'entities/tags';

// Теги для категории pryamye_divany
export const mockCategoryTags: ITag[] = [
  {
    id: 369,
    type: 'FILTER',
    slug: 'test_tag',
    name: 'test_tag',
    url: '/zerkala/moia_kategoriia5/moia_podkategoriia5/test_tag',
    tags: [],
    title: 'здесь title',
    description: 'здесь description',
    keywords: 'здесь keywords',
    page_title: 'здесь h1',
    filters: [
      {
        min: 0,
        max: 500,
        id: 218,
        type: 'NUMERIC_RANGE',
        value_type: 'NUMBER',
        data_type: 'INTEGER',
      },
    ],
  },
  {
    id: 370,
    type: 'FILTER',
    slug: 'test_tag1',
    name: 'test_tag1',
    url: '/zerkala/moia_kategoriia5/moia_podkategoriia5/test_tag1',
    tags: [],
    title: 'здесь title',
    description: 'здесь description',
    keywords: 'здесь keywords',
    page_title: 'здесь h1',
    filters: [
      {
        min: 0,
        max: 500,
        id: 219,
        type: 'NUMERIC_RANGE',
        value_type: 'NUMBER',
        data_type: 'DECIMAL',
      },
    ],
  },
];
