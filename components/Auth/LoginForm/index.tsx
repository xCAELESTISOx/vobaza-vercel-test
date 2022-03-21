import * as yup from 'yup';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

import { api } from '../../../assets/api';
import styles from '../../../styles/modules/inline-modal.module.scss';
import { IError } from '../../../src/models/IError';

import { Button } from '@nebo-team/vobaza.ui.button';
import { Title } from '@nebo-team/vobaza.ui.title';
import { useEffect, useState } from 'react';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';

interface Login {
  phone: string;
  code: string;
}

const initialValues = {
  phone: '',
  code: '',
} as Login;

const validationSchema = yup.object({
  phone: yup.string().required('Обязательное поле'),
  code: yup.string().nullable(),
});

type Props = {
  goRegister: () => void;
  onSuccess: () => void;
};

const LoginForm = ({ goRegister, onSuccess }: Props) => {
  const [codeWasSent, setCodeWasSent] = useState(false)
  const [isCodeTimeout, setIsCodeTimeout] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getCodeHandler = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      await api.requestCode({ phone: values.phone });
      setIsCodeTimeout(60);
      setCodeWasSent(true)
      setIsLoading(false);
    } catch (error: any) {
      const errs = error.response.data.errors;
      const backErrors = {} as any;

      errs.forEach((err: IError) => {
        err.source && err.source !== ''
          ? (backErrors[err.source] = err.title)
          : (backErrors.phone = err.title
              ? err.title
              : 'Непредвиденная ошибка, попробуйте ещё раз');
      });
      setErrors(backErrors);
      setIsLoading(false);
    }
  };
  const checkCode = async () => {
    try {
      setErrors({ ...errors, code: undefined });
      setIsLoading(true);
      const response = await api.checkLoginCode({ code: values.code });
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
  } = useFormik<Login>({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: getCodeHandler,
  });

  const handleCodeChange = async (e: any) => {
    if (e.target.value.length <= 5) {
      await setFieldValue(e.target.name, e.target.value);
    }
  };
  const handlePhoneChange = async (value: string) => {
    await setFieldValue('phone', value);
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
        <div className={styles.inlineModalContent}>
          <Title element="h2" className={styles.inlineModalTitle}>
            Вход в аккаунт
          </Title>
          <form onSubmit={handleSubmit}>
            <div className={styles.inlineModalText}>
              Введите ваш телефон и&nbsp;мы&nbsp;отправим вам смс-код для входа
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
            <div>
              <div className={styles.inlineModalItem}>
                <Button
                  variation={isCodeTimeout ? 'secondary' : 'primary'}
                  disabled={!!isCodeTimeout}
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
            <div
              className={`${styles.inlineModalItem} ${styles.inlineModalButton}`}
            >
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
        </div>
        <div className={styles.inlineModalSubContent}>
          <p className={styles.inlineModalSubContentText}>
            У вас еще нет аккаунта?
          </p>
          <Button
            text="Зарегистрироваться"
            variation="secondary"
            size="big"
            isFullScreen={true}
            className={styles.inlineModalItem}
            onClick={goRegister}
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
