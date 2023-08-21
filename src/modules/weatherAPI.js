/* eslint-disable no-param-reassign */
const weatherAPI = (() => {
  /* eslint-disable prefer-destructuring */
  const API_ROOT = process.env.API_ROOT;
  const API_KEY = process.env.API_KEY;
  /* eslint-enable prefer-destructuring */

  async function fetchSuggestions(query) {
    const response = await fetch(
      `${API_ROOT}search.json?key=${API_KEY}&q=${query}`
    );
    const data = await response.json();
    return data;
  }

  async function fetchData(city) {
    const response = await fetch(
      `${API_ROOT}forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
    );
    const data = await response.json();
    return data;
  }

  function getCurrentData(data) {
    const currentJSON = data.current;
    return {
      conditionText: currentJSON.condition.text,
      conditionIcon: `https:${currentJSON.condition.icon.slice(2)}`,
      temperatureC: currentJSON.temp_c,
      temperatureF: currentJSON.temp_f,
      feelsLikeC: currentJSON.feelslike_c,
      feelsLikeF: currentJSON.feelslike_f,
      humidity: currentJSON.humidity,
      windSpeedKph: currentJSON.wind_kph,
      windSpeedMph: currentJSON.wind_mph,
      windDirection: currentJSON.wind_dir,
      uvIndex: currentJSON.uv,
      visibilityKm: currentJSON.vis_km,
      visibilityMiles: currentJSON.vis_miles,
    };
  }

  function getForecastData(data) {
    const forecastJSON = data.forecast.forecastday;
    return forecastJSON.map((day) => ({
      date: day.date,
      conditionText: day.day.condition.text,
      conditionIcon: `https:${day.day.condition.icon.slice(2)}`,
      tempAvgC: day.day.avgtemp_c.toFixed(0),
      tempAvgF: day.day.avgtemp_f.toFixed(0),
      tempLowC: day.day.mintemp_c.toFixed(0),
      tempLowF: day.day.mintemp_f.toFixed(0),
      tempHighC: day.day.maxtemp_c.toFixed(0),
      tempHighF: day.day.maxtemp_f.toFixed(0),
      humidity: day.day.avghumidity,
      windSpeedKph: day.day.maxwind_kph,
      windSpeedMph: day.day.maxwind_mph,
      windDirection: day.day.wind_dir,
      uvIndex: day.day.uv,
      visibilityKm: day.day.avgvis_km,
      visibilityMiles: day.day.avgvis_miles,
    }));
  }

  function getLocationData(data) {
    const locationJSON = data.location;

    return {
      name: locationJSON.name,
      country: locationJSON.country,
      region: locationJSON.region,
      localTime: locationJSON.localtime,
      lat: locationJSON.lat,
      lon: locationJSON.lon,
      timezone: locationJSON.tz_id,
    };
  }

  function getNext24HoursForecast(data) {
    const currentHour = new Date().getHours();
    const forecastDays = data.forecast.forecastday;
    const hoursData = forecastDays.flatMap((day) => day.hour);

    const next24HoursData = hoursData.slice(currentHour, currentHour + 24);
    next24HoursData.forEach((hour) => {
      hour.condition.icon = `https:${hour.condition.icon.slice(2)}`;
      hour.temp_c = hour.temp_c.toFixed(0);
      hour.temp_f = hour.temp_f.toFixed(0);
    });
    return next24HoursData;
  }

  return {
    fetchSuggestions,
    fetchData,
    getCurrentData,
    getForecastData,
    getLocationData,
    getNext24HoursForecast,
  };
})();

export default weatherAPI;
