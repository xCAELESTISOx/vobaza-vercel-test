export const getParamsFromQuery = (
  params: { [key: string]: number | string | string[] | boolean },
  activeFilters: { [key: string]: string | string[] }
) => {
  const newParams = { ...params };
  if (activeFilters && Object.keys(activeFilters).length) {
    newParams['filter[include_variants]'] = true;
  }
  Object.entries(activeFilters).forEach((filter, index) => {
    newParams[`filter[filters][${index}][id]`] = filter[0];
    const filterValue = filter[1].toString().split('%-%');
    if (filterValue.length === 1) {
      const values = filterValue[0].split(',');
      values.forEach((value, valueIndex) => {
        newParams[`filter[filters][${index}][values][${valueIndex}]`] = value;
      });
    } else if (filterValue.length === 2) {
      newParams[`filter[filters][${index}][min]`] = filterValue[0];
      newParams[`filter[filters][${index}][max]`] = filterValue[1];
    }
  });

  return newParams;
};
