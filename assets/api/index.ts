import cookies from 'js-cookie';

import { axios, setToken, setTokenWithGuest } from './axios';
import { CategoriesAPI } from './modules/category';
import { ordersAPI } from './modules/orders';

export const api = {
  //Auth
  getRegisterCode(data: object) {
    setTokenWithGuest();
    return axios.post('/customer/v1/register', data);
  },
  getGuestToken() {
    return axios.post('/v1/token');
  },
  requestCode(data: object) {
    return axios.post('/customer/v1/token/byPhone/sendCode', data);
  },
  checkLoginCode(data: object) {
    setTokenWithGuest();
    return axios.post('/customer/v1/token/byPhone', data);
  },
  logout() {
    setToken();
    return axios.delete('/customer/v1/token');
  },
  // Profile
  getProfile() {
    setToken();
    return axios.get('/customer/v1/profile');
  },
  updateProfile(data: { name: string; surname: string; email: string }) {
    setToken();
    return axios.post('/customer/v1/profile', data);
  },
  getGlobalInfo() {
    if (!(cookies.get('token') || cookies.get('guestToken'))) return;
    setTokenWithGuest();
    return axios.get('/v1/me');
  },

  subscribeMailing(data: { email: string }) {
    return axios.post('/v1/subscriptions', data);
  },
  // Addresses
  getAddresses() {
    setToken();
    return axios.get('/customer/v1/addresses');
  },
  getAddress(id: string | number) {
    setToken();
    return axios.get(`/customer/v1/addresses/${id}`);
  },
  setAddress(data: object) {
    setToken();
    return axios.post('/customer/v1/addresses', data);
  },
  changeAddress(data: object, id: number) {
    setToken();
    return axios.post(`/customer/v1/addresses/${id}`, data);
  },
  deleteAddress(id: string | number) {
    setToken();
    return axios.delete(`/customer/v1/addresses/${id}`);
  },
  setDefaultAddress(id: string | number) {
    setToken();
    return axios.post(`/customer/v1/addresses/${id}/default`);
  },
  //Banners
  getBanners(params: { type: 'SLIDER' | 'MINIATURE'; limit?: number }) {
    return axios.get('/v1/banners', { params });
  },
  //MainPage
  getHits() {
    const params = {
      limit: 6,
      format: 'PUBLIC_LIST',
      'filter[label]': 'HIT',
    };
    return axios.get('/v1/products/random', { params });
  },
  getNewGoods() {
    const params = {
      limit: 8,
      format: 'PUBLIC_LIST',
      'filter[label]': 'NEW',
    };
    return axios.get('/v1/products/random', { params });
  },
  getPopularCategories() {
    return axios.get('/v1/popularCategories');
  },
  getCollections() {
    return axios.get('/v1/collections');
  },
  //Goods
  getGoods(params) {
    return axios.get(`/v1/products`, { params });
  },
  getGood(id: number | string) {
    return axios.get(`/v1/products/${id}`);
  },
  getGoodBySlug(slug: string) {
    return axios.get(`v1/products/bySlug/${slug}`);
  },
  getGoodAttributes(id: number | string) {
    return axios.get(`/v1/products/${id}/attributes`);
  },
  //Favorites
  async getFavorites() {
    await setTokenWithGuest();
    return axios.get(`/v1/favorites`);
  },
  async setGoodFavorite(id: number | string) {
    await setTokenWithGuest(true);
    return axios.post(`/v1/favorites/${id}`);
  },
  async deleteGoodFavorite(id: number | string) {
    await setTokenWithGuest(true);
    return axios.delete(`/v1/favorites/${id}`);
  },
  // Compare
  async getCompareList(ids: number[] | string[]) {
    return axios.get(`/v1/compareList`, { params: { ids } });
  },
  async getAuthCompareList() {
    setToken();
    return axios.get(`/customer/v1/compareList`);
  },
  async addToAuthCompareList(id: number) {
    setToken();
    return axios.post(`/customer/v1/compareList/${id}`);
  },
  async removeFromAuthCompareList(id: number) {
    setToken();
    return axios.delete(`/customer/v1/compareList/${id}`);
  },
  async removeAuthCompareList() {
    setToken();
    return axios.delete(`/customer/v1/compareList`);
  },
  // Cart
  async getCart() {
    await setTokenWithGuest();
    return axios.get(`/v1/basket`);
  },
  async addGoodToCart(id: number | string, data: { quantity: number; include?: string }) {
    await setTokenWithGuest(true);
    return axios.post(`/v1/basket/${id}/add`, data);
  },
  async removeGoodFromCart(id: number | string, data: { quantity: number; include?: string }) {
    await setTokenWithGuest(true);
    return axios.post(`/v1/basket/${id}/sub`, data);
  },
  ...CategoriesAPI,
  //Order
  ...ordersAPI,
};
