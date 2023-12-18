/* eslint-disable no-var */
export function getTimelapseInSeconds(msStart, msEnd) {
  return Math.floor((msEnd - msStart) / 1000);
}

export function calcTimeInSeconds(timerList) {
  let totalSeconds = 0;
  let currentStartTime = null;
  if (timerList) {
    const timers = timerList.map((timerItem) =>
      new Date(timerItem.timer).getTime()
    );
    timers.sort();

    if (timers.length % 2 === 1) {
      currentStartTime = timers[timers.length - 1];
    }

    for (let i = 0; i < timers.length - 1; i += 2) {
      const seconds = getTimelapseInSeconds(timers[i], timers[i + 1]);
      totalSeconds += seconds;
    }
  }

  return { seconds: totalSeconds, currentStartTime };
}

export function formatSecondsForClock(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = (totalSeconds % 3600) % 60;

  const hoursStr = `${hours}`.padStart(2, "0");
  const secondsStr = `${seconds}`.padStart(2, "0");
  const minutesStr = `${minutes}`.padStart(2, "0");

  const format =
    hours > 0
      ? `${hoursStr}:${minutesStr}:${secondsStr}`
      : `${minutesStr}:${secondsStr}`;

  return format;
}

export function timeConvert(minutes) {
  var num = minutes;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutess = (hours - rhours) * 60;
  var rminutes = Math.round(minutess);

  const hoursStr = `${rhours}`.padStart(2, "0");
  const minutesStr = `${rminutes}`.padStart(2, "0");

  return `${hoursStr}:${minutesStr}`;
}

export function estimatedTime(miliseconds) {
  var seconds = miliseconds / 1000;
  var minutes = seconds / 60;
  return timeConvert(minutes);
}

export function getSecondsBetween(startDate, finalDate) {
  const miliseconds = finalDate.getTime() - startDate.getTime();
  return miliseconds / 1000;
}

export function getMinutesBetween(startDate, finalDate) {
  const seconds = getSecondsBetween(startDate, finalDate);
  return seconds / 60;
}
