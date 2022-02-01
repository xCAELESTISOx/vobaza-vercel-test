import { axios } from './index';

export default async function checkAuth(req: any) {
  const { cookies } = req;

  if (!cookies.token) {
    throw new Error();
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${cookies.token}`;
  }
}
