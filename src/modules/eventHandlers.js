import render from "./render";

const eventHandlers = (() => {
  function carouselListeners() {
    const carousel = document.getElementById("carousel");
    const arrowBtns = document.querySelectorAll(".navigation-button");
    const gapValue = parseInt(
      window.getComputedStyle(carousel).getPropertyValue("gap"),
      10
    );

    arrowBtns.forEach((arrowBtn) => {
      arrowBtn.addEventListener("click", () => {
        const itemWidth =
          carousel.querySelector(".forecast-item").offsetWidth + gapValue;
        const scrollAmount =
          arrowBtn.id === "left" ? -itemWidth * 8 : itemWidth * 8;
        carousel.scrollLeft += scrollAmount;
      });
    });
  }

  function forecastListeners(forecastData) {
    const forecastForm = document.getElementById("forecast-form");

    forecastForm.addEventListener("change", (event) => {
      const selectedOption = event.target.id;
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = "";
      if (selectedOption === "daily") {
        render.renderDailyForecast(forecastContainer);
        render.updateDailyForecast(forecastData);
      } else if (selectedOption === "hourly") {
        render.renderHourlyForecast(forecastContainer);
        carouselListeners();
      }
    });
  }

  return {
    forecastListeners,
  };
})();

export default eventHandlers;
