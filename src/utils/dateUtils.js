export function toStartDay(date) {
  const newDate = new Date(date.getTime());
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
}

export function toEndDay(date) {
  const newDate = new Date(date.getTime());
  newDate.setUTCHours(23, 59, 59, 999);
  return newDate;
}

export function getCurrentDateStartDay() {
  return toStartDay(new Date());
}

export function getCurrentDateEndDay() {
  return toEndDay(new Date());
}

export function fromIsoWithStartDay(date) {
  return toStartDay(new Date(date));
}

export function fromIsoWithEndDay(date) {
  return toEndDay(new Date(date));
}

export function firstDayOfMonth(year, month) {
  return new Date(`${year}-${month}-01`);
}

export function lastDayOfMonth(year, month) {
  const date = new Date(year, month - 1, 32);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const dateOfLastDayOfMonth = new Date(firstDay.toISOString());
  dateOfLastDayOfMonth.setDate(dateOfLastDayOfMonth.getDate() - 1);

  return dateOfLastDayOfMonth;
}

export function between(startDate, endDate, date) {
  const start = toStartDay(new Date(startDate));
  const end = toStartDay(new Date(endDate));
  const betweenDate = toStartDay(new Date(date));

  return start <= betweenDate && betweenDate <= end;
}
