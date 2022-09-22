export const getParamsFromQuery = (
  params: { [key: string]: number | string | string[] | boolean },
  activeFilters: { [key: string]: string | string[] }
) => {
  const newParams = { ...params };

  if (activeFilters && Object.keys(activeFilters).length) {
    newParams['filter[include_variants]'] = true;
  }

  Object.entries(activeFilters).forEach(([key, value], index) => {
    newParams[`filter[filters][${index}][id]`] = key;
    const filterValue = value.toString().split('%-%');

    if (filterValue.length === 1) {
      const values = filterValue[0].split(',');
      values.forEach((value, valueIndex) => {
        newParams[`filter[filters][${index}][values][${valueIndex}]`] = value;
      });
    } else if (filterValue.length === 2) {
      const [min, max] = filterValue;
      newParams[`filter[filters][${index}][min]`] = min;
      newParams[`filter[filters][${index}][max]`] = max;
    }
  });

  return newParams;
};
