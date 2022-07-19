import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

import { useClickOutside } from '@nebo-team/vobaza.ui.filter-select/dist/filter-select';
import useDebounce from 'src/hooks/useDebounce';
import { dadataApi } from 'assets/api/dadata';
import { useAuth } from 'src/context/auth';
import type { ElevatorType, IAddressFull } from 'src/models/IAddress';
import type { IError } from 'src/models/IError';

import styles from './styles.module.scss';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';
import { InputRadio } from '@nebo-team/vobaza.ui.inputs.input-radio';
import { Button } from '@nebo-team/vobaza.ui.button/dist';

const BASIC_FLOOR_ERROR = 'Укажите этаж';
const EXCEEDING_FLOOR_ERROR = 'Номер этажа должен быть не более 100';

const validationSchema = yup.object({
  address: yup.string().required('Обязательное поле'),
  flat: yup.string(),
  entrance: yup.string(),
  floor: yup
    .number()
    .typeError(BASIC_FLOOR_ERROR)
    .min(1, BASIC_FLOOR_ERROR)
    .max(100, EXCEEDING_FLOOR_ERROR)
    .required(BASIC_FLOOR_ERROR),
  intercom: yup.string(),
});

type Props = {
  initialValues: IAddressFull;
  unauth?: boolean;

  inline?: boolean;
  title?: string;
  buttonText?: string;
  onSubmit?: (t: IAddressFull) => void;
};

const ProfileAddressesForm: FC<Props> = ({ unauth, initialValues, inline, title, buttonText, onSubmit }) => {
  const [addreses, setAddreses] = useState([]);

  const suggestRef = useRef(null);
  const router = useRouter();

  const { state } = useAuth();

  const submitHandler = async () => {
    try {
      onSubmit(values);
    } catch (errs) {
      const backErrors = {} as any;

      errs.forEach((err: IError) => {
        err.source && err.source !== ''
          ? (backErrors[err.source] = err.title)
          : (backErrors.address = err.title ? err.title : 'Непредвиденная ошибка, попробуйте ещё раз');
      });
      setErrors(backErrors);
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
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: submitHandler,
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

  const handleElevatorChange = async (val: boolean | { code: string; value: ElevatorType }) => {
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
    await setFieldValue('is_default', bool);
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

  useClickOutside(suggestRef, () => setAddreses([]));

  useEffect(() => {
    if (touched.address && values.address) {
      debouncedSearchAddress();
    }
  }, [values.address]);

  useEffect(() => {
    const cookieCity = Cookies.get('city');

    if (!values.address && (router.query.city || state.city || cookieCity)) {
      setFieldValue('address', router.query.city || state.city || cookieCity);
    }
  }, [state.city]);

  return (
    <form className={`${styles.addressForm} ${inline ? styles.inline : ''}`} onSubmit={handleSubmit}>
      <div className={styles.addressFormTitle}>{title || 'Редактировать адрес'}</div>
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
      <div className={styles.addressFormRow}>
        <div className={styles.addressFormItem}>
          <InputText
            label="Квартира"
            name="flat"
            value={values.flat?.toString() || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.flat}
          />
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
        </div>
      </div>
      <div className={styles.addressFormRow}>
        <div className={styles.addressFormItem}>
          <InputText
            label="Этаж"
            name="floor"
            value={values.floor.toString()}
            valueType="integer"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.floor}
            required
          />
        </div>
        <div className={styles.addressFormItem}>
          <InputText
            label="Домофон"
            name="intercom"
            value={values.intercom}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.intercom}
          />
        </div>
      </div>
      <div className={styles.addressFormItem}></div>
      <div className={styles.addressFormItem}>
        <InputCheckbox
          variation="secondary"
          label="Лифт"
          initialValue={values.elevator !== 'NONE'}
          onChange={handleElevatorChange}
          isError={!!errors.is_default}
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
      {!unauth && (
        <>
          <div className={styles.addressFormItem}></div>
          <div className={styles.addressFormItem}>
            <InputCheckbox
              variation="secondary"
              label="Сделать адрес по умолчанию"
              initialValue={values.is_default}
              onChange={handleCheckChange}
              isError={!!errors.is_default}
            />
          </div>
        </>
      )}
      <div className={styles.addressFormButtons}>
        <Button text={buttonText || 'Сохранить'} size={'big'} type="submit" style={inline ? { width: '100%' } : {}} />
      </div>
    </form>
  );
};
export default ProfileAddressesForm;
