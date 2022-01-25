export interface IDictionaryItem {
  code: string;
  value: string;
  active?: boolean;
  data?: any;
}

export interface IDictionary {
  reject_reasons: IDictionaryItem[];
  taxation_system: IDictionaryItem[];
  russian_regions: IDictionaryItem[];
  company_types: IDictionaryItem[];
  categories: IDictionaryItem[];
}

export interface IAddDictionaryItemRequest {
  code: string;
  value: string;
  active: boolean;
  data?: any;
}
