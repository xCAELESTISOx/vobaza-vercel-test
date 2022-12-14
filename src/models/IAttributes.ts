import { CategoryStatus } from '../../entities/categories/model/ICategory';

import type { IDictionaryItem } from './IDictionary';

export enum AttributeStatus {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE',
  HIDDEN = 'HIDDEN',
}

export enum AttributeType {
  MAIN = 'MAIN',
  ADDITIONAL = 'ADDITIONAL',
}

export type AttributeDataType =
  | 'INTEGER'
  | 'DECIMAL'
  | 'COLOR'
  | 'STRING'
  | 'DATE'
  | 'BOOLEAN'
  | 'MANY_FROM_MANY'
  | 'ONE_FROM_MANY';

export interface IAttributeRelatedCategory {
  id: number;
  name: string;
  status: CategoryStatus;
}

export interface IAttribute {
  id: string | number;
  name: string;
  status: keyof typeof AttributeStatus;
  type: keyof typeof AttributeType;
  data_type: AttributeDataType;
  required: boolean;
  data_meta?: {
    items: string[] | IDictionaryItem[];
  };
  categories?: IAttributeRelatedCategory[];
}

export interface IAttributeCompare {
  id: string | number;
  name: string;
  data_type: AttributeDataType;
}

export interface IAttributeItem {
  attribute: IAttribute;
  value?: any;
}

export interface IAttributes {
  main: IAttributeItem[];
  additional?: Array<{
    category: IAttributeRelatedCategory;
    attributes: IAttributeItem[];
  }>;
}

export interface IAttributeColor {
  id: number;
  active: boolean;
  code: string;
  created_at: string;
  data: string | null;
  dictionary_id: number;
  updated_at: string;
  value: string;
}
