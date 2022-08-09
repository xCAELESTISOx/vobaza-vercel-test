import type { Image } from '../../src/models/IImage';
import { ElevatorType, IAddressFull } from './IAddress';

import { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';

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
}

export const orderDeliveryTypeDictionary = {
  [EOrderDeliveryType.none]: 'Оформить заказ с менеджером',
  [EOrderDeliveryType.normal]: 'Доставка',
  [EOrderDeliveryType.express]: 'Экспресс-доставка ',
};

export interface IOrderAddress extends Omit<IAddressFull, 'id' | 'is_default'> {
  id?: number;
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
    /** Используется, если нет full_order */
    product_ids?: number[];
    /** Используется, если нет product_ids */
    full_order?: boolean;
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
export interface IFullOrderDelivery {
  address: {
    address: string,
    flat: string | number,
    entrance: string | number,
    floor: number,
    intercom: string | number,
    elevator: ElevatorType
  },
  status: string,
  type: string
  time_interval: {
    from: string
    to: string
  }
}

export enum OrderStatusType {
  NEW = "NEW",
  CONFIRMED="CONFIRMED",
  NOT_RESERVED="NOT_RESERVED",
  RESERVED= "RESERVED",
  ASSEMBLED="ASSEMBLED",
  PICKED="PICKED",
  DELIVERED="DELIVERED",
  CANCELLED="CANCELLED",
  IN_PROBLEM="IN_PROBLEM",
  COMPLETED="COMPLETED"
}

export interface IOrderItemFull {
  id: number | string;
  number: string,
  order_date: string,
  customer: IOrderCustomer,
  price: number,
  status: keyof typeof OrderStatusType,
  payment: {
    status: string,
    type: string,
    method: string
  },
  obtaining: {
    obtaining_type: string,
    delivery: IFullOrderDelivery
  },
  products: {
    name: string,
    sku: string,
    quantity: number,
    item_price: number,
    price: number,
    item_list_price: number,
    image: Image
  }[],
  item_list_price: number,
  recipient: {
    name: string,
    phone: string
  }
}
