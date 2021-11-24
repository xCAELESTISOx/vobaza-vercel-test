import { FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import styles from './styles.module.scss';
import Drawer from '../../../../../src/hoc/withDrawer';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';

interface Address {
  address: string;
  flat: string;
  entrance: string;
  floor: string;
  intercom: string;
}

const initialValues = {
  address: '',
  flat: '',
  entrance: '',
  floor: '',
  intercom: '',
} as Address;

const validationSchema = yup.object({
  address: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  flat: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  entrance: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  floor: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  intercom: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const OrderAddressDrawer: FC<Props> = ({ isOpen = false, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setAddressHandler = () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onClose();
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
  } = useFormik<Address>({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: setAddressHandler,
  });

  const handleChange = async (e: any) => {
    await setFieldValue(e.target.name, e.target.value);
  };
  const handleBlur = async (e: any) => {
    validateField(e.target.name);
  };

  return (
    <Drawer
      title="Адрес"
      buttonText="Подтвердить"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={handleSubmit}
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.orderAddressFormItem}>
          <InputText
            label="Адрес"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.address}
            disabled={isLoading}
            required
          />
        </div>
        <div className={styles.orderAddressFormItem}>
          <InputText
            label="Квартира"
            name="flat"
            value={values.flat}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.flat}
            disabled={isLoading}
          />
        </div>
        <div className={styles.orderAddressFormItem}>
          <InputText
            label="Подъезд"
            name="entrance"
            value={values.entrance}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.entrance}
            disabled={isLoading}
          />
        </div>
        <div className={styles.orderAddressFormItem}>
          <InputText
            label="Этаж"
            name="floor"
            value={values.floor}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.floor}
            disabled={isLoading}
          />
        </div>
        <div className={styles.orderAddressFormItem}>
          <InputText
            label="Домофон"
            name="intercom"
            value={values.intercom}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.intercom}
            disabled={isLoading}
          />
        </div>
      </form>
    </Drawer>
  );
};
export default OrderAddressDrawer;
