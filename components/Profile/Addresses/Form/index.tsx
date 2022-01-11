import { FC } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import styles from './styles.module.scss';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox';
import { Button } from '@nebo-team/vobaza.ui.button';
import { useRouter } from 'next/router';

interface Address {
  address: string;
  flat: string;
  entrance: string;
  floor: string;
  intercom: string;
  isDefault: boolean;
}

const initialValues = {
  address: 'Санкт-Петербург',
  flat: '',
  entrance: '',
  floor: '',
  intercom: '',
  isDefault: false,
} as Address;

const validationSchema = yup.object({
  address: yup.string().required('Обязательное поле'),
  flat: yup.string(),
  entrance: yup.string(),
  floor: yup.string(),
  intercom: yup.string(),
});

const ProfileAddressesForm: FC = () => {
  const router = useRouter();

  const getCodeHandler = () => {
    // TODO api
    router.push('/profile/address');
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
    onSubmit: getCodeHandler,
  });
  const handleCodeChange = async (e: any) => {
    if (e.target.value.length <= 5) {
      await setFieldValue(e.target.name, e.target.value);
    }
  };
  const handleCheckChange = async (e: any) => {
    await setFieldValue('isDefault', e);
  };
  const handleBlur = async (e: any) => {
    validateField(e.target.name);
  };

  return (
    <form className={styles.addressForm} onSubmit={handleSubmit}>
      <div className={styles.addressFormTitle}>Редактировать адрес </div>
      <div className={styles.addressFormItem}>
        <InputText
          label="Адрес"
          name="address"
          value={values.address}
          onChange={handleCodeChange}
          onBlur={handleBlur}
          error={errors?.address}
          required
        />
      </div>
      <div className={styles.addressFormItem}>
        <InputText
          label="Квартира"
          name="flat"
          value={values.flat}
          onChange={handleCodeChange}
          onBlur={handleBlur}
          error={errors?.flat}
        />
        <InputText
          label="Подъезд"
          name="entrance"
          value={values.entrance}
          onChange={handleCodeChange}
          onBlur={handleBlur}
          error={errors?.entrance}
        />
      </div>
      <div className={styles.addressFormItem}>
        <InputText
          label="Этаж"
          name="floor"
          value={values.floor}
          onChange={handleCodeChange}
          onBlur={handleBlur}
          error={errors?.floor}
        />
        <InputText
          label="Домофон"
          name="intercom"
          value={values.intercom}
          onChange={handleCodeChange}
          onBlur={handleBlur}
          error={errors?.intercom}
        />
      </div>
      <div className={styles.addressFormItem}>
        <InputCheckbox
          variation="secondary"
          label="Сделать адрес по умолчанию"
          initialValue={values.isDefault}
          onChange={handleCheckChange}
          isError={Boolean(errors.isDefault)}
        />
      </div>
      <div className={styles.addressFormButtons}>
        <Button text="Сохранить" size="big" type="submit" />
      </div>
    </form>
  );
};
export default ProfileAddressesForm;
