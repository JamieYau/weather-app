import weatherAPI from "./weatherAPI.js";

const render = (() => {
  function initializePage(data) {
    // Set up initial page structure
  }

  function renderCurrentWeather(currentWeather, location) {
    // Update DOM with current weather data
    const main = document.querySelector("main");
    const info = main.querySelector(".weather-info");

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
  }

  function renderForecast(forecastData) {
    // Update DOM with forecast data
  }

  function formatLocalTime(localTime) {
    const dateTime = new Date(localTime);
    const optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    const localDateFormatted = dateTime.toLocaleString(undefined, optionsDate);
    const localTimeFormatted = dateTime.toLocaleString(undefined, optionsTime);

    return { localDateFormatted, localTimeFormatted };
  }

  return {
    initializePage,
    renderCurrentWeather,
    renderForecast,
  };
})();

export default render;
