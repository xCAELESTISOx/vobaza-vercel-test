import React, { FC, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { setCartSize, setCompare, setFavorites } from 'src/store/goods';
import { useSelector } from 'shared/lib/hooks/useSelector';
import { getCartData } from './libs/getCartData';
import { useMenu } from './libs/hooks/useMenu';

import { HeaderTop } from './ui/HeaderTop';
import { HeaderBody } from './ui/HeaderBody';
import { HeaderMenu } from './ui/HeaderMenu';

import { api } from 'app/api';

type Props = {
  openPhoneCallModal: () => void;
};

const Header: FC<Props> = ({ openPhoneCallModal }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const router = useRouter();

  const menus = useMenu();

  const setCompareFromCookie = () => {
    const ids = Cookies.get('compareIds');
    if (ids) {
      dispatch(setCompare(ids.split(',').map(Number)));
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
