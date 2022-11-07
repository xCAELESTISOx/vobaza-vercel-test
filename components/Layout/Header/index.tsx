import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import type { IMenuItem } from 'src/models/IMenu';
import type { ICartGood } from 'components/Cart/ListItem';
import { useAuth } from '../../../src/context/auth';
import { useDispatch } from 'src/hooks/useDispatch';
import { setCompare } from 'src/store/goods';

import { HeaderTop } from './HeaderTop';
import { HeaderBody } from './HeaderBody';
import { HeaderMenu } from './HeaderMenu';

import { api } from 'assets/api';
import checkAuth from 'assets/api/auth';

const getCartData = async () => {
  let initialGoods: ICartGood[] = [];
  let initialPrice = 0;
  let withCountChange = false;

  try {
    await checkAuth({ cookies: { token: Cookies.get('token') } }, true);
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

type Props = {
  openPhoneCallModal: () => void;
};

const Header: FC<Props> = ({ openPhoneCallModal }) => {
  const [menus, setMenus] = useState<{ main: IMenuItem[]; side: IMenuItem[]; mobile: IMenuItem[] }>(null);

  const dispatch = useDispatch();

  const { state } = useAuth();
  const { isLoggedIn } = state;
  const router = useRouter();

  const setCompareFromCookie = () => {
    const ids = Cookies.get('compareIds');
    if (ids) {
      dispatch(setCompare(ids.split(',').map(Number)));
    }
  };

  const getMenus = async () => {
    try {
      const [topMenuRes, sideMenuRes, mobileMenuRes] = await Promise.all([
        api.getMenu('TOP'),
        api.getMenu('LEFT_SIDE'),
        api.getMenu('MOBILE'),
      ]);

      const newMenus = {
        main: topMenuRes.data.data,
        side: sideMenuRes.data.data,
        mobile: mobileMenuRes.data.data,
      };

      setMenus(newMenus as any);
    } catch (error) {
      console.error(error);
    }
  };

  const getGlobalInfo = async () => {
    try {
      const globalInfoRes = await api.getGlobalInfo();
      if (globalInfoRes) {
        dispatch({
          type: 'setFavorites',
          payload: globalInfoRes.data.data.favorite_products_ids,
        });
        dispatch({
          type: 'setCartSize',
          payload: globalInfoRes.data.data.basket_size,
        });
        if (globalInfoRes.data.data.compare_products_ids) {
          dispatch({
            type: 'setCompare',
            payload: globalInfoRes.data.data.compare_products_ids,
          });
        } else {
          setCompareFromCookie();
        }
      } else {
        setCompareFromCookie();
      }
    } catch (error) {
      console.error(error);
      setCompareFromCookie();
    }
  };
  useEffect(() => {
    getGlobalInfo();
    getMenus();
  }, [isLoggedIn]);

  const setCartData = async () => {
    const cartData = await getCartData();

    const newCartSize = cartData.initialGoods.reduce((acc, item) => acc + item.quantity, 0);

    dispatch({
      type: 'setCartSize',
      payload: newCartSize,
    });
  };

  useEffect(() => {
    if (router.asPath !== '/cart') setCartData();
  }, [router.asPath]);

  return (
    <header>
      <HeaderTop />
      <HeaderBody openPhoneCallModal={openPhoneCallModal} mobileMenu={menus?.mobile} />
      <HeaderMenu mainMenu={menus?.main} sideMenu={menus?.side} />
    </header>
  );
};

export default Header;
