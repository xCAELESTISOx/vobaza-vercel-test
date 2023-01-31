import axios from 'axios';

import { normalizeProductAttributes, normalizeProductInfo } from 'shared/lib/normalizers/normalizeGoods';
import { getProductBreadcrumbs } from 'shared/lib/categories/getCategoryBreadcrumps';
import { getProductOptions } from 'features/product-variation/lib/getProductOptions';
import { getProductInitialOptions } from './getProductInitialOptions';
import { formatAxiosError } from 'shared/lib/formatAxiosError';

import { api } from 'app/api';

/** Получение SSR-пропсов на детальной странице товаров */
export const getFullProductProps = async ({ res, query }) => {
  const slug = getProductSlug(query.slug as string);
  const encodedSlug = encodeURI(slug);

  res.setHeader('Cache-Control', 'public, max-age=180, immutable');

  try {
    const productRes = await api.getGoodBySlug(encodedSlug);

    let product = normalizeProductInfo(productRes.data.data);

    const attributesRes = await api.getGoodAttributes(product.id);

    const attributes = normalizeProductAttributes(attributesRes.data.data);

    product = { ...product, attributes };

    const category = await api.getCategoryBySlug(product.main_category.slug);
    const { ancestors } = category.data.data;

    const breadcrumbs = getProductBreadcrumbs(ancestors, product.main_category);

    // Опции вариаций товаров
    const selectedOptions = getProductInitialOptions(product.variants, product.id);
    const options = getProductOptions(product.id, product.variants, selectedOptions);

    return {
      props: { product, options, breadcrumbs },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const text = formatAxiosError(err);
      console.error(text);
    } else {
      console.error(err);
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

const getProductSlug = (slug: string): string | null => {
  const parseSlug = slug.replace('/ekspress-dostavka', '');

  return parseSlug || null;
};
