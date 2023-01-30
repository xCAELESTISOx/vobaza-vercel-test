import React, { FC, FocusEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FormikErrors, useFormik } from 'formik';
import Cookies from 'js-cookie';

import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';
import type { ElevatorType, IAddressFull } from 'src/models/IAddress';
import type { IError } from 'src/models/IError';
import { useClickOutside } from '@nebo-team/vobaza.ui.filter-select/dist/filter-select';
import { addressValidationSchema } from '../../lib/addressValidationSchema';
import useDebounce from 'shared/lib/hooks/useDebounce';
import { useSelector } from 'shared/lib/hooks/useSelector';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { InputCheckbox } from '@nebo-team/vobaza.ui.inputs.input-checkbox/dist';
import { InputRadio } from '@nebo-team/vobaza.ui.inputs.input-radio';
import { Button } from '@nebo-team/vobaza.ui.button/dist';

import { dadataApi } from 'app/api/dadata';
import styles from './styles.module.scss';

type Props = {
  buttonText?: string;
  isLoading?: boolean;
  inline?: boolean;
  unauth?: boolean;
  title?: string;

  initialValues: IAddressFull;
  onSubmit?: (t: IAddressFull) => Promise<void>;
};

const ProfileAddressesForm: FC<Props> = ({ unauth, isLoading, initialValues, inline, title, buttonText, onSubmit }) => {
  const [addreses, setAddreses] = useState([]);
  const suggestRef = useRef(null);

  const router = useRouter();
  const city = useSelector((state) => state.auth.city);

  const isAddressDefault = initialValues.is_default;

  const submitHandler = async () => {
    try {
      await onSubmit(values);
    } catch (errs) {
      const backErrors: FormikErrors<IAddressFull> = {};
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
    setFieldError,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: addressValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: submitHandler,
  });

  const handleChangeAddress = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const save = () => handleSubmit();

  const handleCheckChange = async (bool: boolean) => setFieldValue('is_default', bool);

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => validateField(e.target.name);

  const searchAddress = async () => {
    try {
      const res = await dadataApi.findAddress(values.address);
      const json = await res.json();
      const addresesFromRes = json.suggestions;
      setAddreses(addresesFromRes);
    } catch (err) {
      setFieldError('address', 'Что-то пошло не так, адрес не найден. Пожалуйста, попробуйте позже');
    }
  };

  useClickOutside(suggestRef, () => setAddreses([]));

  const debouncedSearchAddress = useDebounce(searchAddress, 800);
  useEffect(() => {
    if (touched.address && values.address) {
      debouncedSearchAddress();
    }
  }, [values.address]);

  useEffect(() => {
    const cookieCity = Cookies.get('city');

    if (!values.address && (router.query.city || city || cookieCity)) {
      setFieldValue('address', router.query.city || city || cookieCity);
    }
  }, [city]);

  const formStyles = [styles.addressForm, inline ? styles.inline : '', isLoading ? styles.loading : ''].join(' ');

  return (
    <form className={formStyles} onSubmit={submitHandler}>
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
          isError={Boolean(errors.is_default)}
        />
      </div>
      <div className={styles.addressFormItem}>
        <div className={styles.addressFormRadio}>
          <InputRadio
            currentValue={{ code: values.elevator, value: values.elevator }}
            value="FREIGHT"
            label="Грузовой"
            name="elevator"
            onChange={(val) => handleElevatorChange(val as Variant<string, ElevatorType>)}
            disabled={values.elevator === 'NONE'}
          />
          <InputRadio
            currentValue={{ code: values.elevator, value: values.elevator }}
            value="PASSENGER"
            label="Пассажирский"
            name="elevator"
            onChange={(val) => handleElevatorChange(val as Variant<string, ElevatorType>)}
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
              isError={Boolean(errors.is_default)}
              disabled={isAddressDefault}
            />
          </div>
        </>
      )}
      <div className={styles.addressFormButtons}>
        <Button
          text={buttonText || 'Сохранить'}
          size="big"
          type="submit"
          style={inline ? { width: '100%' } : {}}
          onClick={save}
        />
      </div>
    </form>
  );
};
export { ProfileAddressesForm };
