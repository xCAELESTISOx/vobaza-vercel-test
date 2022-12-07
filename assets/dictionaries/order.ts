import { EOrderDeliveryType, EOrderPaymentMethod, OrderPaymentStatus, OrderStatusType } from 'src/models/IOrder';

export const orderDeliveryTypeDictionary = {
  [EOrderDeliveryType.none]: 'Оформить заказ с менеджером',
  [EOrderDeliveryType.normal]: 'Доставка',
  [EOrderDeliveryType.express]: 'Экспресс-доставка ',
};

export const orderStatusDictionary = {
  [OrderStatusType.NEW]: 'Открыт',
  [OrderStatusType.CONFIRMED]: 'Подтвержден',
  [OrderStatusType.NOT_RESERVED]: 'Ожидает поступления',
  [OrderStatusType.PARTLY_RESERVED]: 'Частично зарезервирован',
  [OrderStatusType.RESERVED]: 'Зарезервирован',
  [OrderStatusType.ASSEMBLED]: 'Собран',
  [OrderStatusType.PICKED]: 'Передан курьерской компании',
  [OrderStatusType.DELIVERED]: 'Доставлен',
  [OrderStatusType.CANCELLED]: 'Отменен',
  [OrderStatusType.IN_PROBLEM]: 'Проблема',
  [OrderStatusType.COMPLETED]: 'Выполнен',
};

export const labelColorsDictionary = {
  [OrderStatusType.NEW]: '#e73030',
  [OrderStatusType.NOT_RESERVED]: '#ffa726',
  [OrderStatusType.PARTLY_RESERVED]: '#ffa726',
  [OrderStatusType.RESERVED]: '#ffa726',
  [OrderStatusType.CONFIRMED]: '#00b4f0',
  [OrderStatusType.ASSEMBLED]: '#00b4f0',
  [OrderStatusType.PICKED]: '#00b4f0',
  [OrderStatusType.DELIVERED]: '#2abc33',
  [OrderStatusType.COMPLETED]: '#2abc33',
  [OrderStatusType.CANCELLED]: '#777777',
  [OrderStatusType.IN_PROBLEM]: '#777777',
};

export const orderPaymentStatusDictionary: Record<OrderPaymentStatus, string> = {
  PAID: 'Оплачен',
  PARTIALLY_PAID: 'Частично оплачен',
  NOT_PAID: 'Не оплачен',
};

export const orderPaymentStatusColorsDictionary: Record<OrderPaymentStatus, string> = {
  PAID: '#2ABC33',
  PARTIALLY_PAID: '#FFA726',
  NOT_PAID: '#E73030',
};

export const orderPaymentMethodDictionary = {
  [EOrderPaymentMethod.CASH]: 'Оплата наличными',
  [EOrderPaymentMethod.CARD]: 'Оплата картой',
  [EOrderPaymentMethod.BANK_WIRE]: 'Оплата через банковский перевод',
};
