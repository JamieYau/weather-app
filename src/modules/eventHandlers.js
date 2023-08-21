/* eslint-disable no-param-reassign */
import render from "./render";
import weatherAPI from "./weatherAPI";

const eventHandlers = (() => {
  const searchListener = () => {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("location");

    // Helper function to perform the search
    async function performSearch(query) {
      try {
        render.clearError();
        const data = await weatherAPI.fetchData(query);
        const currentWeather = weatherAPI.getCurrentData(data);
        const forecastDaily = weatherAPI.getForecastData(data);
        const location = weatherAPI.getLocationData(data);
        const forecastHoulry = weatherAPI.getNext24HoursForecast(data);

        render.renderCurrentWeather(currentWeather, location);
        render.updateDailyForecast(forecastDaily);
        eventHandlers.forecastListeners(forecastDaily, forecastHoulry);
      } catch (error) {
        render.updateError(error.message);
        setTimeout(render.clearError, 2000);
      }
      searchInput.value = "";
    }

    const suggestionsListener = () => {
      const suggestions = document.querySelectorAll(".suggestion-item");
      suggestions.forEach((suggestion) => {
        suggestion.addEventListener("click", () => {
          const query = suggestion.textContent;
          performSearch(query);
        });
      });
    };

    searchInput.addEventListener("focus", async () => {
      const query = searchInput.value;
      if (query) {
        const suggestions = await weatherAPI.fetchSuggestions(query);
        render.updateSuggestions(suggestions);
        suggestionsListener();
      }
    });

    searchInput.addEventListener("input", async () => {
      const query = searchInput.value;
      if (query) {
        const suggestions = await weatherAPI.fetchSuggestions(query);
        render.updateSuggestions(suggestions);
        suggestionsListener();
      } else {
        render.clearSuggestions();
      }
    });

    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        render.clearSuggestions();
      }, 200); // Delay to allow click on suggestion item before clearing
    });

    // Handle form submission
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      performSearch(searchInput.value);
      render.clearSuggestions();
    });
  };

  const carouselListeners = () => {
    const carousel = document.getElementById("carousel");
    const arrowBtns = document.querySelectorAll(".navigation-button");
    const dots = document.querySelectorAll(".dot");
    let currentPage = 0;
    const gapValue = parseInt(
      window.getComputedStyle(carousel).getPropertyValue("gap"),
      10
    );

    const updateActiveDot = () => {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentPage);
      });
    };

    const handleArrowButtonClick = (arrowBtn) => {
      const itemWidth =
        carousel.querySelector(".forecast-item").offsetWidth + gapValue;
      const scrollAmount =
        arrowBtn.id === "left" ? -itemWidth * 8 : itemWidth * 8;
      carousel.scrollLeft += scrollAmount;
      currentPage = Math.max(
        Math.min(
          currentPage + (arrowBtn.id === "left" ? -1 : 1),
          dots.length - 1
        ),
        0
      );
      setTimeout(updateActiveDot, 100);
    };

    arrowBtns.forEach((arrowBtn) => {
      arrowBtn.addEventListener("click", () =>
        handleArrowButtonClick(arrowBtn)
      );
    });

    carousel.addEventListener("scroll", () => {
      const currentPageOnScroll = Math.floor(
        carousel.scrollLeft / carousel.offsetWidth
      );
      if (currentPage !== currentPageOnScroll) {
        currentPage = currentPageOnScroll;
        updateActiveDot();
      }
    });

    let isDragging = false;
    let startCursorX;
    let initialScrollLeft;

    const startDrag = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startCursorX = e.pageX;
      initialScrollLeft = carousel.scrollLeft;
    };

    const drag = (e) => {
      if (!isDragging) return;
      const cursorMovementX = startCursorX - e.pageX;
      const newScrollLeft = initialScrollLeft + cursorMovementX;
      carousel.scrollLeft = newScrollLeft;
    };

    const endDrag = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    carousel.addEventListener("mousedown", startDrag);
    carousel.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);
  };

  const unitListeners = (
    currentWeather,
    location,
    forecastDaily,
    forecastHourly
  ) => {
    const unitForm = document.getElementById("unit-form");

    unitForm.addEventListener("change", (event) => {
      document.body.className = event.target.id;
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = "";

      // check if selected forecast is daily or hourly
      // if daily, update daily forecast
      // else update hourly forecast
      // pass in selectedUnit to render functions
      render.renderCurrentWeather(currentWeather, location);

      if (document.getElementById("daily").checked) {
        render.renderDailyForecast(forecastContainer);
        render.updateDailyForecast(forecastDaily);
      } else {
        render.renderHourlyForecast(forecastContainer);
        render.updateHourlyForecast(forecastHourly);
        carouselListeners();
      }
    });
  };

  const forecastListeners = (forecastDaily, forecastHourly) => {
    const forecastForm = document.getElementById("forecast-form");

    forecastForm.addEventListener("change", (event) => {
      const selectedOption = event.target.id;
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = "";

      if (selectedOption === "daily") {
        render.renderDailyForecast(forecastContainer);
        render.updateDailyForecast(forecastDaily);
      } else if (selectedOption === "hourly") {
        render.renderHourlyForecast(forecastContainer);
        render.updateHourlyForecast(forecastHourly);
        carouselListeners();
      }
    });
  };

  return {
    forecastListeners,
    searchListener,
    unitListeners,
  };
})();

export default eventHandlers;
