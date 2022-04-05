import { Image } from './IImage';
import type { IDictionaryItem } from './IDictionary';

import { CategoryStatus } from './ICategory';

export enum GoodStatus {
  ACTIVE = 'ACTIVE',
  MODERATION = 'MODERATION',
  CANCELLED = 'CANCELLED',
  HIDDEN = 'HIDDEN',
  NOT_ACTIVE = 'NOT_ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum ProviderTypes {
  PRODUCTS = 'Товары',
  SERVICES = 'Услуги',
  SERVICES_AND_PRODUCTS = 'Товары и услуги',
}

export enum StatusTypes {
  NEW = 'Новый',
  MODERATION = 'Ожидает модерацию',
  ACTIVE = 'Подтвержден',
  CANCELLED = 'Отклонен',
  BLOCKED = 'Отключен',
  ARCHIVED = 'В архиве',
}

interface IСategory {
  id: number;
  name: string;
  slug: string;
  status: keyof typeof CategoryStatus;
}

interface IAttribute {
  //TODO enum
  data_type: string;
  id: number;
  name: string;
  required: boolean;
  slug: string;
  //TODO enum
  status: keyof typeof CategoryStatus;
  type: 'MAIN' | 'ADDITIONAL';
}

export interface IGoodMerchant {
  id: number;
  status: keyof typeof StatusTypes;
  company_type: IDictionaryItem;
  legal_name: string;
  brand: string;
  phone: string;
  provider_type: keyof typeof ProviderTypes;
};

export interface IGoodCard {
  id: number;
  slug: string;
  name: string;
  sku: string;
  price: number;
  list_price?: number;
  main_image?: Image;
  merchant: IGoodMerchant;
  labels?: IDictionaryItem[];
  valuable_attributes?: {
    attribute: IAttribute;
    value: any;
  }[];
  is_available: boolean;
}

export interface IGood {
  id: number;
  barcode: string;
  brand?: string;
  created_at: string;
  name: string;
  description_full: string;
  description_short: string;
  slug: string;
  sku: string;
  model?: string;
  images?: Image[];
  main_image?: Image;

  price: number;
  list_price?: number;
  quantity: number;
  minimal_order?: number;

  vat_type: string;
  status: keyof typeof GoodStatus;

  main_category: IСategory;
  other_categories: IСategory[];

  merchant: IGoodMerchant;
  merchant_sku: string;

  warehouse: {
    id: number;
    name: string;
  };
  seo: {
    title: string;
    page_name: string;
    meta_description: string;
  };
  labels: IDictionaryItem[];
  attributes: {
    attribute: IAttribute;
    value: any;
  }[];
  set: {}[];
}

export const goodStatusDictionary = {
  [GoodStatus.ACTIVE]: 'Активный',
  [GoodStatus.MODERATION]: 'На модерации',
  [GoodStatus.CANCELLED]: 'С ошибкой',
  [GoodStatus.HIDDEN]: 'Скрытый',
  [GoodStatus.NOT_ACTIVE]: 'Выключенный',
  [GoodStatus.ARCHIVED]: 'Архив',
};
