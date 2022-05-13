import * as React from 'react';
import Cookies from 'js-cookie';

import { IGood, IGoodCard, IGoodCompare } from '../models/IGood';

import { FavoriteGood } from '../../components/Profile/Favorite/Item';

type Action =
  | { type: 'setFavorites'; payload: number[] }
  | { type: 'addFavorite'; payload: IGood | IGoodCard }
  | { type: 'removeFavorite'; payload?: number }
  | { type: 'setCompare'; payload: number[] }
  | { type: 'addCompare'; payload: number }
  | { type: 'removeCompare'; payload?: number }
  | { type: 'setCartSize'; payload: number }
  | { type: 'setCartError'; payload: boolean }
  | { type: 'changeCartSize'; payload: number }
  | {
      type: 'addCartGood';
      payload: {
        good: IGoodCard | FavoriteGood | IGood | IGoodCompare;
        quantity: number;
      };
    }
  | { type: 'closeCartModal' }
  | { type: 'setOneClickGood'; payload: IGood | IGoodCompare }
  | { type: 'closeOneClickModal' };
type Dispatch = (action: Action) => void;
type State = {
  favoriteIds: number[];
  compareIds: number[];
  cartSize: number;
  cartError: false;
  cartGood?: IGood | null;
  oneClickGood?: IGood | null;
};
type GoodsProviderProps = { children: React.ReactNode };

const GoodsStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function goodsReducer(state, action) {
  switch (action.type) {
    // Favorite
    case 'setFavorites': {
      return { ...state, favoriteIds: action.payload };
    }
    case 'addFavorite': {
      return {
        ...state,
        favoriteIds: [...state.favoriteIds, action.payload.id],
      };
    }
    case 'removeFavorite': {
      return {
        ...state,
        favoriteIds: state.favoriteIds.filter(
          (item) => item !== action.payload
        ),
      };
    }
    // Compare
    case 'setCompare': {
      Cookies.set('compareIds', action.payload);
      return { ...state, compareIds: action.payload };
    }
    case 'addCompare': {
      const newIds = [...state.compareIds, action.payload];
      // Cookies set жрет только значения типа string, используем any,
      // чтобы скормить массив насильно.
      Cookies.set('compareIds', newIds as any);

      return {
        ...state,
        compareIds: newIds,
      };
    }
    case 'removeCompare': {
      const newIds = state.compareIds.filter((item) => item !== action.payload);
      Cookies.set('compareIds', newIds);

      return {
        ...state,
        compareIds: newIds,
      };
    }
    // Cart
    case 'setCartSize': {
      return { ...state, cartSize: action.payload };
    }
    case 'changeCartSize': {
      return { ...state, cartSize: state.cartSize + action.payload };
    }
    case 'setCartError': {
      return { ...state, cartError: action.payload };
    }
    case 'addCartGood': {
      return {
        ...state,
        cartSize: state.cartSize + action.payload.quantity,
        cartGood: action.payload.good,
      };
    }
    case 'closeCartModal': {
      return {
        ...state,
        cartGood: null,
      };
    }
    // OneClick
    case 'setOneClickGood': {
      return {
        ...state,
        oneClickGood: action.payload,
      };
    }
    case 'closeOneClickModal': {
      return {
        ...state,
        oneClickGood: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GoodsProvider({ children }: GoodsProviderProps) {
  const [state, dispatch] = React.useReducer(goodsReducer, {
    favoriteIds: [],
    compareIds: [],
    cartSize: 0,
    cartError: false,
  });
  const value: any = { state, dispatch };

  return (
    <GoodsStateContext.Provider value={value}>
      {children}
    </GoodsStateContext.Provider>
  );
}

function useGoods() {
  const context = React.useContext(GoodsStateContext);
  if (context === undefined) {
    throw new Error('useGoods must be used within a GoodsProvider');
  }
  return context;
}

export { GoodsProvider, useGoods };
