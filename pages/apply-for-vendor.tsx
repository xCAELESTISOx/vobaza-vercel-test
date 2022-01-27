import Link from 'next/link';
import * as yup from 'yup';
import { useFormik } from 'formik';

import styles from '../styles/Partners.module.scss';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone';
import { Button } from '@nebo-team/vobaza.ui.button';
import { useState } from 'react';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Получить учетную запись продавца',
    href: '/apply-for-vendor',
  },
];

interface Address {
  address: string;
  categ: string;
  name: string;
  inn: string;
  fio: string;
  phone: string;
  email: string;
}

const initialValues = {
  address: '',
  categ: '',
  name: '',
  inn: '',
  fio: '',
  phone: '',
  email: '',
} as Address;

const validationSchema = yup.object({
  address: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  categ: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  name: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  inn: yup
    .string()
    .test(
      'len',
      'Поле ИНН должно содержать 10 или 12 цифр',
      (val: any) => val.length === 10 || val.length === 12
    )
    .required('Обязательное поле'),
  fio: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  phone: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  email: yup
    .string()
    .email('Не валидный email')
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
});

export default function Partnership() {
  const [isLoading, setIsLoading] = useState(false);

  const sendForm = () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    values,
    setFieldValue,
    validateField,
    errors,
    handleSubmit,
    setErrors,
  } = useFormik<Address>({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: sendForm,
  });

  const handleChange = async (e: any) => {
    await setFieldValue(e.target.name, e.target.value);
  };
  const handleBlur = async (e: any) => {
    validateField(e.target.name);
  };
  const handlePhoneChange = async (value: string) => {
    await setFieldValue('phone', value);
  };

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>
            Оставить заявку на&nbsp;партнерство
          </h1>
          <div className={styles.staticPageInfo}>
            <InputText
              label="Города присутствия (через запятую)"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.address}
              disabled={isLoading}
              required
            />
            <InputText
              label="Категории продаваемых товаров"
              name="categ"
              value={values.categ}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.categ}
              disabled={isLoading}
            />
            <InputText
              label="Название организации"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.name}
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
              name="fio"
              value={values.fio}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.fio}
              disabled={isLoading}
              required
            />
            <InputPhone
              label="Мобильный номер телефона"
              name="phone"
              value={values.phone}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              error={errors?.phone}
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
                <a className={`${styles.staticPageText} ${styles.link}`}>
                  договором оферты
                </a>
              </Link>{' '}
              и&nbsp;подтверждаете своё согласие на&nbsp;обработку персональных
              данных
            </div>
            <div>
              <Button style={{ marginLeft: 'auto' }} text="Отправить" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
