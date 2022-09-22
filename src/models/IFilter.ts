import { AttributeDataType } from './IAttributes';

export interface IFilter {
  id: number;
  name: string;
  value_type: 'NUMBER' | 'PRICE';
  visibility_type: 'MAIN' | 'ADDITIONAL';
  type: 'NUMERIC_RANGE' | 'LISTED';
  meta: {
    min?: number;
    max?: number;
    items?: string[];
  };
}

export interface IFilterFront {
  id: number;
  name: string;
  tag_slug?: string;
  value_type?: 'NUMBER' | 'PRICE';
  type: 'NUMERIC_RANGE' | 'LISTED';
  values: any[];
}

export interface ITagFitlerFront extends Omit<IFilterFront, 'name' | 'values'> {
  data_type: AttributeDataType;
  values?: string[];
  min?: number;
  max?: number;
  name?: string;
}
