import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import Cookies from 'js-cookie';
import * as yup from 'yup';

import { api } from '../../../app/api';
import styles from 'app/styles/modules/inline-modal.module.scss';
import { IError } from '../../../src/models/IError';

import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Title } from '@nebo-team/vobaza.ui.title/dist';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone/dist';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import Warning from 'shared/ui/Warning';

interface LoginForm {
  phone: string;
  code: string;
}

const initialValues = {
  phone: '',
  code: '',
} as LoginForm;

const validationSchema = yup.object({
  phone: yup.string().required('Обязательное поле'),
  code: yup.string().nullable(),
});

type Props = {
  goRegister: () => void;
  onSuccess: () => void;
};

const LoginForm = ({ goRegister, onSuccess }: Props) => {
  const [codeWasSent, setCodeWasSent] = useState(false);
  const [isCodeTimeout, setIsCodeTimeout] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getCodeHandler = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      await api.requestCode({ phone: values.phone });
      setIsCodeTimeout(60);
      setCodeWasSent(true);
      setIsLoading(false);
    } catch (error: any) {
      const errs = error.response.data.errors;
      const backErrors = {} as FormikErrors<LoginForm>;

      errs.forEach((err: IError) => {
        err.source && err.source !== ''
          ? (backErrors[err.source] = err.title)
          : (backErrors.phone = err.title ? err.title : 'Непредвиденная ошибка, попробуйте ещё раз');
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
      const backErrors = {} as FormikErrors<LoginForm>;

      errs.forEach((err: IError) => {
        backErrors.code = err.title ? err.title : 'Непредвиденная ошибка, попробуйте ещё раз';
      });
      setErrors(backErrors);
      setIsLoading(false);
    }
  };

  const { values, setFieldValue, validateField, errors, handleSubmit, setErrors } = useFormik<LoginForm>({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: getCodeHandler,
  });

  const handleSubmitForm = () => handleSubmit();

  const handleCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 5) {
      await setFieldValue(e.target.name, e.target.value);
    }
  };
  const handlePhoneChange = async (value: string) => {
    await setFieldValue('phone', value);
  };
  const handleBlur = async (e: FocusEvent<HTMLInputElement, Element>) => {
    validateField(e.target.name);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isCodeTimeout > 0) timeoutId = setTimeout(() => setIsCodeTimeout(isCodeTimeout - 1), 1000);

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
          <form>
            <div className={styles.inlineModalText}>
              Введите ваш телефон и&nbsp;мы&nbsp;отправим вам смс-код для входа
            </div>
            <Warning>
              <p>Вы находитесь на новой версии сайта.</p>
              <p>При проблемах с авторизацией, пожалуйста, зарегистрируйтесь снова.</p>
              <p>Приносим извинения за доставленные неудобства!</p>
            </Warning>
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
                  disabled={Boolean(isCodeTimeout)}
                  style={isCodeTimeout ? { color: '#212121', fontWeight: 'normal' } : {}}
                  text={isCodeTimeout ? `Код придет в течение ${isCodeTimeout} сек` : 'Получить код'}
                  size="big"
                  isFullScreen
                  onClick={handleSubmitForm}
                />
              </div>
            </div>
            <div className={`${styles.inlineModalItem} ${styles.inlineModalButton}`}>
              <InputText
                label="Код из СМС"
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
          <p className={styles.inlineModalSubContentText}>У вас еще нет аккаунта?</p>
          <Button
            text="Зарегистрироваться"
            variation="secondary"
            size="big"
            isFullScreen
            className={styles.inlineModalItem}
            onClick={goRegister}
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
