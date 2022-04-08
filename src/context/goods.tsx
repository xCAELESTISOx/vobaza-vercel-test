import * as React from 'react';
import { IGood, IGoodCard } from '../models/IGood';
import { FavoriteGood } from '../../components/Profile/Favorite/Item';

type Action =
  | { type: 'setFavorites'; payload: number[] }
  | { type: 'addFavorite'; payload: IGood | IGoodCard }
  | { type: 'removeFavorite'; payload?: number }
  | { type: 'setCartSize'; payload: number }
  | { type: 'setCartError'; payload: boolean }
  | { type: 'changeCartSize'; payload: number }
  | {
      type: 'addCartGood';
      payload: { good: IGoodCard | FavoriteGood | IGood; quantity: number };
    }
  | { type: 'closeCartModal' }
  | { type: 'setOneClickGood'; payload: IGood }
  | { type: 'closeOneClickModal' };
type Dispatch = (action: Action) => void;
type State = {
  favoriteIds: number[];
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
