document.addEventListener("DOMContentLoaded", function () {
    const countryInput = document.getElementById("country");
    const cityInput = document.getElementById("city");
    const weatherResults = document.getElementById("weather-results");

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function () {
            const country = countryInput.value.trim();
            const city = cityInput.value.trim();

            if (country && city) {
                fetchWeather(city, country);
            } else {
                weatherResults.innerHTML = "<p>Please enter both country and city.</p>";
            }
        });
    });

    function fetchWeather(city, country) {
        const apiKey = "6868a7f3ec96b01d7c2766bc0c768db7"; // Replace with your API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    weatherResults.innerHTML = `
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                    `;
                } else {
                    weatherResults.innerHTML = `<p>City not found. Try again.</p>`;
                }
            })
            .catch(error => {
                weatherResults.innerHTML = `<p>Error fetching data.</p>`;
            });
    }
});
