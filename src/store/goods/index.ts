import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteGood } from 'components/Profile/Favorite/Item';
import Cookies from 'js-cookie';

import type { IGood, IGoodCard, IGoodCompare } from 'entities/products/model/IGood';

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
    /** Устанавливает новый список избранных товаров */
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.favoriteIds = action.payload;
    },
    /** Добавляет новый элемент список избранных товаров */
    addFavorite: (state, action: PayloadAction<IGood | IGoodCard>) => {
      state.favoriteIds = [...state.favoriteIds, action.payload.id];
    },
    /** Удаляет элемент из списка избранных товаров */
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
    },
    /** Устанавливает новый список товаров для сравнения */
    setCompare: (state, action: PayloadAction<number[]>) => {
      Cookies.set('compareIds', action.payload.toString());

      state.compareIds = action.payload;
    },
    /** Добавляет новый элемент в список товаров для сравнения */
    addCompare: (state, action: PayloadAction<number>) => {
      const newIds = [...state.compareIds, action.payload];
      Cookies.set('compareIds', newIds.toString());

      state.compareIds = newIds;
    },
    /** Добавляет элемент из списка товаров для сравнения */
    removeCompare: (state, action: PayloadAction<number>) => {
      const newIds = state.compareIds.filter((id) => id !== action.payload);
      Cookies.set('compareIds', newIds.toString());

      state.compareIds = newIds;
    },
    /** Устанавливает новое значение для количество товаров в корзине */
    setCartSize: (state, action: PayloadAction<number>) => {
      state.cartSize = action.payload;
    },
    /** Устанавливает флаг о наличии ошибок при работе с корзиной товаров */
    setCartError: (state, action: PayloadAction<boolean>) => {
      state.cartError = action.payload;
    },
    /** Увеличивает количество товаров в корзине на конкретное значение */
    addToCartSize: (state, action: PayloadAction<number>) => {
      state.cartSize = state.cartSize + action.payload;
    },
    /** Добавляет новый товар в корзину */
    addCartGood: (
      state,
      action: PayloadAction<{ quantity: number; good: IGoodCard | FavoriteGood | IGood | IGoodCompare }>
    ) => {
      state.cartSize = state.cartSize + action.payload.quantity;
      state.cartGood = action.payload.good;
    },
    /** Закрывает модальной окно корзины товаров */
    closeCartModal: (state) => {
      state.cartGood = null;
    },
    /** Устаналивает товар для "покупки в один клик", чем открывает соответствующее модальное окно */
    setOneClickGood: (state, action: PayloadAction<IGood | IGoodCompare>) => {
      state.oneClickGood = action.payload;
    },
    /** Закрывает модальной окно покупки товара "в один клик" */
    closeOneClickModal: (state) => {
      state.oneClickGood = null;
    },
    /** Тоггли мобильное меню */
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
