export const getMMSSTimeString = str => {
  let result = parseFloat(str);
  result = Math.floor(result);
  const time = new Date(result * 1000).toISOString().substr(14, 5);
  return time;
};

export const getPostTimeFromCreatedAt = timeString => {
  const date = new Date(timeString);
  const today = new Date();
  let mins = Math.abs(today - date) / (60 * 1000);
  mins = parseInt(mins);
  if (mins < 60) {
    return `${mins} phút trước`;
  } else {
    let hours = Math.abs(today - date) / (60 * 60 * 1000);
    hours = parseInt(hours);
    if (hours < 12) {
      return `${hours} giờ trước`;
    } else {
      return (
        ('0' + date.getDate()).slice(-2) +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        date.getFullYear() +
        ' ' +
        ('0' + date.getHours()).slice(-2) +
        ':' +
        ('0' + date.getMinutes()).slice(-2)
      );
    }
  }
};

export const getPostedTimeFromMillis = timeString => {
  const date = new Date(timeString);
  // console.log('date: ', date);
  const today = new Date();
  // console.log('today: ', today);
  let mins = Math.abs(today - date) / (60 * 1000);
  mins = parseInt(mins);
  if (mins < 60) {
    return `${mins} phút trước`;
  } else {
    let hours = Math.abs(today - date) / (60 * 60 * 1000);
    hours = parseInt(hours);
    if (hours < 12) {
      return `${hours} giờ trước`;
    } else {
      return (
        ('0' + date.getDate()).slice(-2) +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        date.getFullYear() +
        ' ' +
        ('0' + date.getHours()).slice(-2) +
        ':' +
        ('0' + date.getMinutes()).slice(-2)
      );
    }
  }
};
