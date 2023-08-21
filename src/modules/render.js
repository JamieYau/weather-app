import { formatLocalTime, createElement } from "./utility";

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
    // Create the search input and button
    function createSearchForm() {
      const searchInput = createElement("input", {
        type: "search",
        name: "location",
        id: "location",
        placeholder: "Search Location...",
        autocomplete: "off",
        minLength: 2,
      });

      const searchIcon = createElement("box-icon", {
        name: "search",
        id: "search-icon",
        color: "white",
      });

      const searchButton = createElement("button", { type: "submit" }, [
        searchIcon,
      ]);
      const errorMessage = createElement("div", { id: "error-message" });
      const suggestionsList = createElement("ul", { id: "suggestions-list" });
      const searchForm = createElement("form", { id: "search-form" }, [
        searchInput,
        searchButton,
        errorMessage,
        suggestionsList,
      ]);

      return searchForm;
    }

    function createRadioForm(id, name, values, checkedValue) {
      const form = createElement("form", {
        id,
        class: "radio-form",
      });
      values.forEach((value) => {
        const input = createElement("input", {
          type: "radio",
          name,
          id: value,
          checked: value === checkedValue,
        });
        const inputLabel = createElement("label", {
          for: value,
          textContent: value.charAt(0).toUpperCase() + value.slice(1),
        });
        form.appendChild(input);
        form.appendChild(inputLabel);
      });
      return form;
    }

    function createWeatherInfo() {
      const infoItems = [
        {
          id: "city",
          class: "city",
        },
        {
          id: "country",
          class: "country",
        },
        {
          id: "local-date",
          class: "local-date",
        },
        {
          id: "local-time",
          class: "local-time",
        },
        {
          id: "condition-icon",
          class: "condition-icon",
        },
        {
          id: "condition-text",
          class: "condition-text",
        },
        {
          id: "temperature",
          class: "temperature",
        },
      ];

      const elements = infoItems.map(({ id, class: className }) =>
        createElement("div", { id, class: className })
      );

      return createElement("section", { id: "weather-info" }, elements);
    }

    // Create the weather extra info elements
    function createWeatherExtraInfo() {
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

      const elements = extraInfoItems.map(
        ({ id, iconType, iconName, iconColor, labelText }) => {
          const icon = createElement("box-icon", {
            ...(iconType ? { type: iconType } : {}),
            name: iconName,
            color: iconColor,
          });
          const info = createElement("div", { class: "extra-item-info" }, [
            createElement("div", { id: `${id}-text`, textContent: labelText }),
            createElement("div", { id: `${id}-value` }),
          ]);
          return createElement("div", { id, class: "extra-item" }, [
            icon,
            info,
          ]);
        }
      );

      return createElement("section", { id: "weather-extra-info" }, elements);
    }

    // Create the entire header section
    function createHeader() {
      const header = createElement("header", {}, [
        createSearchForm(),
        createRadioForm(
          "unit-form",
          "unit",
          ["celsius", "fahrenheit"],
          "celsius"
        ),
      ]);
      document.body.appendChild(header);
    }

    // Create the main content
    function createMain() {
      const main = createElement("main", { id: "container" }, [
        createWeatherInfo(),
        createWeatherExtraInfo(),
      ]);

      document.body.appendChild(main);
    }

    // Create the forecast section
    function createForecastSection() {
      const forecastForm = createRadioForm(
        "forecast-form",
        "forecast",
        ["daily", "hourly"],
        "daily"
      );
      const forecastContainer = createElement("section", {
        id: "forecast-container",
      });
      const forecast = createElement("section", { class: "forecast" }, [
        forecastForm,
        forecastContainer,
      ]);

      document.body.appendChild(forecast);
      renderDailyForecast(forecastContainer);
    }

    // Call the functions to create the sections
    createHeader();
    createMain();
    createForecastSection();
  }

  function clearSuggestions() {
    const suggestionsList = document.getElementById("suggestions-list");
    suggestionsList.innerHTML = "";
    return suggestionsList;
  }

  function updateSuggestions(suggestions) {
    const suggestionsList = clearSuggestions();
    suggestions.forEach((suggestion) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.classList.add("suggestion-item");
      const mapIcon = document.createElement("i");
      mapIcon.classList.add("fas", "fa-location-dot");
      const suggestionName = document.createElement("span");
      suggestionName.classList.add("name");
      suggestionName.textContent = suggestion.name;
      const suggestionCountry = document.createElement("span");
      suggestionCountry.classList.add("country");
      suggestionCountry.textContent = `(${suggestion.country})`;
      suggestionItem.appendChild(mapIcon);
      suggestionItem.appendChild(suggestionName);
      suggestionItem.appendChild(suggestionCountry);
      suggestionsList.appendChild(suggestionItem);
    });
  }

  function clearError() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";
    return errorMessage;
  }

  function updateError(errorMessage) {
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
    const country = info.querySelector(".country");
    country.textContent = location.country;
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
      prevIcon.setAttribute("color", "white");
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
      nextIcon.setAttribute("color", "white");
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
    updateSuggestions,
    clearError,
    updateError,
    renderCurrentWeather,
    renderDailyForecast,
    updateDailyForecast,
    renderHourlyForecast,
    updateHourlyForecast,
  };
})();

export default render;
