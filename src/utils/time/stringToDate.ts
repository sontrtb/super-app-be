import moment from 'moment-timezone';

function stringToDate(dateString: string, isTime?: boolean) {
  if (isTime) {
    return moment
      .tz(dateString, 'HH:mm:ss DD/MM/YYYY', 'Asia/Bangkok')
      .toDate();
  } else {
    return moment
      .tz(dateString, 'DD/MM/YYYY', 'Asia/Bangkok')
      .toDate();
  }
}

export { stringToDate };
