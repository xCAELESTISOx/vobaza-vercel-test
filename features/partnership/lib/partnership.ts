import * as yup from 'yup';
import type { IProfile } from 'components/Profile/Data';

export interface PartnershipForm {
  cities: string;
  categories: string;
  organization_name: string;
  inn: string;
  contact_name: string;
  contact_phone: string;
  email: string;
}

export const getInitialValues = (user: IProfile | null) => ({
  cities: '',
  categories: '',
  organization_name: '',
  inn: '',
  contact_name: `${user.name}${user.surname ? ' ' + user.surname : ''}`,
  contact_phone: user.phone || '',
  email: user.email || '',
});

export const validationSchema = yup.object({
  cities: yup
    .string()
    .trim()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  categories: yup.string().trim().max(255, 'Количество символов в поле должно быть не больше 255'),
  organization_name: yup
    .string()
    .trim()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  inn: yup
    .string()
    .test('len', 'Поле ИНН должно содержать 10 или 12 цифр', (val: any) => val?.length === 10 || val?.length === 12)
    .required('Обязательное поле'),
  contact_name: yup
    .string()
    .trim()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  contact_phone: yup.string().required('Обязательное поле'),
  email: yup
    .string()
    .email('Не валидный email')
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
});
