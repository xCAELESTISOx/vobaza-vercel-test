import * as React from 'react';
import { IGood } from '../models/IGood';

type Action =
  | { type: 'setFavorites'; payload?: number[] }
  | { type: 'addFavorite'; payload?: IGood }
  | { type: 'removeFavorite'; payload?: number }
  | { type: 'closeFavoriteModal' };
type Dispatch = (action: Action) => void;
type State = { favoritedGood?: IGood | null; favoriteIds: number[] };
type GoodsProviderProps = { children: React.ReactNode };

const GoodsStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function goodsReducer(state, action) {
  switch (action.type) {
    case 'setFavorites': {
      return { ...state, favoriteIds: action.payload };
    }
    case 'closeFavoriteModal': {
      return {
        ...state,
        favoritedGood: null,
      };
    }
    case 'addFavorite': {
      return {
        ...state,
        favoritedGood: action.payload,
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GoodsProvider({ children }: GoodsProviderProps) {
  const [state, dispatch] = React.useReducer(goodsReducer, {
    favoritedGood: null,
    favoriteIds: [],
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
