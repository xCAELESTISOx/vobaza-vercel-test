import { axios } from '../axios';

export const CategoriesAPI = {
  getRootCategories() {
    return axios.get(`/v1/categories`);
  },
  getCategory(id) {
    const params = {
      include: 'ancestors,children',
      maxDepth: 1,
    };
    return axios.get(`/v1/categories/${id}`, { params });
  },
  getCategoryBySlug(slug: string) {
    const params = {
      include: 'ancestors,children',
      maxDepth: 1,
    };
    return axios.get(`/v1/categories/bySlug/${slug}`, { params });
  },
  getCategoryFilters(id: number | string, filters?: { [key: string]: string[] | string | number | boolean }) {
    return axios.get(`/v1/categories/${id}/filters`, { params: filters });
  },
  getCategoryTags(categoryId: number | string) {
    return axios.get(`v1/categories/${categoryId}/tags`);
  },
  getCategoryByPath(path: string) {
    return axios.get('/v1/categories/byPath', { params: { path, include: 'ancestors' } });
  },
};
