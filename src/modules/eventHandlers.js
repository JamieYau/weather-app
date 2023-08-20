/* eslint-disable no-param-reassign */
import render from "./render";

const eventHandlers = (() => {

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
  };
})();

export default eventHandlers;
