import { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import type { IError } from 'src/models/IError';

import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone/dist';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { Title } from '@nebo-team/vobaza.ui.title/dist';
import ModalLayout from 'src/hoc/withModal';

import styles from 'app/styles/modules/inline-modal.module.scss';
import { api } from 'app/api';

interface PhoneCall {
  phone: string;
  name?: string;
}

const initialValues = {
  name: '',
  phone: '',
} as PhoneCall;

const validationSchema = yup.object({
  name: yup.string().max(255, 'Количество символов в поле должно быть не больше 255'),
  phone: yup.string().required('Обязательное поле'),
});

type Props = {
  isActive: boolean;
  onClose: () => void;
};
const PhoneCallModal: FC<Props> = ({ isActive, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const makePhoneCallRequest = async () => {
    setIsLoading(true);
    try {
      await api.makeOneClickOrder(values);
      onClose();
      resetForm();
    } catch (error) {
      const errs = error.response.data.errors;
      const backErrors = {} as any;

      errs.forEach((err: IError) => {
        err.source && err.source !== ''
          ? (backErrors[err.source] = err.title)
          : (backErrors.phone = err.title ? err.title : 'Непредвиденная ошибка, попробуйте ещё раз');
      });
      setErrors(backErrors);
    }
    setIsLoading(false);
  };

  const { values, setFieldValue, handleChange, handleBlur, errors, setErrors, handleSubmit, resetForm } =
    useFormik<PhoneCall>({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: makePhoneCallRequest,
    });

  const handleSubmitForm = () => {
    handleSubmit();
  };

  const handlePhoneChange = async (value: string) => {
    await setFieldValue('phone', value);
  };

  return (
    <div style={!isActive ? { display: 'none' } : {}}>
      <ModalLayout onClose={onClose}>
        <div className={styles.inlineModal}>
          <div className={styles.inlineModalContent}>
            <Title element="h2" className={styles.inlineModalTitle}>
              Заказать звонок
            </Title>
            <form>
              <div className={styles.inlineModalItem}>
                <InputText
                  label="Имя"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.name}
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
              <Button
                onClick={handleSubmitForm}
                text="Заказать звонок"
                size="big"
                isFullScreen={true}
                className={styles.inlineModalButton}
                disabled={isLoading}
              />
            </form>
          </div>
        </div>
      </ModalLayout>
    </div>
  );
};
export default PhoneCallModal;
