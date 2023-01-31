import type { ICartGood } from 'components/Cart/ListItem';
import type { FavoriteGood } from 'components/Profile/Favorite/Item';
import type { IGood, IGoodCard, IGoodCompare } from 'entities/products';

type IEcomProduct = {
  id: string | number;
  name: string;
  price: number;
  brand?: string;
  quantity?: number;
};

type Product = IEcomProduct | IGood | IGoodCompare | FavoriteGood | IGoodCard;

/** Контроллер действий для метрики */
export const metric = {
  /** Добавить продукт в корзину */
  addProduct: (product: Product, categoriesPath: string) => {
    (window as any).dataLayer = (window as any)?.dataLayer || [];
    (window as any)?.dataLayer?.push({
      ecommerce: {
        currencyCode: 'RUB',
        add: {
          products: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              brand: product.brand || '',
              category: categoriesPath,
              quantity: 1,
            },
          ],
        },
      },
    });
  },
  /** Удалить продукт из корзины */
  removeProduct: (product: ICartGood['product'], category: string, quantity: number) => {
    (window as any).dataLayer = (window as any)?.dataLayer || [];
    (window as any)?.dataLayer?.push({
      ecommerce: {
        currencyCode: 'RUB',
        remove: {
          products: [
            {
              id: product.id,
              name: product.name,
              brand: product.brand || '',
              category,
              quantity: quantity,
            },
          ],
        },
      },
    });
  },
  /** Оформление заказа */
  purchase: (products: IEcomProduct[], purchaseId: number | string) => {
    (window as any).dataLayer = (window as any)?.dataLayer || [];
    (window as any)?.dataLayer?.push({
      ecommerce: {
        currencyCode: 'RUB',
        purchase: {
          actionField: { id: purchaseId.toString() },
          products: products,
        },
      },
    });
  },
  /** Просмотр детальной информации о товаре */
  detail: (product: IGood) => {
    (window as any).dataLayer = (window as any)?.dataLayer || [];
    (window as any)?.dataLayer?.push({
      ecommerce: {
        currencyCode: 'RUB',
        detail: {
          products: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              brand: product.brand,
              category: product?.main_category.slug,
            },
          ],
        },
      },
    });
  },
};
