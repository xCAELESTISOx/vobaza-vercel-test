import { FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import styles from '../../../styles/modules/inline-modal.module.scss';
import ModalLayout from '../../../src/hoc/withModal';

import { Title } from '@nebo-team/vobaza.ui.title';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import { Button } from '@nebo-team/vobaza.ui.button';
import { api } from '../../../assets/api';

interface PhoneCall {
  phone: string;
  name?: string;
}

const initialValues = {
  name: '',
  phone: '',
} as PhoneCall;

const validationSchema = yup.object({
  name: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255'),
  phone: yup.string().required('Обязательное поле'),
});

type Props = {
  isActive: boolean;
  onClose: () => void;
};
const PhoneCallModal: FC<Props> = ({ isActive, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const makePhoneCallRequest = async () => {
    setIsLoading(true)
    try {
      await api.makeOneClickOrder(values)
      onClose()
      resetForm()
    } catch(e) {
      console.log(e)
    }
    setIsLoading(false)
  };

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    resetForm
  } = useFormik<PhoneCall>({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: makePhoneCallRequest,
  });

  const handlePhoneChange = async (value: string) => {
    await setFieldValue('phone', value);
  };

  return (
    <>
      {isActive && (
        <ModalLayout onClose={onClose}>
          <div className={styles.inlineModal}>
            <div className={styles.inlineModalContent}>
              <Title element="h2" className={styles.inlineModalTitle}>
                Заказать звонок
              </Title>
              <form onSubmit={handleSubmit}>
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
                  type="submit"
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
      )}
    </>
  );
};
export default PhoneCallModal;
