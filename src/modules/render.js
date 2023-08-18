import formatLocalTime from "./utility";

const render = (() => {
  function initializePage() {
    function createHeader() {
      const header = document.createElement("header");
      const searchContainer = document.createElement("div");
      searchContainer.id = "search-container";

      const searchInput = document.createElement("input");
      searchInput.type = "search";
      searchInput.name = "location";
      searchInput.id = "location";
      searchInput.placeholder = "Search Location...";

      const searchIcon = document.createElement("box-icon");
      searchIcon.setAttribute("name", "search");
      searchIcon.id = "search-icon";
      searchIcon.setAttribute("color", "grey");

      searchContainer.appendChild(searchInput);
      searchContainer.appendChild(searchIcon);
      header.appendChild(searchContainer);
      document.body.appendChild(header);
    }
    /* <main id="container">
      <section id="weather-info">
        <div class="city"></div>
        <div class="local-date"></div>
        <div class="local-time"></div>
        <img class="condition-icon" />
        <div class="condition-text"></div>
        <div class="temperature"></div>
      </section>
      <section id="weather-extra-info">
        <div id="feels-like" class="extra-item">
          <box-icon type="solid" name="thermometer" color="white"></box-icon>
          <div class="extra-item-info">
            <div id="feels-like-text">Feels Like</div>
            <div id="feels-like-value"></div>
          </div>
        </div>
        <div id="humidity" class="extra-item">
          <box-icon name="water" color="white"></box-icon>
          <div class="extra-item-info">
            <div id="humidity-text">Humidity</div>
            <div id="humidity-value"></div>
          </div>
        </div>
        <div id="wind-speed" class="extra-item">
          <box-icon name="wind" color="white"></box-icon>
          <div class="extra-item-info">
            <div id="wind-speed-text">Wind Speed</div>
            <div id="wind-speed-value"></div>
          </div>
        </div>
        <div id="wind-direction" class="extra-item">
          <box-icon name="compass" color="white"></box-icon>
          <div class="extra-item-info">
            <div id="wind-direction-text">Wind Direction</div>
            <div id="wind-direction-value"></div>
          </div>
        </div>
        <div id="uv-index" class="extra-item">
          <box-icon name="sun" color="white"></box-icon>
          <div class="extra-item-info">
            <div id="uv-index-text">UV Index</div>
            <div id="uv-index-value"></div>
          </div>
        </div>
      </section>
    </main> */
    function createMain() {
      const main = document.createElement("main");
      main.id = "container";

      const weatherInfo = document.createElement("section");
      weatherInfo.id = "weather-info";
      const city = document.createElement("div");
      city.classList.add("city");
      const localDate = document.createElement("div");
      localDate.classList.add("local-date");
      const localTime = document.createElement("div");
      localTime.classList.add("local-time");
      const conditionIcon = document.createElement("img");
      conditionIcon.classList.add("condition-icon");
      const conditionText = document.createElement("div");
      conditionText.classList.add("condition-text");
      const temperature = document.createElement("div");
      temperature.classList.add("temperature");

      weatherInfo.appendChild(city);
      weatherInfo.appendChild(localDate);
      weatherInfo.appendChild(localTime);
      weatherInfo.appendChild(conditionIcon);
      weatherInfo.appendChild(conditionText);
      weatherInfo.appendChild(temperature);

      function createExtraInfoElement(
        id,
        iconType,
        iconName,
        iconColor,
        labelText
      ) {
        const element = document.createElement("div");
        element.id = id;
        element.classList.add("extra-item");

        const icon = document.createElement("box-icon");
        if (iconType) {
          icon.setAttribute("type", iconType);
        }
        icon.setAttribute("name", iconName);
        icon.setAttribute("color", iconColor);
        element.appendChild(icon);

        const info = document.createElement("div");
        info.classList.add("extra-item-info");

        const labelTextElement = document.createElement("div");
        labelTextElement.id = `${id}-text`;
        labelTextElement.textContent = labelText;

        const valueElement = document.createElement("div");
        valueElement.id = `${id}-value`;

        info.appendChild(labelTextElement);
        info.appendChild(valueElement);
        element.appendChild(info);

        return element;
      }

      function createWeatherExtraInfo() {
        const weatherExtraInfo = document.createElement("section");
        weatherExtraInfo.id = "weather-extra-info";

        const extraInfoItems = [
          {
            id: "feels-like",
            iconType: "solid",
            iconName: "thermometer",
            iconColor: "white",
            labelText: "Feels Like",
          },
          {
            id: "humidity",
            iconName: "water",
            iconColor: "white",
            labelText: "Humidity",
          },
          {
            id: "wind-speed",
            iconName: "wind",
            iconColor: "white",
            labelText: "Wind Speed",
          },
          {
            id: "wind-direction",
            iconName: "compass",
            iconColor: "white",
            labelText: "Wind Direction",
          },
          {
            id: "uv-index",
            iconName: "sun",
            iconColor: "white",
            labelText: "UV Index",
          },
        ];

        extraInfoItems.forEach((item) => {
          const extraInfoElement = createExtraInfoElement(
            item.id,
            item.iconType,
            item.iconName,
            item.iconColor,
            item.labelText
          );
          weatherExtraInfo.appendChild(extraInfoElement);
        });

        return weatherExtraInfo;
      }
      main.appendChild(weatherInfo);
      main.appendChild(createWeatherExtraInfo());
      document.body.appendChild(main);
    }

    createHeader();
    createMain();
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
