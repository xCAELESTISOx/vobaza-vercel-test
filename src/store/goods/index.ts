import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteGood } from 'components/Profile/Favorite/Item';
import Cookies from 'js-cookie';

import type { IGood, IGoodCard, IGoodCompare } from 'src/models/IGood';

interface IGoodsState {
  favoriteIds: number[];
  compareIds: number[];
  cartSize: number;
  cartError: boolean;
  cartGood?: IGoodCard | FavoriteGood | IGood | IGoodCompare | null;
  oneClickGood?: IGood | IGoodCompare | null;
  activeMobCatalog: boolean;
}

const initialState: IGoodsState = {
  favoriteIds: [],
  compareIds: [],
  cartSize: 0,
  cartError: false,
  activeMobCatalog: false,
};

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.favoriteIds = action.payload;
    },
    addFavorite: (state, action: PayloadAction<IGood | IGoodCard>) => {
      state.favoriteIds = [...state.favoriteIds, action.payload.id];
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
    },
    setCompare: (state, action: PayloadAction<number[]>) => {
      Cookies.set('compareIds', action.payload.toString());

      state.compareIds = action.payload;
    },
    addCompare: (state, action: PayloadAction<number>) => {
      const newIds = [...state.compareIds, action.payload];
      Cookies.set('compareIds', newIds.toString());

      state.compareIds = newIds;
    },
    removeCompare: (state, action: PayloadAction<number>) => {
      const newIds = state.compareIds.filter((id) => id !== action.payload);
      Cookies.set('compareIds', newIds.toString());

      state.compareIds = newIds;
    },
    setCartSize: (state, action: PayloadAction<number>) => {
      state.cartSize = action.payload;
    },
    setCartError: (state, action: PayloadAction<boolean>) => {
      state.cartError = action.payload;
    },
    addToCartSize: (state, action: PayloadAction<number>) => {
      state.cartSize = state.cartSize + action.payload;
    },
    addCartGood: (
      state,
      action: PayloadAction<{ quantity: number; good: IGoodCard | FavoriteGood | IGood | IGoodCompare }>
    ) => {
      state.cartSize = state.cartSize + action.payload.quantity;
      state.cartGood = action.payload.good;
    },
    closeCartModal: (state) => {
      state.cartGood = null;
    },
    setOneClickGood: (state, action: PayloadAction<IGood | IGoodCompare>) => {
      state.oneClickGood = action.payload;
    },
    closeOneClickModal: (state) => {
      state.oneClickGood = null;
    },
    toogleMobCatalog: (state, action: PayloadAction<boolean>) => {
      state.activeMobCatalog = action.payload;
    },
  },
});

export const {
  setFavorites,
  addFavorite,
  removeFavorite,
  setCompare,
  addCompare,
  removeCompare,
  setCartError,
  setCartSize,
  addToCartSize,
  addCartGood,
  closeCartModal,
  setOneClickGood,
  closeOneClickModal,
  toogleMobCatalog,
} = goodsSlice.actions;

export default goodsSlice.reducer;
