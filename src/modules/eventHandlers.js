/* eslint-disable no-param-reassign */
import render from "./render";
import weatherAPI from "./weatherAPI";

const eventHandlers = (() => {
  const searchListener = () => {
    const searchInput = document.getElementById("location");
    const searchIcon = document.getElementById("search-icon");

    // Helper function to perform the search
    async function performSearch(query) {
      const data = await weatherAPI.fetchData(query);
      const currentWeather = weatherAPI.getCurrentData(data);
      const forecastDaily = weatherAPI.getForecastData(data);
      const location = weatherAPI.getLocationData(data);
      const forecastHoulry = weatherAPI.getNext24HoursForecast(data);

      render.renderCurrentWeather(currentWeather, location);
      render.updateDailyForecast(forecastDaily);

      eventHandlers.forecastListeners(forecastDaily, forecastHoulry);
    }

    // Handle search when the search icon is clicked
    searchIcon.addEventListener("click", () => {
      performSearch(searchInput.value);
    });

    // Handle search when the enter key is pressed in the search input
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        performSearch(searchInput.value);
        event.preventDefault();
      }
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

    arrowBtns.forEach((arrowBtn) => {
      arrowBtn.addEventListener("click", () => {
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
        setTimeout(() => {
          updateActiveDot();
        }, 100);
      });
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
      // Record the initial cursor position and scroll position of the carousel
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
  };
})();

export default eventHandlers;
