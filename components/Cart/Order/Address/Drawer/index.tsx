import { FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import styles from './styles.module.scss';
import Drawer from '../../../../../src/hoc/withDrawer';
import { IOrderAddress } from '../../../../../src/models/IOrder';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';

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
  address: IOrderAddress;
  setAddress: (address: IOrderAddress) => void;
  isOpen: boolean;
  onClose: () => void;
};

const OrderAddressDrawer: FC<Props> = ({
  isOpen = false,
  onClose,
  address,
  setAddress,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const setAddressHandler = () => {
    try {
      setIsLoading(true);
      setAddress(values);
      setIsLoading(false);
      onClose();
    } catch (e) {
      setIsLoading(false);
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
  } = useFormik<IOrderAddress>({
    initialValues: address,
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
            value={values.floor.toString()}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.floor}
            valueType="integer"
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
