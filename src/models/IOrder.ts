import type { Image } from '../../src/models/IImage';

export interface IOrderDelivery {
  name: string,
  price: number,
  tag: IOrderDeliveryType,
  date?: string,
  time?: {
    code: string,
    value: string,
  },
}
export enum IOrderDeliveryType {
  none = "NONE",
  normal = "NORMAL",
  express = "EXPRESS"
}

export const orderDeliveryTypeDictionary = {
  [IOrderDeliveryType.none]: 'Оформить заказ с менеджером',
  [IOrderDeliveryType.normal]: 'Доставка',
  [IOrderDeliveryType.express]: 'Экспресс-доставка ',
};
export interface IOrderAddress {
  address: string,
  flat?: string,
  entrance?: string,
  floor?: string | number,
  intercom?: string,
  elevator?: boolean,
}

export interface IOrderCustomer {
  name: string,
  surname?: string,
  phone: string,
  email?: string,
}

export interface IOrderDelivery {
  type: IOrderDeliveryType,
  date?: string,
  time_interval?: string,
  address: IOrderAddress,
  status?: 'NONE'
}



export interface IOrder {
  customer: IOrderCustomer;
  delivery: IOrderDelivery;
}
export interface IOrderItem {
  id: number | string,
  number: string,
  order_date: string,
  price: number,
  status: 'NEW',
  products_images: {
    product_id: number,
    image: Image,
  }[],
  delivery: IOrderDelivery,
}
export interface IOrderItemFull {
  id: number | string,
  number: string,
  order_date: string,
  price: number,
  status: 'NEW',
  customer: IOrderCustomer,
  payment: {
    status: 'NOT_PAID',
    type: 'ON_DELIVERY',
  }
  delivery: IOrderDelivery,
  products: {
    name: string,
    sku: string,
    quantity: number,
    item_price: number,
    item_list_price: number,
    price: number,
    image: Image,
  }[]
}
