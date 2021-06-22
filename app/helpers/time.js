export const getMMSSTimeString = str => {
  let result = parseFloat(str);
  result = Math.floor(result);
  const time = new Date(result * 1000).toISOString().substr(14, 5);
  return time;
};
