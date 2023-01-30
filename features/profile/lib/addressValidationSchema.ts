import * as yup from 'yup';

const BASIC_FLOOR_ERROR = 'Укажите этаж';
const EXCEEDING_FLOOR_ERROR = 'Номер этажа должен быть не более 100';

export const addressValidationSchema = yup.object({
  address: yup.string().required('Обязательное поле'),
  flat: yup.string(),
  entrance: yup.string(),
  floor: yup
    .number()
    .typeError(BASIC_FLOOR_ERROR)
    .min(1, BASIC_FLOOR_ERROR)
    .max(100, EXCEEDING_FLOOR_ERROR)
    .required(BASIC_FLOOR_ERROR)
    .test('no-leading-zero', 'Значение не должно начинаться с нуля', (_, context) => {
      return !String((context as any)?.originalValue).startsWith('0');
    }),
  intercom: yup.string(),
});
