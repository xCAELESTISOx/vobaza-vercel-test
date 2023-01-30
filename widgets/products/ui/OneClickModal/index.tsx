import React, { FC, useEffect } from 'react';
import { FormikErrors, useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import type { IGood } from 'entities/products/model/IGood';
import type { IError } from 'src/models/IError';
import { getImageVariantProps } from 'shared/lib/images';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { useSelector } from 'shared/lib/hooks/useSelector';

import { Title } from '@nebo-team/vobaza.ui.title/dist';
import { Button } from '@nebo-team/vobaza.ui.button/dist';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text/dist';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone/dist';
import ModalLayout from 'src/hoc/withModal';

import PlaceholderImage from 'assets/images/placeholder.png';

import styles from './styles.module.scss';
import { api } from 'app/api';
import { closeOneClickModal } from 'src/store/goods';

interface IOneClickOrder {
  name: string;
  phone: string;
  email: string;
}

const initialValues = {
  name: '',
  phone: '',
  email: '',
};

const validationSchema = yup.object({
  name: yup.string(),
  phone: yup.string().min(12, 'Номер должен содержать минимум 11 цифр').required('Обязательное поле'),
  email: yup.string().email('Невалидный адрес электронной почты'),
});

const OneClickModal: FC = () => {
  const router = useRouter();
  const product = useSelector((state) => state.goods.oneClickGood) as IGood;
  const dispatch = useDispatch();

  const createOrder = async () => {
    // По API приходится НЕ добавлять email в запрос, если соответствующее поле пустое,
    // иначе выдает ошибку
    const data = {
      name: values.name,
      phone: values.phone,
      ...(values.email && { email: values.email }),
    };

    try {
      const res = await api.createOneClickOrder(product.id, data);

      if (!res.data.data.id) {
        (window as any).dataLayer = [...((window as any).dataLayer || [])];
        (window as any)?.dataLayer?.push({
          ecommerce: {
            currencyCode: 'RUB',
            purchase: {
              actionField: { id: res.data.data.id },
              products: [product.id],
            },
          },
        });
      }

      dispatch(closeOneClickModal());
    } catch (e) {
      const errors = e.response?.data?.errors || [];
      const backErrors = {} as FormikErrors<IOneClickOrder>;

      errors.forEach((err: IError) => {
        if (err.source) {
          backErrors[err.source] = err.title;
        }
      });

      setErrors(backErrors);
    }
  };

  const { values, errors, validateField, setFieldValue, handleSubmit, resetForm, setErrors } =
    useFormik<IOneClickOrder>({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: createOrder,
    });

  const handleSubmitForm = () => {
    handleSubmit();
  };

  const onClose = () => {
    dispatch(closeOneClickModal());
  };

  const handleBlur = async (e: any) => {
    const fieldName = e.target.name === 'oneClickName' ? 'name' : e.target.name;

    validateField(fieldName);
  };

  // Handle fields changing
  const handlePhoneChange = async (value: string) => {
    await setFieldValue('phone', value);
  };
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name === 'oneClickName' ? 'name' : e.target.name;

    await setFieldValue(fieldName, e.target.value);
  };

  useEffect(() => {
    resetForm();
    setErrors({});
  }, [product]);

  // Чтобы окно не оставалось открытым при открытии другой ссылки,
  // когда открыто окно "Заказать в один клик"
  useEffect(() => {
    dispatch(closeOneClickModal());
  }, [router.asPath]);

  if (product)
    return (
      <ModalLayout onClose={onClose} isWide>
        <div className={styles.contentWrapper}>
          <Title element="h1" className={`${styles.inlineModalTitle} ${styles.wide}`}>
            Заказать в 1 клик
          </Title>
          <div className={styles.modalItem}>
            <div className={styles.content}>
              <div className={styles.imageBlock}>
                <div className={styles.imageWrapper}>
                  {product.images || product.main_image ? (
                    product.images ? (
                      <Image
                        {...getImageVariantProps(product.images[0].variants, 'medium')}
                        objectFit="contain"
                        alt={product.name}
                      />
                    ) : (
                      <Image
                        {...getImageVariantProps(product.main_image.variants, 'medium')}
                        objectFit="contain"
                        alt={product.name}
                      />
                    )
                  ) : (
                    <Image src={PlaceholderImage} objectFit="contain" alt="" unoptimized />
                  )}
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.productNameWrapper}>
                  <span className={styles.productId}>id: {product.sku}</span>
                  <div className={styles.productName}>{product.name}</div>
                </div>
                <div className={styles.productPriceWrapper}>
                  {Intl.NumberFormat('ru-RU').format(product.price)}&nbsp;₽
                  {product.list_price && (
                    <div className={styles.productDiscountPrice}>
                      {Intl.NumberFormat('ru-RU').format(product.list_price)}
                      &nbsp;₽
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.modalItemBlock}>
            <form className={styles.form}>
              <div className={styles.formItemWrapper}>
                <div className={styles.formItem}>
                  <InputText
                    label="Имя"
                    name="oneClickName"
                    value={values.name}
                    error={errors.name}
                    onBlur={handleBlur}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className={styles.formItemWrapper}>
                <div className={styles.formHalfItem}>
                  <InputPhone
                    name="phone"
                    value={values.phone}
                    error={errors.phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                <div className={styles.formHalfItem}>
                  <InputText
                    label="Электронная почта"
                    name="email"
                    value={values.email}
                    error={errors.email}
                    onBlur={handleBlur}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className={styles.formItemWrapper}>
                <div className={styles.contentFooter}>
                  <div className={styles.buttonWrapper}>
                    <Button size="big" text="Заказать" onClick={handleSubmitForm} isFullScreen />
                  </div>
                  <div className={styles.textWrapper}>
                    Нажимая «Заказать», вы соглашаетесь с договором оферты и подтверждаете своё согласие на обработку
                    персональных данных
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </ModalLayout>
    );

  return <div />;
};

export { OneClickModal };
