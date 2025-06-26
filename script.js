document.addEventListener("DOMContentLoaded", function () {
  const countryInput = document.getElementById("country");
  const cityInput = document.getElementById("city");

  // Target the <form> and prevent page reload on submit
  const form = document.querySelector("form");

  // Weather data output spans
  const locationSpan = document.querySelector("#location span");
  const temperatureSpan = document.querySelector("#temperature span");
  const conditionSpan = document.querySelector("#condition span");
  const humiditySpan = document.querySelector("#humidity span");
  const windSpeedSpan = document.querySelector("#wind-speed span");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // 🔒 Prevent form from reloading the page

    const city = cityInput.value.trim();
    const country = countryInput.value.trim();

    if (!city || !country) {
      locationSpan.textContent = "Please enter both city and country.";
      temperatureSpan.textContent = "--";
      conditionSpan.textContent = "--";
      humiditySpan.textContent = "--";
      windSpeedSpan.textContent = "--";
      return;
    }

    const apiKey = "6868a7f3ec96b01d7c2766bc0c768db7"; // Replace with your own key if needed
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

    // Optionally show loading text
    locationSpan.textContent = "Loading...";
    temperatureSpan.textContent = "--";
    conditionSpan.textContent = "--";
    humiditySpan.textContent = "--";
    windSpeedSpan.textContent = "--";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          locationSpan.textContent = `${data.name}, ${data.sys.country}`;
          temperatureSpan.textContent = `${data.main.temp} °C`;
          conditionSpan.textContent = `${data.weather[0].description}`;
          humiditySpan.textContent = `${data.main.humidity} %`;
          windSpeedSpan.textContent = `${data.wind.speed} km/h`;
        } else {
          locationSpan.textContent = "City not found.";
        }
      })
      .catch((err) => {
        console.error(err);
        locationSpan.textContent = "Error fetching data.";
      });
  });
});
