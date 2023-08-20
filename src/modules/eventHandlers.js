import render from "./render";

const eventHandlers = (() => {
  function carouselListeners() {
    const carousel = document.getElementById("carousel");
    const arrowBtns = document.querySelectorAll(".navigation-button");
    const gapValue = parseInt(
      window.getComputedStyle(carousel).getPropertyValue("gap"),
      10
    );
    const dots = document.querySelectorAll(".dot");

    let currentPage = 0; // Initial page is 0

    // Update the active dot based on the current page
    function updateActiveDot() {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentPage);
      });
    }

    arrowBtns.forEach((arrowBtn) => {
      arrowBtn.addEventListener("click", () => {
        const itemWidth =
          carousel.querySelector(".forecast-item").offsetWidth + gapValue;
        const scrollAmount =
          arrowBtn.id === "left" ? -itemWidth * 8 : itemWidth * 8;
        carousel.scrollLeft += scrollAmount;

        // Update the current page based on the scroll direction
        if (arrowBtn.id === "left") {
          currentPage = Math.max(currentPage - 1, 0);
        } else {
          currentPage = Math.min(currentPage + 1, dots.length - 1);
        }

        updateActiveDot(); // Update the active dot
      });
    });

    // Add a scroll listener to update the active dot when the carousel is scrolled
    carousel.addEventListener("scroll", () => {
      const currentPageOnScroll = Math.floor(
        carousel.scrollLeft / carousel.offsetWidth
      );
      if (currentPage !== currentPageOnScroll) {
        currentPage = currentPageOnScroll;
        updateActiveDot();
      }
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
