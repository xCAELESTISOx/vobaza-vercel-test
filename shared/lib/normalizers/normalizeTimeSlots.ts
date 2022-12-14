import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';

export const formatDate = (date?: Date | null) => {
  if (!date) return undefined;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const newDate = year + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day);

  return newDate;
};


const matchDate = (firstDate: Date, secondDate: Date) => formatDate(firstDate) === formatDate(secondDate)

export const normalizeTimeSlots = (
  timeSlots: Variant<string | number>[],
  deliveryDate: Date,
  /** Запас по времени */
  deltaTime = 1,
  exeptionCode: null | string = null
) => {
  const now = new Date();

  const isTodaySelected = deliveryDate ? matchDate(deliveryDate, new Date()) : false;


  const currentHours = now.getHours() + now.getMinutes() / 60 + deltaTime;

  const newTimeSlots = isTodaySelected
    ? timeSlots.filter((item) => {
        if (item.code === exeptionCode) return true;
        const hours = item.value.split('-');
        const numberHours = hours.map((hour) => {
          const splitted = hour.split(':');
          return Number(splitted[0]) + Number(splitted[1]) / 60;
        });
        return (numberHours[0] < currentHours && numberHours[1] > currentHours) || numberHours[1] > currentHours;
      })
    : timeSlots;

  return newTimeSlots;
};
