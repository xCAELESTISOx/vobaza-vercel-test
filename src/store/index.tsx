import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from './filters';
import tagsReducer from './tags';
import goodsReducer from './goods';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tags: tagsReducer,
    filters: filtersReducer,
    goods: goodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
