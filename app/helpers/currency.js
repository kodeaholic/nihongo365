export const numberToCurrencyFormat = (
  number,
  format = 'vi-Vn',
  unit = 'đ',
) => {
  const num =
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ` ${unit}`;
  return num;
};
