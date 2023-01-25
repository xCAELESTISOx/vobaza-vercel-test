import { GetServerSideProps } from 'next';
import { ChangeEvent, FocusEvent, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import checkAuth from 'app/api/auth';
import { api } from 'app/api';
import type { IError } from 'src/models/IError';
import type { IProfile } from 'components/Profile/Data';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import SuccessfulSend from 'shared/ui/SuccessfulSend';

import styles from 'app/styles/Partners.module.scss';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Контактная форма',
    href: '/kontaktnaya-forma',
  },
];

interface Props {
  user: IProfile | null;
}

interface Address {
  email: string;
  name: string;
  subject: string;
  message: string;
}

const getInitialValues = (user: IProfile | null): Address => ({
  email: user ? `${user.email || ''}` : '',
  name: user ? `${user.name}${user.surname ? ' ' + user.surname : ''}` : '',
  subject: '',
  message: '',
});

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  subject: yup
    .string()
    .trim()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  message: yup
    .string()
    .trim()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  email: yup
    .string()
    .trim()
    .email('Не валидный email')
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
});

export default function ContactForm({ user }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendForm = async () => {
    try {
      setIsLoading(true);
      await api.sendFeedback(values);

      resetForm();
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      const errs = error.response.data.errors;
      const backErrors = {} as any;

      errs.forEach((err: IError) => {
        err.source && err.source !== ''
          ? (backErrors[err.source] = err.title.replace('subject', 'Тема').replace('message', 'Сообщение'))
          : (backErrors.message = err.title ? err.title : 'Непредвиденная ошибка, попробуйте ещё раз');
      });

      setErrors(backErrors);
      setIsLoading(false);
    }
  };

  const { values, setFieldValue, validateField, errors, handleSubmit, resetForm, setErrors } = useFormik<Address>({
    initialValues: getInitialValues(user),
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: sendForm,
  });

  const handleSubmitForm = () => {
    handleSubmit();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name === 'contactName' ? 'name' : e.target.name;

    await setFieldValue(fieldName, e.target.value);
  };
  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name === 'contactName' ? 'name' : e.target.name;
    validateField(fieldName);
  };

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.staticPage}>
        <div className={`${styles.staticPageContent} container`}>
          {isSuccess ? (
            <SuccessfulSend>
              <h1 className={styles.checkoutCompleteTitle}>Спасибо за обращение!</h1>
              <div className={styles.checkoutCompleteText}>
                Ваше обращение получено. Наш представитель свяжется с вами в ближайшее время.
              </div>
            </SuccessfulSend>
          ) : (
            <>
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
                  name="contactName"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.name}
                  disabled={isLoading}
                  required
                />
                <InputText
                  label="Тема"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.subject}
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
                  <Button
                    style={{ margin: '0 auto' }}
                    text="Отправить"
                    onClick={handleSubmitForm}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  let user = null;

  try {
    await checkAuth(req);

    const propfileRes = await api.getProfile();

    user = propfileRes.data.data;
  } catch (error) {
    return {
      props: { user },
    };
  }

  return {
    props: { user },
  };
};
