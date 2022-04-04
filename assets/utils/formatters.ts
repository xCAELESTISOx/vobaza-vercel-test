const toNumberWithSpaces = (price: number) => {
  return Intl.NumberFormat('ru-RU').format(price);
};

export { toNumberWithSpaces };

export const formatOrderDate = (
  dateString: string,
  withYear: boolean,
  withDay?: boolean
) => {
  const dayText = [
    'в воскресенье',
    'в понедельник',
    'во вторник',
    'в среду',
    'в четверг',
    'в пятницу',
    'в субботу',
  ];
  const monthText = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const date = new Date(dateString);
  return `${withDay ? dayText[date.getDay()] + ', ' : ''}${date.getDate()} ${monthText[date.getMonth()]
    }${withYear ? ' ' + date.getFullYear() : ''}`;
};
export const formatOrderTimeInterval = (interval) => {
  const intervalArr = interval.split('_');
  return `с ${intervalArr[1]}:00 до ${intervalArr[2]}:00`;
};
