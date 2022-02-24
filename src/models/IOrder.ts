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
export interface IOrderAddress {
  address: string,
  flat?: string,
  entrance?: string,
  floor?: string | number,
  intercom?: string,
  elevator?: boolean,
}

export interface IOrder {
  customer: {
    name: string,
    surname?: string,
    phone: string,
    email?: string,
  };
  delivery: {
    type: IOrderDeliveryType,
    date?: string,
    time_interval?: string,
    address: IOrderAddress,
  };
}