import { useEffect, useState } from 'react';

import { api } from '../../assets/api/index';
import { useGoods } from '../context/goods';

import { IGood } from '../models/IGood';

export const useFavorite = (good: IGood) => {
  const [currentFavorite, setCurrentFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useGoods();
  const { favoriteIds } = state;

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
        dispatch({ type: 'removeFavorite', payload: good.id });
      } else {
        await api.setGoodFavorite(good.id);
        dispatch({ type: 'addFavorite', payload: good });
      }
      setCurrentFavorite(!currentFavorite);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return { currentFavorite, toggleFavorite };
};
