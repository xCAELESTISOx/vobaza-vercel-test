const toNumberWithSpaces = (price: number) => {
  return Intl.NumberFormat('ru-RU').format(price);
};

export { toNumberWithSpaces };
