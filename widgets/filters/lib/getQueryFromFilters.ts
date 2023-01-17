import type { IFilterFront } from 'entities/filters';
import type { ITagFitlerFront } from 'entities/tags';

/** Превращает массив фильтров в query-параметры */
export const getQueryFromFilters = (filters: (IFilterFront | ITagFitlerFront)[]) => {
  const queryFilters: { [key: string]: string | string[] } = {};
  /** ID фильтра на случай, если при редактировании будет выбрано 0 вариантов */
  let excludeFilterId: number | null = null;

  filters.forEach((filter) => {
    if (filter.values && filter.values.length) {
      if (filter.display_type === 'NUMERIC_RANGE') {
        const multiplier = filter.value_type === 'PRICE' ? 100 : 1;
        const newValues = filter.values.map((i) => i * multiplier);
        queryFilters[filter.id] = `${newValues[0]}%-%${newValues[1]}`;
      } else {
        queryFilters[filter.id] = filter.values;
      }
    } else {
      excludeFilterId = filter.id;
    }
  });

  return { queryFilters, excludeFilterId };
};
