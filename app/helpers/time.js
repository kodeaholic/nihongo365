import moment from 'moment';
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

export const getCurrentTime = (time = 0) => {
  const nowTime = new Date();
  const myyear = nowTime.getFullYear();
  const myday = nowTime.getDay();
  const delay = moment().diff(
    moment(time)
      .toArray()
      .slice(0, 3),
    'days',
  );
  const old = new Date(parseInt(time));
  const oldyear = old.getFullYear();
  const oldm = old.getMonth() + 1;
  const oldd = old.getDate();
  const oldday = old.getDay();
  const oldh = old.getHours();
  const oldmin =
    old.getMinutes() < 10 ? `0${old.getMinutes()}` : old.getMinutes();
  if (delay === 0) {
    return `${oldh}:${oldmin}`;
  }
  if (delay === 1) {
    return `Hôm qua ${oldh}:${oldmin}`;
  }

  if (delay > 1 && myday > oldday && delay < 7) {
    let xingqi;
    switch (oldday) {
      case 0:
        xingqi = 'Chủ Nhật';
        break;
      case 1:
        xingqi = 'Thứ Hai';
        break;
      case 2:
        xingqi = 'Thứ Ba';
        break;
      case 3:
        xingqi = 'Thứ Tư';
        break;
      case 4:
        xingqi = 'Thứ Năm';
        break;
      case 5:
        xingqi = 'Thứ Sáu';
        break;
      case 6:
        xingqi = 'Thứ Bảy';
        break;
    }
    return `${xingqi} ${oldh}:${oldmin}`;
  }

  if (delay > 1 && myday === oldday && oldyear === myyear) {
    return `${oldm}/${oldd} ${oldh}:${oldmin}`;
  }

  if (delay > 1 && myday === oldday && oldyear < myyear) {
    return `${oldyear}/${oldm}/${oldd} ${oldh}:${oldmin}`;
  }

  if (delay > 1 && myday < oldday && oldyear === myyear) {
    return `${oldm}/${oldd} ${oldh}:${oldmin}`;
  }

  if (delay > 1 && myday > oldday && oldyear === myyear && delay > 7) {
    return `${oldm}/${oldd} ${oldh}:${oldmin}`;
  }

  if (delay > 1 && myday > oldday && delay >= 7 && oldyear < myyear) {
    return `${oldyear}/${oldm}/${oldd} ${oldh}:${oldmin}`;
  }

  if (delay > 1 && myday < oldday && oldyear < myyear) {
    return `${oldyear}/${oldm}/${oldd} ${oldh}:${oldmin}`;
  }
};
