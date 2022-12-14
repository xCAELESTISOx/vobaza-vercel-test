import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ITag } from 'entities/tags';

interface ITagsState {
  tags: ITag[];
  currentTags: ITag[];
  hasInvalidTags: boolean;
}

const initialState: ITagsState = {
  tags: [],
  currentTags: [],
  hasInvalidTags: false,
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    /** Устанавливает базовые теги */
    setTags: (state, action: PayloadAction<ITag[]>) => {
      state.tags = action.payload;
      state.currentTags = [];
      state.hasInvalidTags = false;
    },
    /** Устанавливает текущие (примененные) теги */
    setCurrentTags: (state, action: PayloadAction<ITag[]>) => {
      state.currentTags = action.payload;
    },
    /** Указывает, что в урле есть невалидный тег */
    markTagsAsInvalid: (state) => {
      state.hasInvalidTags = true;
    },
    /** Делает ресет стейта тегов */
    resetTags: (state) => {
      state.currentTags = [];
      state.tags = [];
      state.hasInvalidTags = false;
    },
  },
});

export const { setTags, setCurrentTags, markTagsAsInvalid, resetTags } = tagsSlice.actions;

export default tagsSlice.reducer;
