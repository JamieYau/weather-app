const API_ROOT = process.env.API_ROOT;
const API_KEY = process.env.API_KEY;

async function fetchData(city) {
  const response = await fetch(
    `${API_ROOT}forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
  );
  const data = await response.json();
  return data;
}

export default fetchData;
