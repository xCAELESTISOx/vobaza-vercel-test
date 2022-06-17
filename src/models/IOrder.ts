import type { Image } from '../../src/models/IImage';
import { ElevatorType } from './IAddress';

export interface ILocalOrderDelivery {
  name: string;
  price: number;
  tag: EOrderDeliveryType;
  date?: Date | null;
  time?: {
    value: string;
  };
  min_date: string;
}
export enum EOrderDeliveryType {
  none = 'NONE',
  normal = 'NORMAL',
  express = 'EXPRESS',
}

export const orderDeliveryTypeDictionary = {
  [EOrderDeliveryType.none]: 'Оформить заказ с менеджером',
  [EOrderDeliveryType.normal]: 'Доставка',
  [EOrderDeliveryType.express]: 'Экспресс-доставка ',
};
export interface IOrderAddress {
  address: string;
  entrance?: string;
  intercom?: string;
  floor: string | number;
  elevator?: ElevatorType;
  flat?: string;
}

export interface IOrderCustomer {
  name: string;
  surname?: string;
  phone: string;
  email?: string;
}

export interface IOrderDelivery {
  type: EOrderDeliveryType;
  date?: Date | string | null;
  time_interval?: { from: string; to: string };
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
  time_slots?: { from: string; to: string }[];
  types?: IDeliveryType[];
}

export interface ICreateOrder {
  customer: IOrderCustomer;
  delivery: IOrderDelivery;
  recipient?: {
    name: string;
    phone: string;
  };
  assembly?: {
    product_ids: number[];
  };
  lift?: {
    full_order?: boolean;
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

export interface ILocalOrder {
  delivery: ILocalOrderDelivery | null;
  address: IOrderAddress;
  // customer: IReceiver;
  recipient?: {
    name: string;
    phone: string;
  };
  assembly?: {
    product_ids: number[];
  };
  /** Если lift Не передается, значит услуга подъёма на этаж не требуется */
  lift?: {
    elevator: ElevatorType;
    full_order?: boolean;
  };
}

export interface IOrderItem {
  id: number | string;
  number: string;
  order_date: string;
  price: number;
  status: 'NEW';
  products_images: {
    product_id: number;
    image: Image;
  }[];
  delivery: IOrderDelivery;
}
export interface IOrderItemFull {
  id: number | string;
  number: string;
  order_date: string;
  price: number;
  status: 'NEW';
  customer: IOrderCustomer;
  payment: {
    status: 'NOT_PAID';
    type: 'ON_DELIVERY';
  };
  delivery: IOrderDelivery;
  products: {
    name: string;
    sku: string;
    quantity: number;
    item_price: number;
    item_list_price: number;
    price: number;
    image: Image;
  }[];
}
