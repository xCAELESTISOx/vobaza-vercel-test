import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { useGoods } from '../../../src/context/goods';
import { useAuth } from '../../../src/context/auth';
import type { IMenuItem } from 'src/models/IMenu';

import { HeaderTop } from './HeaderTop';
import { HeaderBody } from './HeaderBody';
import { HeaderMenu } from './HeaderMenu';

import { api } from 'assets/api';

type Props = {
  openPhoneCallModal: () => void;
};

const Header: FC<Props> = ({ openPhoneCallModal }) => {
  const [menus, setMenus] = useState<{ main: IMenuItem[]; side: IMenuItem[]; mobile: IMenuItem[] }>(null);

  const { dispatch } = useGoods();
  const { state } = useAuth();
  const { isLoggedIn } = state;

  const setCompareFromCookie = () => {
    const ids = Cookies.get('compareIds');
    if (ids) {
      dispatch({
        type: 'setCompare',
        payload: ids.split(',').map((id) => +id),
      });
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

  return (
    <header>
      <HeaderTop />
      <HeaderBody openPhoneCallModal={openPhoneCallModal} mobileMenu={menus?.mobile} />
      <HeaderMenu mainMenu={menus?.main} sideMenu={menus?.side} />
    </header>
  );
};

export default Header;
