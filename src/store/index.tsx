import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters';
import tagsReducer from './tags';
import goodsReducer from './goods';

const store = configureStore({
  reducer: {
    tags: tagsReducer,
    filters: filtersReducer,
    goods: goodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
