import {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

import styles from './styles.module.scss';
import { useAuth } from '../../../../src/context/auth';
import { IProfile } from '../../../Profile/Data';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone/dist';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import { InputRadio } from '@nebo-team/vobaza.ui.inputs.input-radio';

export interface Receiver {
  name: string;
  surname: string;
  phone: string;
  email: string;
  recipient?: {
    name: string;
    phone: string;
  } | null;
}

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const initialValues: Receiver = {
  name: '',
  surname: '',
  phone: '',
  email: '',
  recipient: null,
};

type Props = {
  ref: any;
  initialUser: IProfile;
  createOrder: (data: Receiver) => void;
};

const OrderReceiver: FC<Props> = forwardRef(
  ({ initialUser, createOrder }, ref) => {
    const { dispatch } = useAuth();
    const token = Cookies.get('token');
    const [isLoading, setIsLoading] = useState(false);
    const [getsAnotherRecipient, setGetsAnotherRecipient] = useState<
      'true' | 'false'
    >('false');

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
        .max(255, 'Количество символов в поле должно быть не больше 255')
        .required('Обязательное поле'),
      email: yup
        .string()
        .email('Не валидный email')
        .max(255, 'Количество символов в поле должно быть не больше 255'),
      recipient: yup
        .object({
          name: yup
            .string()
            .max(100, 'Количество символов в поле должно быть не больше 100')
            .when([], (schema) => {
              return getsAnotherRecipient === 'true'
                ? schema.required('Обязательное поле')
                : schema;
            }),
          phone: yup
            .string()
            .matches(phoneRegExp, 'Невалидный номер телефона')
            .when([], (schema) => {
              return getsAnotherRecipient === 'true'
                ? schema.required('Обязательное поле')
                : schema;
            }),
        })
        .nullable(),
    });

    useImperativeHandle(ref, () => ({
      submitForm() {
        handleSubmit();
      },
    }));

    const orderHandler = async () => {
      try {
        setIsLoading(true);
        await createOrder(values);
      } catch (error) {
        const newErrors = {} as any;
        error.response.data.errors.forEach((err) => {
          const errSourse = err.source.split('.');

          if (errSourse[0] === 'recipient') {
            newErrors.recipient = {};
            newErrors.recipient[errSourse[1]] = err.title;
          }

          if (errSourse[0] === 'customer') {
            newErrors[errSourse[1]] = err.title;
          }
        });
        console.log(newErrors);

        setErrors(newErrors);
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
      setValues,
    } = useFormik<Receiver>({
      initialValues: {
        ...initialValues,
        ...initialUser,
      },
      validationSchema,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: orderHandler,
    });

    const handleChange = async (e: any) => {
      await setFieldValue(e.target.name, e.target.value);
    };
    const changeAnotherRecipient = (val: 'true' | 'false') => {
      if (val === 'true') setFieldValue('recipient', { phone: '7', name: '' });
      else setFieldValue('recipient', null);

      setGetsAnotherRecipient(val);
    };
    const handlePhoneChange = async (value: string) => {
      await setFieldValue('phone', value);
    };
    const handleOtherPhoneChange = async (value: string) => {
      await setFieldValue('recipient.phone', value);
    };
    const handleBlur = async (e: any) => {
      validateField(e.target.name);
    };

    const openLoginModal = () => {
      dispatch({ type: 'toggleModal' });
    };

    useEffect(() => {
      setValues({
        ...initialValues,
        ...initialUser,
      });
    }, [initialUser, setValues]);

    useEffect(() => {
      setErrors({});
    }, [getsAnotherRecipient]);

    return (
      <div className={styles.orderReceiver}>
        <div className={styles.cartContent}>
          <div className={styles.cartHeader}>
            <h2 className={styles.cartTitle}>Покупатель</h2>
            {!token && (
              <div>
                <span>Уже зарегистрированы? </span>
                <button
                  className={styles.cartHeaderButton}
                  onClick={openLoginModal}
                >
                  Войти
                </button>
              </div>
            )}
          </div>
          {process.browser && (
            <form onSubmit={handleSubmit}>
              {token && initialUser ? (
                <div className={styles.cartUser}>
                  <Icon name="Person" color="#B3B3B3" />
                  <div>
                    <div className={styles.cartUserItem}>
                      {initialUser.name} {initialUser.surname}
                    </div>
                    <div className={styles.cartUserItem}>
                      {initialUser.phone}
                    </div>
                    <div className={styles.cartUserItem}>
                      {initialUser.email}
                    </div>
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
              <div
                className={`${styles.orderReceiverFormItem} ${styles.orderReceiverFormRadioItem}`}
              >
                <div className={styles.orderReceiverFormRadio}>
                  <InputRadio
                    currentValue={{
                      code: 'false',
                      value: 'false',
                    }}
                    label="Получу я"
                    value={getsAnotherRecipient}
                    name="withElevator"
                    onChange={() => changeAnotherRecipient('false')}
                  />
                </div>
                <div className={styles.orderReceiverFormRadio}>
                  <InputRadio
                    currentValue={{
                      code: 'true',
                      value: 'true',
                    }}
                    label="Получит другой человек"
                    value={getsAnotherRecipient}
                    name="withElevator"
                    onChange={() => changeAnotherRecipient('true')}
                  />
                </div>
              </div>
              <div className={styles.orderReceiverFormItem}>
                <InputPhone
                  label="Номер телефона получателя"
                  name="recipient.phone"
                  value={values.recipient?.phone || ''}
                  onChange={handleOtherPhoneChange}
                  onBlur={handleBlur}
                  error={errors?.recipient?.phone || ''}
                  required
                  disabled={isLoading || getsAnotherRecipient === 'false'}
                />
              </div>
              <div className={styles.orderReceiverFormItem}>
                <InputText
                  label="Имя получателя"
                  name="recipient.name"
                  value={values.recipient?.name || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.recipient?.name || ''}
                  disabled={isLoading || getsAnotherRecipient === 'false'}
                  required
                />
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
);

OrderReceiver.displayName = 'OrderReceiver';

export default OrderReceiver;
