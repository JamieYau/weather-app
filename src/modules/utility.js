export default function formatLocalTime(localTime) {
  const dateTime = new Date(localTime);

  const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  const optionsDay = {
    weekday: "long",
    day: "numeric",
  };

  const localDateFormatted = dateTime.toLocaleString(undefined, optionsDate);
  const localTimeFormatted = dateTime.toLocaleString(undefined, optionsTime);
  const localDayFormatted = `${dateTime.toLocaleString(
    undefined,
    optionsDay
  )}${nthNumber(dateTime.getDay())}`;

  return { localDateFormatted, localTimeFormatted, localDayFormatted };
}