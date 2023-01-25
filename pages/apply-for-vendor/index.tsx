import { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import Breadcrumbs, { BreadcrumbType } from 'shared/ui/Breadcrumbs';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { getInitialValues, PartnershipForm, partnershipValidationSchema } from 'features/partnership';
import type { IProfile, Props } from 'components/Profile/Data';

import styles from 'app/styles/Partners.module.scss';
import checkAuth from 'app/api/auth';
import { api } from 'app/api';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Получить учетную запись продавца',
    href: '/apply-for-vendor',
  },
];

interface IProps {
  user: IProfile;
}

export default function Partnership({ user }: IProps) {
  const router = useRouter();
  const [generalErrors, setGeneralErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = getInitialValues(user);

  const sendForm = async () => {
    setGeneralErrors('');
    try {
      setIsLoading(true);
      await api.createPartnershipRequest(values);
      await router.push(`/apply-for-vendor/complete`);
    } catch (e) {
      console.error(e);
      if (e?.response.data.message) {
        setGeneralErrors('Что-то пошло не так. Пожалуйста, попробуйте позже.');
      }
      const err = e?.response?.data?.errors;
      const errs = err.reduce((acc: object, cur: any) => {
        if (cur?.source) {
          return { ...acc, [cur.source]: cur.title };
        }
        return acc;
      }, {});

      setErrors(errs);
    } finally {
      setIsLoading(false);
    }
  };

  const { values, handleChange, setFieldValue, handleBlur, errors, handleSubmit, setErrors } =
    useFormik<PartnershipForm>({
      initialValues,
      validationSchema: partnershipValidationSchema,
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
                <a className={`${styles.staticPageText} ${styles.link}`}>договором оферты </a>
              </Link>
              и&nbsp;подтверждаете своё согласие на&nbsp;обработку персональных данных
            </div>
            {generalErrors && <p className={styles.errorText}>{generalErrors}</p>}
            <div>
              <Button
                style={{ marginLeft: 'auto' }}
                text="Отправить"
                type="button"
                onClick={() => handleSubmit()}
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
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
    user = {
      name: '',
      phone: '',
      email: '',
      surname: '',
    };
    return {
      props: {
        user,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
