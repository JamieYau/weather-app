import render from "./render";

const eventHandlers = (() => {
  function forecastListeners(forecastData) {
    const forecastForm = document.getElementById("forecast-form");

    forecastForm.addEventListener("change", (event) => {
      const selectedOption = event.target.id;
      const forecastItems = document.getElementById("forecast-items");
      if (selectedOption === "daily") {
        render.renderDailyForecast(forecastItems);
        render.updateDailyForecast(forecastData);
      } else if (selectedOption === "hourly") {
        console.log("Hourly forecast");
      }
    });
  }

  return {
    forecastListeners,
  };
})();

export default eventHandlers;
