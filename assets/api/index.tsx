import initAxios from 'axios';

export const axios = initAxios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
});

const setToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const api = {
  subscribeMailing(data: { email: string }) {
    return axios.post('/v1/subscriptions', data);
  },
};
