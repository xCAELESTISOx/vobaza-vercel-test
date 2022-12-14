import axios from 'axios';

import type { IGoodCard } from 'entities/products/model/IGood';
import type { ITag } from 'entities/tags';
import { formatAxiosError } from '../formatAxiosError';
import normalizeGoods from '../normalizers/normalizeGoods';

import { api } from 'app/api';

interface GetProducts {
  products: IGoodCard[];
  meta: {
    list: {
      count: number;
      pages_count: number;
    };
  } | null;
  withError?: boolean;
}

/** Получает и возвращает список товаров и мета-информацию для страниц категорий */
export const getProductsList = async (
  _params: Record<string, string | number | boolean | string[]>,
  activeTags: ITag[]
): Promise<GetProducts> => {
  let currentTags = [...activeTags];
  let products: IGoodCard[] = [];
  let meta = null;
  let withError = false;

  try {
    let params = { ..._params };
    let goodsRes = await api.getGoods(params);

    // Если по запросу товаров не нашлось,
    // пытаемся получить товары из предыдущего тега или категории
    if (!goodsRes.data.data.length) {
      if (currentTags.length > 1) {
        // Удаляем фильтры "дефектного" тега из параметров
        Object.keys(params).forEach((key) => {
          if (key.includes(`[filters][${currentTags.length - 1}]`)) {
            delete params[key];
          }
        });

        // Вырезаем "дефектный" тег
        currentTags.splice(currentTags.length - 1, 1);
      } else {
        const newParams = { ...params };

        // Удаляем фильтры "дефектного" тега из параметров
        Object.keys(params).forEach((key) => {
          if (key.includes(`[filters][${currentTags[0]}]`)) {
            delete params[key];
          }
        });

        // Вырезаем "дефектные" теги
        currentTags = [];
        params = newParams;
      }

      goodsRes = await api.getGoods(params);
      withError = true;
    }
    //

    products = normalizeGoods(goodsRes.data.data);

    meta = goodsRes.data.meta;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const text = formatAxiosError(error);
      console.error(text);
    } else {
      console.error('Error has occured:', error);
    }
  }

  return { products, meta, withError };
};
