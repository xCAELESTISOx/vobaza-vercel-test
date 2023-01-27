import { useEffect, useState } from 'react';

import type { IMenuItem } from 'src/models/IMenu';

import { api } from 'app/api';

type UseMenu = () => { main: IMenuItem[]; side: IMenuItem[]; mobile: IMenuItem[] } | null;

//
export const useMenu: UseMenu = () => {
  const [menus, setMenus] = useState<{ main: IMenuItem[]; side: IMenuItem[]; mobile: IMenuItem[] }>(null);
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchMobileMenu = async () => {
    setLoading(true);
    try {
      const resp = await api.getMenu('MOBILE');
      const mobile = resp?.data.data;
      setMenus((prev) => ({ ...prev, mobile }));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchDesktopMenus = async () => {
    setLoading(true);
    try {
      const [topMenuRes, sideMenuRes] = await Promise.all([api.getMenu('TOP'), api.getMenu('LEFT_SIDE')]);

      const fetchedDesktopMenus = {
        main: topMenuRes.data.data,
        side: sideMenuRes.data.data,
      };

      setMenus((prev) => {
        return { ...prev, ...fetchedDesktopMenus };
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth === null || isLoading) return;

    const isMobile = screenWidth <= 1080;

    if (isMobile && !menus?.mobile?.length) {
      fetchMobileMenu();
    } else if (!isMobile && !menus?.main?.length) {
      fetchDesktopMenus();
    }
  }, [screenWidth]);

  return menus;
};
