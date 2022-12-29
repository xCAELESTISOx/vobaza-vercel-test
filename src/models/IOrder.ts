import type { Image } from '../../src/models/IImage';
import type { ElevatorType, IAddressFull } from './IAddress';

import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';

export interface ILocalOrderDelivery {
  name: string;
  price: number;
  tag: EOrderDeliveryType;
  date?: Date | null;
  time?: Variant<string>;
  min_date: string;
}
export enum EOrderDeliveryType {
  none = 'NONE',
  normal = 'NORMAL',
  express = 'EXPRESS',
  self = 'SELF',
}
export interface IOrderAddress extends Omit<IAddressFull, 'id' | 'is_default'> {
  id?: number;
}
export interface IOrderCustomer {
  name: string;
  surname?: string;
  phone: string;
  email?: string;
}

export interface IOrderPrice {
  price: number;
  list_price?: number;
  discount?: number;
  services_price: number;
}
export interface ITimeInterval {
  from: string;
  to: string;
}

export interface IOrderDelivery {
  type: EOrderDeliveryType;
  date?: Date | string | null;
  time_interval?: ITimeInterval;
  address: IOrderAddress;
}

export interface IAuthOrderDelivery extends Omit<IOrderDelivery, 'address'> {
  address_id: number;
}

interface IDeliveryType {
  name: string;
  price: number;
  tag: EOrderDeliveryType;
  date: Date | null;
  time: null;
  min_date: Date;
}

export interface IDeliveryVariants {
  time_slots?: ITimeInterval[];
  types?: IDeliveryType[];
}

export interface ILocalOrder {
  delivery: ILocalOrderDelivery | null;
  self_delivery?: {
    date: string;
    time_interval: ITimeInterval;
  };
  address: IOrderAddress;
  // customer: IReceiver;
  recipient?: {
    name: string;
    phone: string;
  };
  assembly?: {
    /** Используется, если нет full_order */
    product_ids?: number[];
    /** Используется, если нет product_ids */
    full_order?: boolean;
  } | null;
  /** Если lift Не передается, значит услуга подъёма на этаж не требуется */
  lift?: {
    elevator: ElevatorType;
    full_order?: boolean;
  };
}
export interface IOrder {
  id: number | string;
  number: string;
  order_date: string;
  price: number;
  status: keyof typeof OrderStatusType;
  products_images: {
    product_id: number;
    image: Image;
  }[];
  obtaining: {
    obtaining_type: 'DELIVERY' | 'SELF_DELIVERY';
    delivery?: IOrderDelivery;
    self_delivery?: {
      date: string;
      time_interval: ITimeInterval;
    };
  };
  payment_status: string;
}
export interface IFullOrderDelivery {
  address: {
    address: string;
    flat: string | number;
    entrance: string | number;
    floor: number;
    intercom: string | number;
    elevator: ElevatorType;
  };
  status: string;
  type: string;
  time_interval: ITimeInterval;
  date?: string;
}

export enum OrderStatusType {
  NEW = 'NEW',
  CONFIRMED = 'CONFIRMED',
  NOT_RESERVED = 'NOT_RESERVED',
  PARTLY_RESERVED = 'PARTLY_RESERVED',
  RESERVED = 'RESERVED',
  ASSEMBLED = 'ASSEMBLED',
  PICKED = 'PICKED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  IN_PROBLEM = 'IN_PROBLEM',
  COMPLETED = 'COMPLETED',
}

export type OrderPaymentStatus = 'NOT_PAID' | 'PAID' | 'PARTIALLY_PAID';

export enum EOrderPaymentMethod {
  CARD = 'CARD',
  CASH = 'CASH',
  BANK_WIRE = 'BANK_WIRE',
}
export interface IOrderItemFull {
  id: number | string;
  number: string;
  order_date: string;
  customer: IOrderCustomer;
  price: IOrderPrice;
  status: keyof typeof OrderStatusType;
  payment_status: OrderPaymentStatus;
  obtaining: {
    obtaining_type: 'DELIVERY' | 'SELF_DELIVERY';
    delivery?: IFullOrderDelivery;
    self_delivery?: {
      date: string;
      time_interval: ITimeInterval;
    };
  };
  products: {
    name: string;
    sku: string;
    quantity: number;
    item_price: number;
    price: number;
    item_list_price: number;
    image: Image;
    slug: string;
    seo?: {
      page_name?: string;
    }
  }[];
  item_list_price: number;
  recipient: {
    name: string;
    phone: string;
  };
  order_weight?: number;
}

export interface ICreateOrder {
  customer: IOrderCustomer;

  obtaining: {
    obtaining_type: 'DELIVERY' | 'SELF_DELIVERY';
    delivery?: IOrderDelivery;
  };
  recipient?: {
    name: string;
    phone: string;
  };
  assembly?: {
    product_ids: number[];
  };
}

export interface ICreateAuthOrder extends Omit<ICreateOrder, 'lift' | 'delivery'> {
  delivery: IAuthOrderDelivery;
  /** Если lift Не передается, значит услуга подъёма на этаж не требуется */
  lift?: {
    elevator: ElevatorType;
    floor: number;
    full_order?: boolean;
  };
}
