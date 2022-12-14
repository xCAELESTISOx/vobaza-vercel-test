import { AttributeDataType } from 'src/models/IAttributes';
import { IFilterFront } from 'entities/filters/model/IFilter';

export interface ITag {
  id: number;
  slug: string;
  name: string;
  title?: string;
  description?: string;
  keywords?: string;
  page_title?: string;
  filters: ITagFitlerFront[];
  tags?: ITag[];
  type: 'FILTER' | 'REDIRECT';
  redirect_url?: string;
  url: string;
}

export interface ITagFitlerFront extends Omit<IFilterFront, 'name' | 'values'> {
  data_type: AttributeDataType;
  values?: string[];
  min?: number;
  max?: number;
  name?: string;
}
