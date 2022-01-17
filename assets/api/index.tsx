import initAxios from 'axios';
import cookies from 'js-cookie';

export const axios = initAxios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
});

const setToken = () => {
  const token = cookies.get('token');

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const api = {
  //Auth
  requestCode(data: object) {
    return axios.post('/customer/v1/token/byPhone/sendCode', data);
  },
  checkLoginCode(data: object) {
    return axios.post('/customer/v1/token/byPhone', data);
  },
  logout() {
    setToken();
    return axios.delete('/customer/v1/token');
  },

  subscribeMailing(data: { email: string }) {
    return axios.post('/v1/subscriptions', data);
  },
};
