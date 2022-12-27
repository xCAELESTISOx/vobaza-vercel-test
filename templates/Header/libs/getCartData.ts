import Cookies from 'js-cookie';

import type { ICartGood } from 'components/Cart/ListItem';

import checkAuth from 'app/api/auth';
import { api } from 'app/api';

export const getCartData = async () => {
  let initialGoods: ICartGood[] = [];
  let initialPrice = 0;
  let withCountChange = false;

  try {
    const authorized = await checkAuth({ cookies: { token: Cookies.get('token') } }, true);
    if (!authorized) return { initialGoods, initialPrice, withCountChange };
    const cartRes = await api.getCart();

    const cart = cartRes.data.data;

    initialPrice = cart.order_price / 100;
    initialGoods = cart.products.map((good) => {
      return {
        quantity: good.quantity,
        price: good.price / 100,
        list_price: good.list_price / 100,
        product: {
          ...good.product,
          price: good.product.price / 100,
          list_price: good.product.list_price ? good.product.list_price / 100 : null,
        },
      };
    });

    if (cart.basket_changed) {
      withCountChange = true;
    }
  } catch (error) {
    console.error(error);
    return {
      initialGoods,
      initialPrice,
      withCountChange,
    };
  }

  return {
    initialGoods,
    initialPrice,
    withCountChange,
  };
};
