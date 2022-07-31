import { IFilterFront, ITagFitlerFront } from 'src/models/IFilter';

/** Функция преобразования фильтров в значения для query параметров */
export const getQueryFromFilters = (
  filters: (IFilterFront | ITagFitlerFront)[]
): {
  queryFilters: { [key: string]: string[] };
  /** ID фильтра на случай, если при редактировании будет выбрано 0 вариантов */
  excludeFilterId: number | null;
} => {
  let queryFilters = {};
  let excludeFilterId: number | null = null;

  filters.forEach((filter) => {
    if (filter.values && filter.values.length) {
      if (filter.type === 'NUMERIC_RANGE') {
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
