import { axios, setTokenWithGuest } from '../axios';

interface PartnershipForm {
  cities: string;
  categories: string;
  organization_name: string;
  inn: string;
  contact_name: string;
  contact_phone: string;
  email: string;
}
export const partnershipAPI = {
  async createPartnershipRequest(data: PartnershipForm) {
    setTokenWithGuest();
    await axios.post('/v1/partnership', data);
  },
};
