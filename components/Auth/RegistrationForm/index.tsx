import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Cookies from 'js-cookie';

import styles from '../../../styles/modules/inline-modal.module.scss';

import { api } from '../../../assets/api';
import { IError } from '../../../src/models/IError';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox';
import { Button } from '@nebo-team/vobaza.ui.button';
import { Title } from '@nebo-team/vobaza.ui.title';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone';

interface Auth {
  name: string;
  surname: string;
  email: string;
  phone: string;
  isAgree: boolean;
  code: string;
}

const initialValues = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  isAgree: false,
  code: '',
} as Auth;

const validationSchema = yup.object({
  name: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  surname: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  email: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .email('Не валидный email'),
  phone: yup.string().required('Обязательное поле'),
  isAgree: yup.bool().oneOf([true]),
  code: yup.string().nullable(),
});

type Props = {
  goLogin: () => void;
  onSuccess: () => void;
};

const RegistrationForm = ({ goLogin, onSuccess }: Props) => {
  const [codeWasSent, setCodeWasSent] = useState(false)
  const [isCodeTimeout, setIsCodeTimeout] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Form handler
  const registerHandler = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      await api.getRegisterCode({
        name: values.name,
        surname: values.surname,
        phone: values.phone,
        email: values.email,
      });
      setIsCodeTimeout(60);
      setCodeWasSent(true)
      setIsLoading(false);
    } catch (error: any) {
      const errs = error.response.data.errors;
      const backErrors = {} as any;

      errs.forEach((err: IError) => {
        if (err.source && err.source !== '') {
          backErrors[err.source] = err.title;
        } else if (err.code === 'phone_not_unique') {
          backErrors.phone = err.title;
        } else if (err.code === 'email_not_unique') {
          backErrors.email = err.title;
        } else if (err.title) {
          backErrors.phone = err.title;
        } else {
          backErrors.phone = 'Непредвиденная ошибка, попробуйте ещё раз';
        }
      });
      setErrors(backErrors);
      setIsLoading(false);
    }
  };
  const checkCode = async () => {
    try {
      setErrors({ ...errors, code: undefined });
      setIsLoading(true);
      const response = await api.checkRegisterCode({
        confirm_token: values.code,
      });
      Cookies.set('token', response.data.data.token);
      onSuccess();
    } catch (error: any) {
      const errs = error.response.data.errors;
      const backErrors = {} as any;

      errs.forEach((err: IError) => {
        backErrors.code = err.title
          ? err.title
          : 'Непредвиденная ошибка, попробуйте ещё раз';
      });
      setErrors(backErrors);
      setIsLoading(false);
    }
  };

  const {
    values,
    setFieldValue,
    validateField,
    errors,
    handleSubmit,
    setErrors,
  } = useFormik<Auth>({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: registerHandler,
  });

  const handleChange = async (e: any) => {
    await setFieldValue(e.target.name, e.target.value);
  };
  const handlePhoneChange = async (value: string) => {
    await setFieldValue('phone', value);
  };
  const handleCodeChange = async (e: any) => {
    if (e.target.value.length <= 5) {
      await setFieldValue(e.target.name, e.target.value);
    }
  };
  const handleCheckChange = async (e: any) => {
    await setFieldValue('isAgree', e);
    validateField('isAgree');
  };
  const handleBlur = async (e: any) => {
    validateField(e.target.name);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isCodeTimeout > 0)
      timeoutId = setTimeout(() => setIsCodeTimeout(isCodeTimeout - 1), 1000);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [isCodeTimeout]);
  useEffect(() => {
    values.code.length >= 5 && checkCode();
  }, [values.code]);

  return (
    <>
      <div className={styles.inlineModal}>
        <form onSubmit={handleSubmit} className={styles.inlineModalContent}>
          <Title element="h2" className={styles.inlineModalTitle}>
            Регистрация
          </Title>

          <div className={styles.inlineModalItem}>
            <InputText
              label="Имя"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.name}
              disabled={isLoading}
              required
            />
          </div>
          <div className={styles.inlineModalItem}>
            <InputText
              label="Фамилия"
              name="surname"
              value={values.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.surname}
              disabled={isLoading}
            />
          </div>
          <div className={styles.inlineModalItem}>
            <InputText
              type="email"
              label="E-mail"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.email}
              disabled={isLoading}
            />
          </div>
          <div className={styles.inlineModalItem}>
            <InputPhone
              label="Номер телефона"
              name="phone"
              value={values.phone}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              error={errors?.phone}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inlineModalItem}>
            <InputCheckbox
              label={
                <>
                  Подтверждаю согласие на&nbsp;
                  <a href="#" className={styles.inlineModalLink}>
                    обработку персональных данных
                  </a>
                </>
              }
              initialValue={values.isAgree}
              onChange={handleCheckChange}
              isError={Boolean(errors.isAgree)}
              disabled={isLoading}
            />
          </div>

          <div
            className={`${styles.inlineModalText} ${styles.inlineModalButton}`}
          >
            Нажмите &laquo;Получить код&raquo; и&nbsp;мы&nbsp;отправим вам смс
            с&nbsp;кодом подтверждения
          </div>

          <div>
            <div className={styles.inlineModalItem}>
              <Button
                variation={isCodeTimeout ? 'secondary' : 'primary'}
                disabled={!!isCodeTimeout || !values.isAgree || isLoading}
                style={
                  isCodeTimeout
                    ? { color: '#212121', fontWeight: 'normal' }
                    : {}
                }
                text={
                  isCodeTimeout
                    ? `Код придет в течение ${isCodeTimeout} сек`
                    : 'Получить код'
                }
                size="big"
                isFullScreen={true}
                type="submit"
              />
            </div>
          </div>
          <div className={styles.inlineModalItem}>
            <InputText
              label="Код из смс"
              name="code"
              value={values.code}
              onChange={handleCodeChange}
              onBlur={handleBlur}
              error={errors?.code}
              disabled={isLoading || !codeWasSent}
            />
          </div>
        </form>
        <div className={styles.inlineModalSubContent}>
          <p className={styles.inlineModalSubContentText}>
            У вас уже есть аккаунт?
          </p>
          <Button
            text="Войти"
            size="big"
            variation="secondary"
            isFullScreen={true}
            className={styles.inlineModalItem}
            onClick={goLogin}
          />
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
