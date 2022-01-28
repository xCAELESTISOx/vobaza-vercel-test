import { CategoryStatus } from './ICategory';

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

export enum AttributeDataType {
  INTEGER = 'INTEGER',
  DECIMAL = 'DECIMAL',
  COLOR = 'COLOR',
  STRING = 'STRING',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  MANY_FROM_MANY = 'MANY_FROM_MANY',
  ONE_FROM_MANY = 'ONE_FROM_MANY',
}

export interface IAttributeRelatedCategory {
  id: number;
  name: string;
  status: keyof typeof CategoryStatus;
}

export interface IAttribute {
  id: string | number;
  name: string;
  status: keyof typeof AttributeStatus;
  type: keyof typeof AttributeType;
  data_type: keyof typeof AttributeDataType;
  required: boolean;
  data_meta?: {
    items: string[] | IDictionaryItem[];
  };
  categories?: IAttributeRelatedCategory[];
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
