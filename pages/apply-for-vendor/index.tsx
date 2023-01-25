import { useState } from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';

import styles from 'app/styles/Partners.module.scss';
import { api } from 'app/api';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Получить учетную запись продавца',
    href: '/apply-for-vendor',
  },
];

interface PartnershipForm {
  cities: string;
  categories: string;
  organization_name: string;
  inn: string;
  contact_name: string;
  contact_phone: string;
  email: string;
}

const initialValues = {
  cities: '',
  categories: '',
  organization_name: '',
  inn: '',
  contact_name: '',
  contact_phone: '',
  email: '',
} as PartnershipForm;

const validationSchema = yup.object({
  cities: yup.string().max(255, 'Количество символов в поле должно быть не больше 255').required('Обязательное поле'),
  categories: yup.string().max(255, 'Количество символов в поле должно быть не больше 255'),
  organization_name: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  inn: yup
    .string()
    .test('len', 'Поле ИНН должно содержать 10 или 12 цифр', (val: any) => val?.length === 10 || val?.length === 12)
    .required('Обязательное поле'),
  contact_name: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  contact_phone: yup.string().required('Обязательное поле'),
  email: yup
    .string()
    .email('Не валидный email')
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
});

export default function Partnership() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const sendForm = async () => {
    try {
      setIsLoading(true);
      await api.createPartnershipRequest(values);
      router.push(`/apply-for-vendor/complete`);
    } catch (e) {
      console.error(e);
      const err = e?.response?.data?.errors;
      const errs = err.reduce((acc: object, cur: any) => {
        if (cur?.source) {
          return { ...acc, [cur.source]: cur.title };
        }
        return acc;
      }, {});
      setErrors(errs);
    }
    setIsLoading(false);
  };

  const { values, handleChange, setFieldValue, handleBlur, errors, handleSubmit, setErrors } =
    useFormik<PartnershipForm>({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: sendForm,
    });

  const handlePhoneChange = (e) => {
    setFieldValue('contact_phone', e);
  };

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPageCentered} container`}>
        <form className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Оставить заявку на&nbsp;партнерство</h1>
          <div className={styles.staticPageInfo}>
            <InputText
              label="Города присутствия (через запятую)"
              name="cities"
              value={values.cities}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.cities}
              disabled={isLoading}
              required
            />
            <InputText
              label="Категории продаваемых товаров"
              name="categories"
              value={values.categories}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.categories}
              disabled={isLoading}
            />
            <InputText
              label="Название организации"
              name="organization_name"
              value={values.organization_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.organization_name}
              disabled={isLoading}
              required
            />
            <InputText
              label="ИНН"
              name="inn"
              value={values.inn}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.inn}
              disabled={isLoading}
              valueType="integer"
              required
            />
            <InputText
              label="ФИО"
              name="contact_name"
              value={values.contact_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.contact_name}
              disabled={isLoading}
              required
            />
            <InputPhone
              label="Мобильный номер телефона"
              name="contact_phone"
              value={values.contact_phone}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              error={errors?.contact_phone}
              required
              disabled={isLoading}
            />
            <InputText
              label="Электронная почта"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.email}
              disabled={isLoading}
              required
            />
            <div className={styles.staticPageText}>
              Нажимая &laquo;Отправить&raquo; вы&nbsp;соглашаетесь с&nbsp;
              <Link href="/">
                <a className={`${styles.staticPageText} ${styles.link}`}>договором оферты</a>
              </Link>
              и&nbsp;подтверждаете своё согласие на&nbsp;обработку персональных данных
            </div>
            <div>
              <Button style={{ marginLeft: 'auto' }} text="Отправить" type="button" onClick={() => handleSubmit()} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
