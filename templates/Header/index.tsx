import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import type { IMenuItem } from 'src/models/IMenu';
import { useDispatch } from 'src/hooks/useDispatch';
import { setCartSize, setCompare, setFavorites } from 'src/store/goods';
import { useSelector } from 'src/hooks/useSelector';

import { HeaderTop } from './ui/HeaderTop';
import { HeaderBody } from './ui/HeaderBody';
import { HeaderMenu } from './ui/HeaderMenu';

import { api } from 'app/api';
import { getCartData } from './libs/getCartData';

type Props = {
  openPhoneCallModal: () => void;
};

const Header: FC<Props> = ({ openPhoneCallModal }) => {
  const [menus, setMenus] = useState<{ main: IMenuItem[]; side: IMenuItem[]; mobile: IMenuItem[] }>(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
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
        const { favorite_products_ids, basket_size, compare_products_ids } = globalInfoRes.data.data;

        dispatch(setFavorites(favorite_products_ids));
        dispatch(setCartSize(basket_size));

        if (compare_products_ids) {
          dispatch(setCompare(compare_products_ids));
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
