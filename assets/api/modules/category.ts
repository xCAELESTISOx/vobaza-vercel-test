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
  getCategoryFilters(id: number, filters?: { [key: string]: string[] | string | number }) {
    return axios.get(`/v1/categories/${id}/filters`, { params: filters });
  },
};
