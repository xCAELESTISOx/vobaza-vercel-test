import { axios } from './index';

export default async function checkAuth(req: any, withGuest?: boolean, withoutError?: boolean) {
  const { cookies } = req;
  if (cookies.token || (withGuest && cookies.guestToken)) {
    axios.defaults.headers.common.Authorization = `Bearer ${cookies.token || cookies.guestToken
      }`;
    return !!cookies.token
  } else if (!withoutError) {
    throw new Error();
  } else {
    return false
  }
}
