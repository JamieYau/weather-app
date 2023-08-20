import formatLocalTime from "./utility";

const render = (() => {
  function renderDailyForecast(forecastContainer) {
    if (document.getElementById("carousel-navigation")) {
      document
        .getElementById("forecast-form")
        .removeChild(document.getElementById("carousel-navigation"));
    }
    for (let i = 0; i < 3; i += 1) {
      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item", "daily");

      const day = document.createElement("div");
      day.classList.add("day");
      forecastItem.appendChild(day);

      const tempHigh = document.createElement("div");
      tempHigh.classList.add("temp-high");
      forecastItem.appendChild(tempHigh);

      const tempLow = document.createElement("div");
      tempLow.classList.add("temp-low");
      forecastItem.appendChild(tempLow);

      const icon = document.createElement("img");
      icon.classList.add("icon");
      forecastItem.appendChild(icon);

      forecastContainer.appendChild(forecastItem);
    }
  }

  function updateDailyForecast(dailyForecastData) {
    // Update DOM with forecast data
    const items = document.querySelectorAll(".forecast-item");
    items.forEach((item, index) => {
      const day = item.querySelector(".day");
      day.textContent = formatLocalTime(
        dailyForecastData[index].date
      ).localDayFormatted;
      const tempHigh = item.querySelector(".temp-high");
      tempHigh.textContent = `${dailyForecastData[index].tempHighC} °C`;
      const tempLow = item.querySelector(".temp-low");
      tempLow.textContent = `${dailyForecastData[index].tempLowC} °C`;
      const icon = item.querySelector(".icon");
      icon.src = dailyForecastData[index].conditionIcon;
    });
  }

  function initializePage() {
    function createHeader() {
      const header = document.createElement("header");
      const searchForm = document.createElement("form");
      searchForm.id = "search-form";

      const searchInput = document.createElement("input");
      searchInput.type = "search";
      searchInput.name = "location";
      searchInput.id = "location";
      searchInput.placeholder = "Search Location...";
      searchInput.required = true;
      searchInput.minLength = 2;

      const searchButton = document.createElement("button");
      searchButton.type = "submit";
      const searchIcon = document.createElement("box-icon");
      searchIcon.setAttribute("name", "search");
      searchIcon.id = "search-icon";
      searchIcon.setAttribute("color", "grey");
      searchButton.appendChild(searchIcon);

      const errorMessage = document.createElement("div");
      errorMessage.id = "error-message";

      const suggestionsList = document.createElement("ul");
      suggestionsList.id = "suggestions-list";

      searchForm.appendChild(searchInput);
      searchForm.appendChild(searchButton);
      searchForm.appendChild(errorMessage);
      header.appendChild(searchForm);
      header.appendChild(suggestionsList);
      document.body.appendChild(header);
    }

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

    function createForecastSection() {
      const forecast = document.createElement("section");
      forecast.className = "forecast";

      const forecastForm = document.createElement("form");
      forecastForm.id = "forecast-form";

      const dailyOption = document.createElement("input");
      dailyOption.type = "radio";
      dailyOption.name = "forecast";
      dailyOption.id = "daily";
      dailyOption.checked = true;
      const dailyLabel = document.createElement("label");
      dailyLabel.setAttribute("for", "daily");
      dailyLabel.textContent = "Daily";

      const hourlyOption = document.createElement("input");
      hourlyOption.type = "radio";
      hourlyOption.name = "forecast";
      hourlyOption.id = "hourly";
      const hourlyLabel = document.createElement("label");
      hourlyLabel.setAttribute("for", "hourly");
      hourlyLabel.textContent = "Hourly";

      forecastForm.appendChild(dailyOption);
      forecastForm.appendChild(dailyLabel);
      forecastForm.appendChild(hourlyOption);
      forecastForm.appendChild(hourlyLabel);

      const forecastContainer = document.createElement("section");
      forecastContainer.id = "forecast-container";
      renderDailyForecast(forecastContainer);

      forecast.appendChild(forecastForm);
      forecast.appendChild(forecastContainer);
      document.body.appendChild(forecast);
    }

    createHeader();
    createMain();
    createForecastSection();
  }

  function clearSuggestions() {
    const suggestionsList = document.getElementById("suggestions-list");
    suggestionsList.innerHTML = "";
    return suggestionsList;
  }

  function renderSuggestions(suggestions) {
    const suggestionsList = clearSuggestions();
    suggestions.forEach((suggestion) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.textContent = suggestion.name;
      suggestionsList.appendChild(suggestionItem);
    });
  }

  function clearError() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";
    return errorMessage;
  }

  function renderError(errorMessage) {
    const errorMessageElement = clearError();
    errorMessageElement.textContent = errorMessage;
  }

  function renderCurrentWeather(currentWeather, location) {
    // Update DOM with current weather data
    const info = document.getElementById("weather-info");

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

    const feelsLikeValue = document.getElementById("feels-like-value");
    feelsLikeValue.textContent = `${currentWeather.feelsLikeC} °C`;
    const humidity = document.getElementById("humidity-value");
    humidity.textContent = `${currentWeather.humidity}%`;
    const windSpeed = document.getElementById("wind-speed-value");
    windSpeed.textContent = `${currentWeather.windSpeedMph} mph`;
    const windDirection = document.getElementById("wind-direction-value");
    windDirection.textContent = currentWeather.windDirection;
    const uvIndex = document.getElementById("uv-index-value");
    uvIndex.textContent = currentWeather.uvIndex;
  }

  function renderHourlyForecast(forecastContainer) {
    function createCarouselNav() {
      if (document.getElementById("carousel-navigation")) {
        document
          .getElementById("forecast-form")
          .removeChild(document.getElementById("carousel-navigation"));
      }
      const carouselNavigation = document.createElement("nav");
      carouselNavigation.id = "carousel-navigation";

      const carouselPrev = document.createElement("button");
      carouselPrev.id = "left";
      carouselPrev.classList.add("navigation-button");
      carouselPrev.type = "button";
      const prevIcon = document.createElement("box-icon");
      prevIcon.setAttribute("name", "chevron-left");
      prevIcon.setAttribute("color", "black");
      carouselPrev.appendChild(prevIcon);
      carouselNavigation.appendChild(carouselPrev);

      const dotsContainer = document.createElement("ul");
      dotsContainer.id = "dots-container";
      for (let i = 0; i < 3; i += 1) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.dataset.index = i;
        if (i === 0) {
          dot.classList.add("active");
        }
        dotsContainer.appendChild(dot);
      }
      carouselNavigation.appendChild(dotsContainer);

      const carouselNext = document.createElement("button");
      carouselNext.id = "right";
      carouselNext.classList.add("navigation-button");
      carouselNext.type = "button";
      const nextIcon = document.createElement("box-icon");
      nextIcon.setAttribute("name", "chevron-right");
      nextIcon.setAttribute("color", "black");
      carouselNext.appendChild(nextIcon);
      carouselNavigation.appendChild(carouselNext);

      return carouselNavigation;
    }

    function createCarousel() {
      const carousel = document.createElement("ul");
      carousel.id = "carousel";

      for (let i = 0; i < 24; i += 1) {
        const carouselItem = document.createElement("li");
        carouselItem.classList.add("forecast-item", "hourly");

        const hour = document.createElement("div");
        hour.classList.add("hour");
        hour.textContent = i;
        carouselItem.appendChild(hour);

        const temp = document.createElement("div");
        temp.classList.add("temp");
        temp.textContent = i;
        carouselItem.appendChild(temp);

        const icon = document.createElement("img");
        icon.classList.add("icon");
        carouselItem.appendChild(icon);

        carousel.appendChild(carouselItem);
      }
      return carousel;
    }

    document.getElementById("forecast-form").appendChild(createCarouselNav());

    forecastContainer.appendChild(createCarousel());
  }

  function updateHourlyForecast(hourlyForecastData) {
    // Update DOM with forecast data
    const items = document.querySelectorAll(".forecast-item");
    items.forEach((item, index) => {
      const hour = item.querySelector(".hour");
      hour.textContent = formatLocalTime(
        hourlyForecastData[index].time
      ).localTimeFormatted;
      const temp = item.querySelector(".temp");
      temp.textContent = `${hourlyForecastData[index].temp_c} °C`;
      const icon = item.querySelector(".icon");
      icon.src = hourlyForecastData[index].condition.icon;
    });
  }

  return {
    initializePage,
    clearSuggestions,
    renderSuggestions,
    clearError,
    renderError,
    renderCurrentWeather,
    renderDailyForecast,
    updateDailyForecast,
    renderHourlyForecast,
    updateHourlyForecast,
  };
})();

export default render;
