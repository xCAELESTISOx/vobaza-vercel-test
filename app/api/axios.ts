import initAxios from 'axios';
import cookies from 'js-cookie';
import { api } from '.';

export const axios = initAxios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
});

export const setToken = () => {
  const token = cookies.get('token');
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const setTokenWithGuest = async (withRequest?: boolean) => {
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
