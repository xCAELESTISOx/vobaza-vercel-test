import { FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { IProfile } from '../Data';
import styles from './styles.module.scss';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import { Button } from '@nebo-team/vobaza.ui.button';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone';
import { api } from '../../../assets/api';
import { IError } from '../../../src/models/IError';

const validationSchema = yup.object({
  name: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  surname: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  phone: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  email: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .email('Не валидный email'),
});

type Props = {
  initialUser: IProfile;
};

const ProfileUpdateForm: FC<Props> = ({ initialUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setAddressHandler = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const data = {
        name: values.name,
        surname: values.surname,
        email: values.email,
      };
      await api.updateProfile(data);
      setIsLoading(false);
    } catch (error) {
      const errs = error.response.data.errors;
      const backErrors = {} as any;

      errs.forEach((err: IError) => {
        err.source && err.source !== ''
          ? (backErrors[err.source] = err.title)
          : (backErrors.name = err.title
              ? err.title
              : 'Непредвиденная ошибка, попробуйте ещё раз');
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
    resetForm,
  } = useFormik<IProfile>({
    initialValues: {
      name: initialUser.name || '',
      surname: initialUser.surname || '',
      phone: initialUser.phone || '',
      email: initialUser.email || '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: setAddressHandler,
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

  return (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <div className={styles.profileFormBlock}>
        <div className={styles.profileFormTitle}>Контактная информация </div>
        <div className={styles.profileFormInputBlock}>
          <div className={styles.profileFormInput}>
            <InputText
              label="Имя"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.name}
              disabled={isLoading}
            />
          </div>
          <div className={styles.profileFormInput}>
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
        </div>
        <div className={styles.profileFormInputBlock}>
          <div className={styles.profileFormInput}>
            <InputPhone
              label="Номер телефона"
              name="phone"
              value={values.phone}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              error={errors?.phone}
              disabled={true}
            />
          </div>
          <div className={styles.profileFormInput}>
            <InputText
              label="E-mail"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.email}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <div className={styles.profileFormButtons}>
        <Button text="Сохранить" size="big" type="submit" />
        <Button
          className={styles.profileFormButtonCancel}
          text="Отменить"
          size="big"
          color="#f2f2f2"
          onClick={resetForm as any}
        />
      </div>
    </form>
  );
};

export default ProfileUpdateForm;
