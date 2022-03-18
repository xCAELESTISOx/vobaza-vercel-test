import React, { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import * as yup from 'yup';

import { useGoods } from 'src/context/goods';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import { Title } from '@nebo-team/vobaza.ui.title';
import { Button } from '@nebo-team/vobaza.ui.button';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import { InputPhone } from '@nebo-team/vobaza.ui.inputs.input-phone';
import ModalLayout from 'src/hoc/withModal';

import styles from './styles.module.scss';
import { api } from 'assets/api';
import { useRouter } from 'next/router';

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
  phone: yup.string().required('Обязательное поле'),
  email: yup.string().email('Невалидный адрес электронной почты'),
});

const OneClick: FC = () => {
  const router = useRouter()
  const { state, dispatch } = useGoods();
  const { oneClickGood: product } = state;

  const createOrder = async () => {
    // По API приходится НЕ добавлять email в запрос, если соответствующее поле пустое,
    // иначе выдает ошибку
    const data = {
      name: values.name,
      phone: values.phone,
      ...(values.email && { email: values.email }),
    };

    await api.createOneClickOrder(product.id, data);
    dispatch({ type: 'closeOneClickModal' });
  };

  const { values, errors, validateField, setFieldValue, handleSubmit, resetForm } =
    useFormik<IOneClickOrder>({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: createOrder,
    });

  const onClose = () => {
    dispatch({ type: 'closeOneClickModal' });
  };

  const handleBlur = async (e: any) => {
    validateField(e.target.name);
  };

  // Handle fields changing
  const handlePhoneChange = async (value: string) => {
    await setFieldValue('phone', value);
  };
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setFieldValue(e.target.name, e.target.value);
  };

  useEffect(() => {
    resetForm();
  }, [product]);

  // Чтобы окно не оставалось открытым при открытии другой ссылки, 
  // когда открыто окно "Заказать в один клик"
  useEffect(() => {
    dispatch({ type: 'closeOneClickModal' });
  }, [router.asPath])
  

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
                        src={product.images[0].variants.medium.url}
                        width={product.images[0].variants.medium.meta.width}
                        height={product.images[0].variants.medium.meta.height}
                        objectFit="contain"
                        alt={product.name}
                      />
                    ) : (
                      <Image
                        src={product.main_image.variants.medium.url}
                        width={product.main_image.variants.medium.meta.width}
                        height={product.main_image.variants.medium.meta.height}
                        objectFit="contain"
                        alt={product.name}
                      />
                    )
                  ) : (
                    <Icon name="ImagePlaceholder" />
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
                      {Intl.NumberFormat('ru-RU').format(product.list_price)}&nbsp;₽
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.modalItemBlock}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formItemWrapper}>
                <div className={styles.formItem}>
                  <InputText
                    label={'Имя'}
                    name={'name'}
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
                    name={'phone'}
                    value={values.phone}
                    error={errors.phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                <div className={styles.formHalfItem}>
                  <InputText
                    label={'Электронная почта'}
                    name={'email'}
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
                    <Button size="big" text="Заказать" type="submit" isFullScreen />
                  </div>
                  <div className={styles.textWrapper}>
                      Нажимая «Заказать», вы соглашаетесь с договором оферты и подтверждаете своё
                      согласие на обработку персональных данных
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

export default OneClick;
