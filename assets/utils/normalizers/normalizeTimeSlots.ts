import type { Variant } from '@nebo-team/vobaza.ui.inputs.input-select';

const matchDate = (firstDate: Date, secondDate: Date) =>
  firstDate.setUTCHours(0, 0, 0, 0) === secondDate.setUTCHours(0, 0, 0, 0);

export const normalizeTimeSlots = (
  timeSlots: Variant<string | number>[],
  deliveryDate: Date,
  /** Запас по времени */
  deltaTime = 0,
  exeptionCode: null | string = null
) => {
  const isTodaySelected = deliveryDate ? matchDate(deliveryDate, new Date()) : false;

  const date = new Date();
  const currentHours = date.getHours() + date.getMinutes() / 60 + deltaTime;

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
