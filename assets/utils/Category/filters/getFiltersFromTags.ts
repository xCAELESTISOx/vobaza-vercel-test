import { ICategoryTag } from 'src/models/ICategoryTag';
import { IFilter, IFilterFront } from 'src/models/IFilter';

export const getFiltersFromTags = (tags: ICategoryTag[], filters: IFilter[]): { [key: number]: IFilterFront } => {
  const newFilters = {};
  tags.forEach(({ filter: tagFilter, slug }) => {
    const matchingFilter = filters.find((filter) => filter.id === tagFilter.id);

    const newFilterValue: IFilterFront = {
      ...tagFilter,
      name: matchingFilter.name,
      tag_slug: slug,
    };

    newFilters[tagFilter.id] = newFilterValue;
  });

  return newFilters;
};
