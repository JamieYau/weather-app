import "./style.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import weatherAPI from "./modules/weatherAPI";
import render from "./modules/render";

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
}

fetchWeatherData("London");
