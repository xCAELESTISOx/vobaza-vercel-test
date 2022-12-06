import type { Image } from './IImage';
import type { IDictionaryItem } from './IDictionary';
import type { CategoryStatus } from './ICategory';
import type { AttributeDataType, IAttribute, IAttributes } from './IAttributes';
import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';

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

export enum GoodsSortTypes {
  POPULARITY = 'По популярности',
  NEWNESS = 'Новинки выше',
  PRICE = 'Дешевые выше',
  '-PRICE' = 'Дорогие выше',
}

interface IСategory {
  id: number;
  name: string;
  slug: string;
  status: CategoryStatus;
}

export interface IGoodMerchant {
  id: number;
  status: keyof typeof StatusTypes;
  company_type: IDictionaryItem;
  legal_name: string;
  brand: string;
  phone: string;
  provider_type: keyof typeof ProviderTypes;
}

export interface IGoodDocument {
  id: number;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface IGoodCard {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  list_price?: number;
  merchant: IGoodMerchant;
  brand?: string;
  parent_categories: { id: number; name: string }[];
  labels?: IDictionaryItem[];
  main_image?: Image;
  variant_products?: IVariantProduct[];
  is_available: boolean;
  valuable_attributes?: {
    attribute: IAttribute;
    value: any;
  }[];
}

export type ProductVariantValue = boolean | number | string | number[] | string[];

/** Характеристика товаров вариации */
export interface IProductVariant<ValuesType = ProductVariantValue> {
  attribute: {
    data_type: AttributeDataType;
    id: number | string;
    name: string;
  };
  display: {
    display_type: 'IMAGE' | 'TITLE' | 'DROPDOWN' | 'CHOICE';
    /** Кол-во элементов. Имеется только когда display_type равен IMAGE или TITLE  */
    count?: number;
  };
  values: ValuesType[];
}

/** Товар вариации */
export interface IVariantProduct {
  id: number;
  sku: string;
  slug: string;
  main_image?: Image;
  attributes: { id: number; value: ProductVariantValue }[];
}

export interface IVariantsValueFront {
  is_current: boolean;
  value: Variant;
  product: IVariantProduct;
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
  subinfo?: string;

  inStonk?: boolean;
  loyaltyBonus?: number;

  creditMinimalPayment: number;

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

  similar_products: IGoodCard[];

  variants: {
    products: IVariantProduct[];
    variants: IProductVariant[];
  };

  warehouse: {
    id: number;
    name: string;
  };
  seo: {
    title: string;
    page_name: string;
    meta_description: string;
    keywords: string;
  };
  labels: IDictionaryItem[];
  attributes: IAttributes;
  documents?: IGoodDocument[];
  set: IGoodCard[];
}
export interface IGoodFront extends Omit<IGood, 'variants'> {
  variants: { products: IVariantProduct[]; variants: IProductVariant<Variant>[] };
}

export interface IGoodCompare {
  id: number;
  name: string;
  sku: string;
  slug: string;
  price: number;
  list_price?: number;
  is_available: boolean;
  main_image?: Image;
  attributes_value: {
    [id: number]: number | string | boolean;
  };
  brand: string;
  parent_categories: { id: number; name: string }[];
}

export const goodStatusDictionary = {
  [GoodStatus.ACTIVE]: 'Активный',
  [GoodStatus.MODERATION]: 'На модерации',
  [GoodStatus.CANCELLED]: 'С ошибкой',
  [GoodStatus.HIDDEN]: 'Скрытый',
  [GoodStatus.NOT_ACTIVE]: 'Выключенный',
  [GoodStatus.ARCHIVED]: 'Архив',
};
