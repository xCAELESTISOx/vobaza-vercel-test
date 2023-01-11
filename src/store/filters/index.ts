import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IFilter, IFilterFront } from 'entities/filters/model/IFilter';

interface IFiltersState {
  baseFilters: IFilter[];
  filters: IFilter[];
  currentFilters: Record<number, IFilterFront> | null;
  hasInvalidFilters: boolean;
}

const initialState: IFiltersState = {
  baseFilters: [],
  filters: [],
  currentFilters: null,
  hasInvalidFilters: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    /** Устанавливает базовые фильтры (без ограничений по уже примененным) */
    setBaseFilters: (state, action: PayloadAction<IFilter[]>) => {
      state.baseFilters = action.payload;
    },
    /** Устанавливает фильтры */
    setFilters: (state, action: PayloadAction<IFilter[]>) => {
      state.filters = action.payload;
    },
    /** Устанавливает текущие (примененные) фильтры */
    setCurrentFilters: (state, action: PayloadAction<Record<number, IFilterFront>>) => {
      state.currentFilters = action.payload;
      state.hasInvalidFilters = false;
    },
    /** Указывает, что в урле есть невалидный фильтр */
    markFiltersAsInvalid: (state) => {
      state.hasInvalidFilters = true;
      state.currentFilters = null;
    },
    /** Делает ресет стейта фильтров */
    resetFilters: (state) => {
      state.baseFilters = [];
      state.filters = [];
      state.currentFilters = null;
      state.hasInvalidFilters = false;
    },
  },
});

export const { setBaseFilters, setFilters, setCurrentFilters, markFiltersAsInvalid, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
