import React, { FC, useState } from 'react';
import Image from 'next/image';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { Button } from '@nebo-team/vobaza.ui.button';
import { InputText } from '@nebo-team/vobaza.ui.inputs.input-text';
import Modal from '../../../../src/hoc/withModal';
import { RatingStars } from '../../../UI/RatingStars';
import { UploadPhotos } from './UploadPhotos';

import styles from './styles.module.scss';

import { toNumberWithSpaces } from '../../../../assets/utils/formatters';
import PlaceholderImage from 'assets/images/placeholder.png'


interface CreateReviewModal {
  active: boolean;
  onClose: () => void;
  productInfo: any;
}

const initialValues = {
  name: '',
  positive: '',
  negative: '',
  score: null,
  comment: '',
  files: [],
};

const validationSchema = yup.object({
  name: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  score: yup.number().required(),
  positive: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  negative: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  comment: yup
    .string()
    .max(255, 'Количество символов в поле должно быть не больше 255')
    .required('Обязательное поле'),
  files: yup.array(),
});

const CreateReviewModal: FC<CreateReviewModal> = ({
  active,
  onClose = () => {},
  productInfo = {},
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const createReview = () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        resetForm();
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
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: createReview,
  });

  const handleChange = async (e: any) => {
    await setFieldValue(e.target.name, e.target.value);
  };
  const handleChangeCustomField = async (name: string, value: any) => {
    await setFieldValue(name, value);
  };
  const handleBlur = async (e: any) => {
    validateField(e.target.name);
  };

  const productImageURL = productInfo.image ? productInfo.image.url : null;

  return (
    <>
      {active && (
        <Modal onClose={onClose}>
          <div className={styles.reviewModalContent}>
            <h3 className={styles.reviewModalTitle}>Оставьте отзыв о товаре</h3>

            <div className={styles.reviewModalProduct}>
              <div className={styles.reviewModalProductImage}>
                <div>
                  {productImageURL ? (
                    <img src={productImageURL || ''} alt="" />
                  ) : (
                    <Image src={PlaceholderImage} objectFit="contain" unoptimized alt="" />

                  )}
                </div>
              </div>
              <div className={styles.reviewModalProductInfo}>
                <div className={styles.reviewModalProductCode}>
                  Артикул: {productInfo.articleNumber}
                </div>
                <div className={styles.reviewModalProductTitle}>
                  {productInfo.title}
                </div>
                <div className={styles.reviewModalProductPrice}>
                  {toNumberWithSpaces(productInfo.price)}&nbsp;₽
                </div>
              </div>
            </div>

            <div className={styles.reviewModalDivider}></div>

            <form className={styles.reviewModalForm} onSubmit={createReview}>
              <div className={styles.reviewModalField}>
                <InputText
                  name="name"
                  label="Ваше имя"
                  value={values.name}
                  onChange={handleChange}
                  error={errors?.name}
                  onBlur={handleBlur}
                  required
                />
              </div>

              <div className={styles.reviewModalFieldScore}>
                <div className={styles.reviewModalScoreLabel}>
                  Выберите оценку:<span>*</span>
                </div>
                <RatingStars
                  editable
                  size="Big"
                  value={values.score}
                  onChange={(e) => handleChangeCustomField('score', e)}
                />
              </div>

              <div className={styles.reviewModalField}>
                <InputText
                  name="positive"
                  label="Достоинства"
                  value={values.positive}
                  onChange={handleChange}
                  error={errors?.positive}
                  onBlur={handleBlur}
                  required
                  multiline
                />
              </div>

              <div className={styles.reviewModalField}>
                <InputText
                  name="negative"
                  label="Недостатки"
                  value={values.negative}
                  onChange={handleChange}
                  error={errors?.negative}
                  onBlur={handleBlur}
                  required
                  multiline
                />
              </div>

              <div className={styles.reviewModalField}>
                <InputText
                  name="comment"
                  label="Комментарии"
                  value={values.comment}
                  onChange={handleChange}
                  error={errors?.comment}
                  onBlur={handleBlur}
                  required
                  multiline
                />
              </div>

              <div className={styles.reviewModalField}>
                <UploadPhotos
                  onChange={(e) => handleChangeCustomField('files', e)}
                />
              </div>

              <Button
                text="Оставить отзыв"
                type="submit"
                disabled={isLoading}
              />
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export { CreateReviewModal };
