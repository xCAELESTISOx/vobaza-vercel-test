const token = 'f41f11a000e16ef00081fec5eedef25bbb592def';
const baseURL = `https://suggestions.dadata.ru/suggestions/api/4_1/rs/`;

export const dadataApi = {
  getAddressByIp(ip?: string) {
    return fetch(`${baseURL}iplocate/address${ip ? `?ip=${ip}` : ''}`, {
      headers: {
        Authorization: 'Token ' + token,
      },
    });
  },
  findCity(query: string) {
    return fetch(`${baseURL}suggest/address`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({
        query: query,
        from_bound: { value: 'city' },
        to_bound: { value: 'city' },
      }),
    });
  },
  findAddress(query: string) {
    return fetch(`${baseURL}suggest/address`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({
        query: query,
        from_bound: { value: 'city' },
        to_bound: { value: 'house' },
      }),
    });
  },
};
