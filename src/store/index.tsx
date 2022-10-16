import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters';
import tagsReducer from './tags';

const store = configureStore({
  reducer: {
    tags: tagsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
