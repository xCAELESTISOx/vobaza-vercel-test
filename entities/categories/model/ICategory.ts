import type { Image } from '../../../src/models/IImage';

export type CategoryStatus = 'ACTIVE' | 'NOT_ACTIVE' | 'HIDDEN';

export interface ICategory {
  id: number | string;
  slug: string;
  name: string;
  title: string;
  status: CategoryStatus;
  parent_id?: number | string;
  products_count?: number;
  active_products_count?: number;
  children_count?: number;
  created_at?: string;
  updated_at?: string;
  children?: ICategory[];
  ancestors?: ICategory[];
  code?: string;
  attributes?: Array<object>;
  image?: Image;
  // SEO
  seo_title?: string;
  seo_description?: string;
  description?: string;
  keywords?: string;
}

export const CategoryStatusDictionary: Record<CategoryStatus, string> = {
  ACTIVE: 'Активна',
  NOT_ACTIVE: 'Неактивна',
  HIDDEN: 'Скрыта',
};
