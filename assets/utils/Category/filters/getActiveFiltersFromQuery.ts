import type { IFilter, IFilterFront } from 'src/models/IFilter';

type GetActiveFiltersFromQuery = { activeFilters: Record<number, IFilterFront> | null; hasInvalidFilters: boolean };

/** Получение активных фильтров по параметрам в URL`е и конвертирование их в формат IFilterFront */
export const getActiveFiltersFromQuery = (
  queryFilters: Record<string, string | string[]>,
  filters: IFilter[]
): GetActiveFiltersFromQuery => {
  let activeFilters: Record<number, IFilterFront> = {};
  let hasInvalidFilters = false;

  // Пробегаемся по активным фильтрам в query парметрах и формируем
  // на их основе объект Record<number, IFilterFront>
  Object.entries(queryFilters).forEach(([key, queryValue]) => {
    const filter = filters.find((item) => item.id.toString() === key);

    if (filter) {
      // Конвертация данных значений фильтра в зависимости от типа данных фильтра
      let values = null;
      if (filter.type === 'NUMERIC_RANGE') {
        values = queryValue.toString().split('%-%');
        if (filter.value_type === 'PRICE') {
          values = values.map((value) => value / 100);
        }
      } else {
        if (typeof queryValue === 'string') {
          values = [queryValue];
        } else {
          values = Array.from(queryValue);
        }
      }
      //

      activeFilters[key] = {
        id: filter.id,
        name: filter.name,
        type: filter.type,
        value_type: filter.value_type,
        values,
      };
    } else {
      // Отмечаем наличие невалидного фильтра в query параметрах URL`а
      hasInvalidFilters = true;
    }
  });
  //

  if (!Object.keys(activeFilters).length) activeFilters = null;

  return { activeFilters, hasInvalidFilters };
};
