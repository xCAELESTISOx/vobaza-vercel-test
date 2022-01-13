import { FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import styles from './styles.module.scss';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import { Button } from '@nebo-team/vobaza.ui.button';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone';

interface Profile {
  name: string;
  surname: string;
  phone: string;
  date: string;
  email: string;
  password: string;
  password2: string;
}

const initialValues = {
  name: '',
  surname: '',
  phone: '',
  date: '',
  email: '',
  password: '',
  password2: '',
} as Profile;

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
  date: yup.string(),
  email: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  password: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  password2: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
});

const ProfileUpdateForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setAddressHandler = () => {
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
  } = useFormik<Profile>({
    initialValues,
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
        <div className={styles.profileFormImageBlock}>
          <div className={styles.profileFormImage}>
            <Icon name="ImagePlaceholder" />
          </div>
          <div className={styles.profileFormImageInfo}>
            <div className={styles.profileFormImageTitle}>Фото профиля </div>
            <div className={styles.profileFormImageButton}>
              <Icon name="SmallPlus" />
              Загрузить
            </div>
          </div>
        </div>
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
              disabled={isLoading}
            />
          </div>
          <div className={styles.profileFormInput}>
            <InputText
              label="Дата рождения"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.date}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <div className={styles.profileFormBlock}>
        <div className={styles.profileFormTitle}>Данные для авторизации </div>
        <div className={styles.profileFormInputBlock}>
          <div className={styles.profileFormInput}>
            <InputText
              label="E-mail"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.email}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className={styles.profileFormInputBlock}>
          <div className={styles.profileFormInput}>
            <InputText
              label="Пароль"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.password}
              disabled={isLoading}
              required
            />
          </div>
          <div className={styles.profileFormInput}>
            <InputText
              label="Подтверждение пароля"
              name="password2"
              value={values.password2}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.password2}
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.profileFormButtons}>
        <Button text="Сохранить" size="big" />
        <Button
          className={styles.profileFormButtonCancel}
          text="Отменить"
          size="big"
          color="#f2f2f2"
        />
      </div>
    </form>
  );
};
export default ProfileUpdateForm;
