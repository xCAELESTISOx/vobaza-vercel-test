import { axios } from './axios';

export default async function checkAuth(req: any, withGuest?: boolean) {
  const { cookies } = req;
  if (cookies.token || (withGuest && cookies.guestToken)) {
    axios.defaults.headers.common.Authorization = `Bearer ${cookies.token || cookies.guestToken}`;
    return Boolean(cookies.token);
  } else {
    return false;
  }
}
