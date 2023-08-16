import "./style.css";
import weatherAPI from "./modules/weatherAPI";

async function fetchWeatherData(city) {
  const data = await weatherAPI.fetchData(city);
  const currentWeather = weatherAPI.getCurrentData(data);
  const forecastWeather = weatherAPI.getForecastData(data);

  console.log(data);
  console.log(currentWeather);
  console.log(forecastWeather);
}

fetchWeatherData("London");
