import { useEffect, useState } from 'react';

import type { IGood, IGoodCard } from '../../entities/products/model/IGood';
import { addFavorite, removeFavorite } from 'src/store/goods';
import { useSelector } from './useSelector';
import { useDispatch } from './useDispatch';

import { api } from '../../app/api/index';

export const useFavorite = (good: IGood | IGoodCard) => {
  const [currentFavorite, setCurrentFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const favoriteIds = useSelector((state) => state.goods.favoriteIds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favoriteIds && favoriteIds.includes(good.id)) {
      setCurrentFavorite(true);
    } else {
      setCurrentFavorite(false);
    }
  }, [favoriteIds, good.id]);

  const toggleFavorite = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      if (currentFavorite) {
        await api.deleteGoodFavorite(good.id);
        dispatch(removeFavorite(good.id));
      } else {
        await api.setGoodFavorite(good.id);
        dispatch(addFavorite(good));
      }
      setCurrentFavorite(!currentFavorite);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return { currentFavorite, toggleFavorite };
};
