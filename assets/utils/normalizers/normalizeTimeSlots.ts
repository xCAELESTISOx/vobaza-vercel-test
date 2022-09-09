import type { Variant } from "@nebo-team/vobaza.ui.inputs.input-select";

export const normalizeTimeSlots = (timeSlots: Variant<string | number>[], deltaTime = 0, exeptionCode: null | string = null) => {
  // deltaTime - запас по времени
  const date = new Date();
  const currentHours = date.getHours() + date.getMinutes() / 60 + deltaTime;

  const newTimeSlots = timeSlots.filter((item) => {
    if(item.code === exeptionCode) return true
    const hours = item.value.split('-');
    const numberHours = hours.map((hour) => {
      const splitted = hour.split(':');
      return Number(splitted[0]) + Number(splitted[1]) / 60;
    });
    return (numberHours[0] < currentHours && numberHours[1] > currentHours) || numberHours[1] > currentHours;
  });

  return newTimeSlots;
};
