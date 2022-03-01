import initAxios from 'axios';
import cookies from 'js-cookie';

import { IOrder } from '../../src/models/IOrder';

export const axios = initAxios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
});

const setToken = () => {
  const token = cookies.get('token');
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const setTokenWithGuest = async (withRequest?: boolean) => {
  let token = cookies.get('token') || cookies.get('guestToken');

  if (!token && withRequest) {
    const guestTokenRes = await api.getGuestToken();
    token = guestTokenRes.data.data.token;
    cookies.set('guestToken', token);
  }
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const api = {
  //Auth
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
  getProfile() {
    setToken();
    return axios.get('/customer/v1/profile');
  },
  getGlobalInfo() {
    if (!(cookies.get('token') || cookies.get('guestToken'))) return;
    setTokenWithGuest();
    return axios.get('/v1/me');
  },

  subscribeMailing(data: { email: string }) {
    return axios.post('/v1/subscriptions', data);
  },
  //Banners
  getBannersByType(type: string) {
    return axios.get('/v1/banners', { params: { type } });
  },
  //MainPage
  getHits() {
    const params = {
      limit: 6,
      format: 'FULL_WITH_MAIN_ATTRIBUTES',
      'filter[label]': 'HIT',
    };
    return axios.get('/v1/products/random', { params });
  },
  getNewGoods() {
    const params = {
      limit: 8,
      format: 'FULL_WITH_MAIN_ATTRIBUTES',
      'filter[label]': 'NEW',
    };
    return axios.get('/v1/products/random', { params });
  },
  //Goods
  getGoods(params) {
    return axios.get(`/v1/products`, { params });
  },
  getGood(id: number | string) {
    return axios.get(`/v1/products/${id}`);
  },
  getGoodAttributes(id: number | string) {
    return axios.get(`/v1/products/${id}/attributes`);
  },
  //Category
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
  getCategoryFilters(id) {
    return axios.get(`/v1/categories/${id}/filters`);
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
  // Cart
  async getCart() {
    await setTokenWithGuest();
    return axios.get(`/v1/basket`);
  },
  async addGoodToCart(
    id: number | string,
    data: { quantity: number; include?: string }
  ) {
    await setTokenWithGuest(true);
    return axios.post(`/v1/basket/${id}/add`, data);
  },
  async removeGoodFromCart(
    id: number | string,
    data: { quantity: number; include?: string }
  ) {
    await setTokenWithGuest(true);
    return axios.post(`/v1/basket/${id}/sub`, data);
  },
  //Order
  async createOrder(data: IOrder) {
    await setTokenWithGuest();
    return axios.post(`/v1/checkout`, data);
  },
};
