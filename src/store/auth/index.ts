import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthsState {
  isLoggedIn: boolean;
  isModalOpen: boolean;
  city: string | null;
}

const initialState: IAuthsState = {
  isLoggedIn: false,
  isModalOpen: false,
  city: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Отмечает пользователя авторизованным */
    login: (state) => {
      state.isLoggedIn = true;
    },
    /** Отмечает пользователя неавторизованным */
    logout: (state) => {
      state.isLoggedIn = false;
    },
    /** Тоггли видимость модального окна авторизации  */
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    /** Устанавливает основной город пользователя */
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { login, logout, toggleModal, setCity } = authSlice.actions;

export default authSlice.reducer;
