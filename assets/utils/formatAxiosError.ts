import type { AxiosError } from 'axios';

export const formatAxiosError = (error: AxiosError) => {
  const url = error.response?.config?.url;
  const params = JSON.stringify(error.response?.config?.params);
  const resData = JSON.stringify(error.response?.data);
  const status = error.response?.status;

  return `
  Error has occured
  
    URL запроса: ${url || '–'};
    
    Параметры запроса: ${params || '–'};
    
    Ответ сервера: ${resData || '–'};
    
    Статус ответа сервера: ${status || '–'}
    
  `;
};
