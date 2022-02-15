import { useState } from 'react';
import { api } from '../../assets/api';
import { useGoods } from '../context/goods';

import { IGood } from '../models/IGood';

export const useCart = (good: IGood) => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useGoods();

  const addToCart = async (quantity: number = 1) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await api.addGoodToCart(good.id, { quantity });
      dispatch({
        type: 'addCartGood',
        payload: { good, quantity: response.data.data.changed_quantity },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.errors[0].code === '1') {
        dispatch({
          type: 'setCartError',
          payload: true,
        });
      }
    }
  };

  return { addToCart };
};
