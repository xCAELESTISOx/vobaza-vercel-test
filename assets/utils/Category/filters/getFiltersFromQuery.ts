import type { IFilter, IFilterFront } from 'src/models/IFilter';

export const getFiltersFromQuery = (queryFilters: { [key: string]: string | string[] }, filters: IFilter[]) => {
  const newFilters: { [key: number]: IFilterFront } = {};
  Object.keys(queryFilters).forEach((key) => {
    const filter = filters.find((item) => item.id.toString() === key);

    let values = null;
    if (filter.type === 'NUMERIC_RANGE') {
      values = queryFilters[key].toString().split('%-%');
      if (filter.value_type === 'PRICE') {
        values = values.map((value) => value / 100);
      }
    } else {
      if (typeof queryFilters[key] === 'string') {
        values = [queryFilters[key]];
      } else {
        values = Array.from(queryFilters[key]);
      }
    }

    newFilters[key] = {
      id: filter.id,
      name: filter.name,
      type: filter.type,
      value_type: filter.value_type,
      values,
    };
  });

  return newFilters;
};
