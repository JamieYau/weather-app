const render = (() => {
  function initializePage(data) {}

  function formatLocalTime(localTime) {
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
    const localDayFormatted = `${dateTime.toLocaleString(undefined, optionsDay)}${nthNumber(
      dateTime.getDay()
    )}`;

    return { localDateFormatted, localTimeFormatted, localDayFormatted };
  }

  function renderCurrentWeather(currentWeather, location) {
    // Update DOM with current weather data
    const main = document.querySelector("main");
    const info = main.querySelector("#weather-info");

    const city = info.querySelector(".city");
    city.textContent = location.name;
    const { localDateFormatted, localTimeFormatted } = formatLocalTime(
      location.localTime
    );
    const localDateElement = info.querySelector(".local-date");
    localDateElement.textContent = localDateFormatted;
    const localTimeElement = info.querySelector(".local-time");
    localTimeElement.textContent = localTimeFormatted;
    const conditionIcon = info.querySelector(".condition-icon");
    conditionIcon.src = currentWeather.conditionIcon;
    const conditionText = info.querySelector(".condition-text");
    conditionText.textContent = currentWeather.conditionText;
    const temperature = info.querySelector(".temperature");
    temperature.textContent = `${currentWeather.temperatureC} °C`;

    const extraInfo = main.querySelector("#weather-extra-info");
    const feelsLikeValue = extraInfo.querySelector("#feels-like-value");
    feelsLikeValue.textContent = `${currentWeather.feelsLikeC} °C`;
    const humidity = extraInfo.querySelector("#humidity-value");
    humidity.textContent = `${currentWeather.humidity}%`;
    const windSpeed = extraInfo.querySelector("#wind-speed-value");
    windSpeed.textContent = `${currentWeather.windSpeedMph} mph`;
    const windDirection = extraInfo.querySelector("#wind-direction-value");
    windDirection.textContent = currentWeather.windDirection;
    const uvIndex = extraInfo.querySelector("#uv-index-value");
    uvIndex.textContent = currentWeather.uvIndex;
  }

  function renderForecast(forecastData) {
    // Update DOM with forecast data
    const items = document.querySelectorAll(".forecast-item");
    items.forEach((item, index) => {
      const day = item.querySelector(".day");
      day.textContent = formatLocalTime(
        forecastData[index].date
      ).localDayFormatted;
      const tempHigh = item.querySelector(".temp-high");
      tempHigh.textContent = `${forecastData[index].tempHighC} °C`;
      const tempLow = item.querySelector(".temp-low");
      tempLow.textContent = `${forecastData[index].tempLowC} °C`;
      const icon = item.querySelector(".icon");
      icon.src = forecastData[index].conditionIcon;
    });
  }

  return {
    initializePage,
    renderCurrentWeather,
    renderForecast,
  };
})();

export default render;
