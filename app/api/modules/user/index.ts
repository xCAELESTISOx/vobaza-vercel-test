import cookies from 'js-cookie';

import type { IProfile } from 'components/Profile/Data';
import type { GetGlobalInfo } from './user';

import { axios, setToken, setTokenWithGuest } from '../../axios';

export const userAPI = {
  getProfile() {
    setToken();
    return axios.get<{ data: IProfile }>('/customer/v1/profile');
  },
  updateProfile(data: { name: string; surname: string; email: string }) {
    setToken();
    return axios.post('/customer/v1/profile', data);
  },
  getGlobalInfo() {
    if (!(cookies.get('token') || cookies.get('guestToken'))) return;
    setTokenWithGuest();
    return axios.get<{ data: GetGlobalInfo }>('/v1/me');
  },
  subscribeMailing(data: { email: string }) {
    return axios.post('/v1/subscriptions', data);
  },
};
