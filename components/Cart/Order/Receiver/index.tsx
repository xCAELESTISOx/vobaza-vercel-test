import { FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import styles from './styles.module.scss';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone';

interface Receiver {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

const initialValues = {
  name: '',
  surname: '',
  phone: '',
  email: '',
} as Receiver;

const validationSchema = yup.object({
  name: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  surname: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  phone: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  email: yup
    .string()
    .email('Не валидный email')
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
});

const OrderReceiver: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const orderHandler = () => {
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
  } = useFormik<Receiver>({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: orderHandler,
  });

  const handleChange = async (e: any) => {
    await setFieldValue(e.target.name, e.target.value);
  };
  const handlePhoneChange = async (value: string) => {
    await setFieldValue('phone', value);
  };
  const handleBlur = async (e: any) => {
    validateField(e.target.name);
  };

  const openLoginModal = () => {
    // TODO
    console.log('openLoginModal');
  };

  return (
    <div className={styles.orderReceiver}>
      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Получатель</h2>
          <div>
            <span>Уже зарегистрированы? </span>
            <button
              className={styles.cartHeaderButton}
              onClick={openLoginModal}
            >
              Войти
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.orderReceiverFormItem}>
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
          <div className={styles.orderReceiverFormItem}>
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
          <div className={styles.orderReceiverFormItem}>
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
          <div className={styles.orderReceiverFormItem}>
            <InputText
              label="Электронная почта"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.email}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default OrderReceiver;
