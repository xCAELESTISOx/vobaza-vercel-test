import { FC, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import type { IOrderAddress } from '../../../../../src/models/IOrder';
import { useClickOutside } from '@nebo-team/vobaza.ui.filter-select/dist/filter-select';
import useDebounce from 'src/hooks/useDebounce';

import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import Drawer from '../../../../../src/hoc/withDrawer';

import { dadataApi } from 'assets/api/dadata';
import styles from './styles.module.scss';

const validationSchema = yup.object({
  address: yup.string().max(255, 'Количество символов в поле должно быть не больше 255').required('Обязательное поле'),
  entrance: yup.string().max(255, 'Количество символов в поле должно быть не больше 255'),
  floor: yup.string().max(255, 'Количество символов в поле должно быть не больше 255'),
  intercom: yup.string().max(255, 'Количество символов в поле должно быть не больше 255'),
});

type Props = {
  address: IOrderAddress;
  // setAddress: (address: IOrderAddress) => void;
  setOuterFieldValue: (name: string, value: any) => void;
  isOpen: boolean;
  onClose: () => void;
};

const OrderAddressDrawer: FC<Props> = ({
  isOpen = false,
  setOuterFieldValue,
  onClose,
  address,
  // setAddress,
}) => {
  const suggestRef = useRef(null);
  useClickOutside(suggestRef, () => setAddreses([]));
  const [addreses, setAddreses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setAddressHandler = () => {
    try {
      setIsLoading(true);
      setOuterFieldValue('address', values);
      // setAddress(values);
      setIsLoading(false);
      onClose();
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const { touched, setFieldTouched, values, setValues, setFieldValue, validateField, errors, handleSubmit } =
    useFormik<IOrderAddress>({
      initialValues: address,
      validationSchema,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: setAddressHandler,
    });
  const handleChangeAddress = async (e) => {
    setAddreses([]);
    setFieldTouched('address');
    handleChange(e);
  };
  const selectAddress = async (addressItem) => {
    setAddreses([]);
    setFieldTouched('address', false);
    setFieldValue('address', addressItem.value);
    if (addressItem.data.entrance) {
      setFieldValue('entrance', addressItem.data.entrance);
    }
    if (addressItem.data.floor) {
      setFieldValue('floor', addressItem.data.floor);
    }
  };
  const handleChange = async (e: any) => {
    await setFieldValue(e.target.name, e.target.value);
  };
  const handleBlur = async (e: any) => {
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
    if (address) {
      setValues(address);
    }
  }, [address]);

  return (
    <Drawer
      title="Адрес"
      buttonText="Подтвердить"
      isOpen={isOpen}
      onClose={onClose}
      onButtonClick={handleSubmit}
      isFullHeight
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.orderAddressFormItem}>
          <InputText
            label="Адрес"
            name="address"
            notion="Начните вводить название улицы"
            value={values.address}
            onChange={handleChangeAddress}
            onBlur={handleBlur}
            error={errors?.address}
            disabled={isLoading}
            required
          />
          {addreses.length > 0 && (
            <div className={styles.addressSelectModalSuggest} ref={suggestRef}>
              {addreses.map((addressItem) => (
                <div
                  key={addressItem.value}
                  className={styles.addressSelectModalSuggestItem}
                  onClick={() => selectAddress(addressItem)}
                >
                  {addressItem.value}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.orderAddressFormItem}>
          <InputText
            label="Подъезд"
            name="entrance"
            value={values.entrance}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.entrance}
            valueType="integer"
            disabled={isLoading}
          />
        </div>
        <div className={styles.orderAddressFormItem}>
          <InputText
            label="Этаж"
            name="floor"
            value={values.floor?.toString()}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.floor}
            valueType="integer"
            disabled={isLoading}
            required
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
