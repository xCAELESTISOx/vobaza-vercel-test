import { axios, setToken, setTokenWithGuest } from '../axios';

import type { ICreateAuthOrder, ICreateOrder } from 'src/models/IOrder';

export const ordersAPI = {
  async createOrder(data: ICreateOrder) {
    await setTokenWithGuest();
    return axios.post(`/v2/checkout`, data);
  },
  async createAuthOrder(data: ICreateAuthOrder) {
    await setToken();
    return axios.post(`/customer/v2/checkout`, data);
  },
  async getAssemblyPrice(address: string, product_ids: number[]) {
    return axios.get(`/v1/checkout/assembly`, { params: { address, product_ids } });
  },
  async getLiftPrice(elevator: string, floor: number) {
    return axios.get(`/v1/checkout/lift`, { params: { elevator, floor } });
  },
  async getDeliveryTypes(address: string) {
    return axios.get(`/v1/checkout/delivery`, { params: { address } });
  },
  async getOrders() {
    await setToken();
    return axios.get(`/customer/v2/orders`);
  },
  async getLastOrder() {
    await setToken();
    return axios.get(`/customer/v2/orders`, { params: { limit: 1 } });
  },
  async getOrder(id) {
    await setToken();
    return axios.get(`/customer/v2/orders/${id}`);
  },
  // One click order
  async makeOneClickOrder(data: { phone: string; name?: string }) {
    setTokenWithGuest();
    await axios.post('/v1/callback', data);
  },
  async createOneClickOrder(productId: number, data: { name: string; phone: string; email?: string }) {
    return axios.post(`/v1/products/${productId}/oneClickOrder`, data);
  },
  async getOrderPaymentResult(payment_system_id: string) {
    const params = { payment_system_id };
    return axios.get('v1/orders/payments/result', { params });
  },
};
