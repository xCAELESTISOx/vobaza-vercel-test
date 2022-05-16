import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

import { api } from 'assets/api';
import { dadataApi } from 'assets/api/dadata';
import useDebounce from 'src/hooks/useDebounce';
import { useAuth } from 'src/context/auth';
import { IError } from 'src/models/IError';
import { ElevatorType, IAddress, IAddressFull } from 'src/models/IAddress';

import styles from './styles.module.scss';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';
import { InputRadio } from '@nebo-team/vobaza.ui.inputs.input-radio';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { useClickOutside } from '@nebo-team/vobaza.ui.filter-select/dist/filter-select';

interface Address {
  address: string;
  entrance: string;
  floor: string;
  intercom: string;
  isDefault: boolean;
  elevator: ElevatorType;
}

const initialValues = {
  address: '',
  entrance: '',
  floor: '',
  intercom: '',
  isDefault: false,
  elevator: 'NONE',
} as Address;

const validationSchema = yup.object({
  address: yup.string().required('Обязательное поле'),
  flat: yup.string(),
  entrance: yup.string(),
  floor: yup.string(),
  intercom: yup.string(),
});

type Props = {
  address?: IAddressFull;
  inline?: boolean;
  title?: string;
  buttonText?: string;
  submitHandler?: (t: IAddress) => void;
};

const ProfileAddressesForm: FC<Props> = ({
  address,
  inline,
  title,
  buttonText,
  submitHandler,
}) => {
  const router = useRouter();
  const { state } = useAuth();
  const suggestRef = useRef(null);
  useClickOutside(suggestRef, () => setAddreses([]));
  const [addreses, setAddreses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const saveAddress = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const data = {
        ...values,
        is_default: values.isDefault,
      };
      let newId;
      if (address) {
        await api.changeAddress(data, address.id);
      } else {
        const res = await api.setAddress(data);
        newId = res.data;
      }
      if (submitHandler) {
        submitHandler({
          id: newId,
          is_default: values.isDefault,
          address: values.address,
        });
      } else {
        router.push('/profile/address');
      }
    } catch (error) {
      const errs = error.response.data.errors;
      const backErrors = {} as any;

      errs.forEach((err: IError) => {
        err.source && err.source !== ''
          ? (backErrors[err.source] = err.title)
          : (backErrors.address = err.title
              ? err.title
              : 'Непредвиденная ошибка, попробуйте ещё раз');
      });
      setErrors(backErrors);
    } finally {
      setIsLoading(false);
    }
  };
  const {
    values,
    setFieldValue,
    touched,
    setFieldTouched,
    validateField,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  } = useFormik<Address>({
    initialValues: address
      ? {
          address: address.address || '',
          entrance: address.entrance || '',
          floor: address.floor?.toString() || '',
          intercom: address.intercom || '',
          isDefault: address.is_default,
          elevator: address.elevator || 'NONE',
        }
      : initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: saveAddress,
  });
  const handleChangeAddress = async (e) => {
    setAddreses([]);
    setFieldTouched('address');
    handleChange(e);
  };
  const selectAddress = async (e) => {
    setAddreses([]);
    setFieldTouched('address', false);
    await setFieldValue('address', e.target.dataset.value);
  };
  const handleElevatorChange = async (
    val: boolean | { code: string; value: ElevatorType }
  ) => {
    if (val) {
      if (typeof val === 'boolean' || val.value === 'FREIGHT') {
        setFieldValue('elevator', 'FREIGHT');
      } else {
        setFieldValue('elevator', 'PASSENGER');
      }
    } else {
      setFieldValue('elevator', 'NONE');
    }
  };
  const handleCheckChange = async (bool: boolean) => {
    await setFieldValue('isDefault', bool);
  };
  const handleBlur: React.FocusEventHandler = async (e: any) => {
    validateField(e.target.name);
  };

  const searchAddress = async () => {
    const res = await dadataApi.findAddress(values.address);
    const json = await res.json();
    const addresesFromRes = json.suggestions;
    setAddreses(addresesFromRes);
  };
  const debouncedSearchAddress = useDebounce(searchAddress, 800);

  useEffect(() => {
    if (touched.address && values.address) {
      debouncedSearchAddress();
    }
  }, [values.address]);

  useEffect(() => {
    const cookieCity = Cookies.get('city');

    if (!address && (router.query.city || state.city || cookieCity)) {
      setFieldValue('address', router.query.city || state.city || cookieCity);
    }
  }, [state.city]);

  return (
    <form
      className={`${styles.addressForm} ${inline ? styles.inline : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.addressFormTitle}>
        {title || 'Редактировать адрес'}
      </div>
      <div className={styles.addressFormItem}>
        <InputText
          label="Адрес"
          name="address"
          value={values.address}
          onChange={handleChangeAddress}
          onBlur={handleBlur}
          error={errors?.address}
          required
        />
        {addreses.length > 0 && (
          <div className={styles.addressSelectModalSuggest} ref={suggestRef}>
            {addreses.map((addressItem) => (
              <div
                key={addressItem.value}
                data-value={addressItem.value}
                className={styles.addressSelectModalSuggestItem}
                onClick={selectAddress}
              >
                {addressItem.value}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.addressFormItem}>
        <InputText
          label="Подъезд"
          name="entrance"
          value={values.entrance}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors?.entrance}
        />
        <InputText
          label="Этаж"
          name="floor"
          value={values.floor}
          valueType="integer"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors?.floor}
        />
        <InputText
          label="Домофон"
          name="intercom"
          value={values.intercom}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors?.intercom}
        />
      </div>
      {!inline && (
        <>
          <div className={styles.addressFormItem}>
            <InputCheckbox
              variation="secondary"
              label="Лифт"
              initialValue={values.elevator !== 'NONE'}
              onChange={handleElevatorChange}
              isError={Boolean(errors.isDefault)}
            />
          </div>
          <div className={styles.addressFormItem}>
            <div className={styles.addressFormRadio}>
              <InputRadio
                currentValue={{ code: values.elevator, value: values.elevator }}
                value="FREIGHT"
                label="Грузовой"
                name="elevator"
                onChange={handleElevatorChange as any}
                disabled={values.elevator === 'NONE'}
              />
              <InputRadio
                currentValue={{ code: values.elevator, value: values.elevator }}
                value="PASSENGER"
                label="Пассажирский"
                name="elevator"
                onChange={handleElevatorChange as any}
                disabled={values.elevator === 'NONE'}
              />
            </div>
          </div>
          <div className={styles.addressFormItem}></div>
          <div className={styles.addressFormItem}>
            <InputCheckbox
              variation="secondary"
              label="Сделать адрес по умолчанию"
              initialValue={values.isDefault}
              onChange={handleCheckChange}
              isError={Boolean(errors.isDefault)}
            />
          </div>
        </>
      )}
      <div className={styles.addressFormButtons}>
        <Button text={buttonText || 'Сохранить'} size={'big'} type="submit" />
      </div>
    </form>
  );
};
export default ProfileAddressesForm;
