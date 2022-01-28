import { IDictionaryItem } from './IDictionary';

export interface IMerchant {
  id: string | number;
  status: string;
  legal_name: string;
  brand: string;
  phone: string;
  provider_type: string;
  company_type: IDictionaryItem;
}
