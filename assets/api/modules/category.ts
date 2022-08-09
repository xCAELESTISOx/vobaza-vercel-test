import { axios } from '../axios';

import type { ICategory } from 'src/models/ICategory';
import type { IFilter } from 'src/models/IFilter';

export const CategoriesAPI = {
  getRootCategories() {
    return axios.get<{ data: ICategory[] }>(`/v1/categories`);
  },
  getCategoryById(id: string | number) {
    const params = {
      include: 'children,ancestors',
      maxDepth: 2,
    };
    return axios.get<{ data: ICategory }>(`/v1/categories/${id}`, { params });
  },
  getCategoryBySlug(slug: string) {
    const params = {
      include: 'children,ancestors',
      maxDepth: 2,
    };
    return axios.get<{ data: ICategory }>(`/v1/categories/bySlug/${slug}`, { params });
  },
  getCategoryFilters(id: number | string, filters?: { [key: string]: string[] | string | number | boolean }) {
    return axios.get<{ data: IFilter[] }>(`/v1/categories/${id}/filters`, { params: filters });
  },
  getCategoryTags(categoryId: number | string) {
    return axios.get(`v1/categories/${categoryId}/tags`);
  },
  getCategoryByPath(path: string) {
    return axios.get('/v1/categories/byPath', { params: { path, include: 'ancestors,children' } });
  },
};
