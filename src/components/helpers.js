export function getFormattedDate(dateString) {
  let date;
  if (dateString) {
    date = new Date(dateString);
  } else {
    date = new Date();
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let hours = date.getHours();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const minutes = date.getMinutes();

  return `${day} / ${month} / ${year}, ${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${meridiem}`;
}
