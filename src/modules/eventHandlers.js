import render from "./render";

const eventHandlers = (() => {
  function forecastListeners(forecastData) {
    const forecastForm = document.getElementById("forecast-form");

    forecastForm.addEventListener("change", (event) => {
      const selectedOption = event.target.id;
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = "";
      if (selectedOption === "daily") {
        render.renderDailyForecast(forecastContainer);
        render.updateDailyForecast(forecastData);
      } else if (selectedOption === "hourly") {
        render.renderHourlyForecast(forecastContainer);
      }
    });
  }

  return {
    forecastListeners,
  };
})();

export default eventHandlers;
