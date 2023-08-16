import weatherAPI from "../modules/weatherAPI";

let fetchedData;
beforeAll(async () => {
  fetchedData = await weatherAPI.fetchData("New York");
});

describe("fetchData", () => {
  it("fetches data", () => {
    expect(fetchedData).toBeDefined();
  });
});

describe("getCurrentData", () => {
  it("returns current data", () => {
    const currentData = weatherAPI.getCurrentData(fetchedData);
    expect(currentData).toBeDefined();
  });
});

describe("getForecastData", () => {
  it("returns forecast data", () => {
    const forecastData = weatherAPI.getForecastData(fetchedData);
    expect(forecastData).toBeDefined();
  });
});
