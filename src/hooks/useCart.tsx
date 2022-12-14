import { useState } from 'react';

import { api } from '../../app/api';

import type { IGood, IGoodCard, IGoodCompare } from '../../entities/products/model/IGood';
import type { FavoriteGood } from '../../components/Profile/Favorite/Item';
import { addCartGood, setCartError } from 'src/store/goods';
import { useDispatch } from './useDispatch';

export const useCart = (good: IGoodCard | FavoriteGood | IGood | IGoodCompare) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const addToCart = async (quantity = 1) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await api.addGoodToCart(good.id, { quantity });
      dispatch(addCartGood({ good, quantity: response.data.data.changed_quantity }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.errors[0].code === '1') {
        dispatch(setCartError(true));
      }
    }
  };

  return { addToCart };
};
