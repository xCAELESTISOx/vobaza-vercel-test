import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { IMenuItem } from 'src/models/IMenu';

interface IMenuState {
  sideMenu: IMenuItem[];
}

const initialState: IMenuState = {
  sideMenu: [],
};

export const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    /** Устанавливает сайд меню для каталога в футере */
    setMenu: (state, action: PayloadAction<IMenuItem[]>) => {
      state.sideMenu = action.payload;
    },
  },
});

export const { setMenu } = menusSlice.actions;

export default menusSlice.reducer;
