import type { Image } from './IImage';

export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE',
  HIDDEN = 'HIDDEN',
}

export interface ICategory {
  id: number | string;
  name: string;
  title: string;
  status: keyof typeof CategoryStatus;
  parent_id?: number | string;
  products_count?: number;
  active_products_count?: number;
  children_count?: number;
  created_at?: string;
  updated_at?: string;
  children?: ICategory[];
  ancestors?: ICategory[];
  description?: string;
  code?: string;
  keywords?: string;
  attributes?: Array<object>;
  image?: Image;
}

export const CategoryStatusDictionary = {
  [CategoryStatus.ACTIVE]: 'Активна',
  [CategoryStatus.NOT_ACTIVE]: 'Неактивна',
  [CategoryStatus.HIDDEN]: 'Скрыта',
};
