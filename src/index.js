import "./style.css";

import weatherAPI from "./modules/weatherAPI";
import render from "./modules/render";
import eventHandlers from "./modules/eventHandlers";

async function fetchWeatherData(city) {

  const data = await weatherAPI.fetchData(city);
  const currentWeather = weatherAPI.getCurrentData(data);
  const forecastWeather = weatherAPI.getForecastData(data);
  const location = weatherAPI.getLocationData(data);

  console.log(data);
  console.log(currentWeather);
  console.log(forecastWeather);
  console.log(location);

  render.renderCurrentWeather(currentWeather, location);
  render.updateDailyForecast(forecastWeather);

  eventHandlers.forecastListeners(forecastWeather);
}

render.initializePage();
// wait till dom/initializepage is called, then call fetchWeatherData
document.addEventListener("DOMContentLoaded", fetchWeatherData("London"));
