import * as yup from 'yup';
import { useFormik } from 'formik';

import styles from '../styles/Partners.module.scss';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { useState } from 'react';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Контактная форма',
    href: '/kontaktnaya-forma',
  },
];

interface Address {
  email: string;
  name: string;
  theme: string;
  message: string;
}

const initialValues = {
  email: '',
  name: '',
  theme: '',
  message: '',
} as Address;

const validationSchema = yup.object({
  name: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  theme: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  message: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  email: yup
    .string()
    .email('Не валидный email')
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
});

export default function ContactForm() {
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

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Контактная форма</h1>
          <div className={styles.staticPageInfo}>
            <InputText
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.email}
              disabled={isLoading}
              required
            />
            <InputText
              label="Ваше Имя"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.name}
              disabled={isLoading}
              required
            />
            <InputText
              label="Тема"
              name="theme"
              value={values.theme}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.theme}
              disabled={isLoading}
              required
            />
            <InputText
              label="Сообщение"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.message}
              disabled={isLoading}
              multiline
              required
            />
            <div>
              <Button style={{ marginLeft: 'auto' }} text="Отправить" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
