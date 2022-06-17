import type { ICreateAuthOrder, ICreateOrder } from 'src/models/IOrder';
import { axios, setToken, setTokenWithGuest } from '../axios';

export const ordersAPI = {
  async createOrder(data: ICreateOrder) {
    await setTokenWithGuest();
    return axios.post(`/v1/checkout`, data);
  },
  async createAuthOrder(data: ICreateAuthOrder) {
    await setToken();
    return axios.post(`/customer/v1/checkout`, data);
  },
  async getAssemblyPrice(address: string) {
    return axios.get(`/v1/checkout/assembly`, { params: { address } });
  },
  async getLiftPrice(elevator: string, floor: number) {
    return axios.get(`/v1/checkout/lift`, { params: { elevator, floor } });
  },
  async getDeliveryTypes(address: string) {
    return axios.get(`/v1/checkout/delivery`, { params: { address } });
  },
  async getOrders() {
    await setToken();
    return axios.get(`/customer/v1/orders`);
  },
  async getLastOrder() {
    await setToken();
    return axios.get(`/customer/v1/orders`, { params: { limit: 1 } });
  },
  async getOrder(id) {
    await setToken();
    return axios.get(`/customer/v1/orders/${id}`);
  },
  // One click order
  async makeOneClickOrder(data: { phone: string; name?: string }) {
    setTokenWithGuest();
    await axios.post('/v1/callback', data);
  },
  async createOneClickOrder(productId: number, data: { name: string; phone: string; email?: string }) {
    return axios.post(`/v1/products/${productId}/oneClickOrder`, data);
  },
};
