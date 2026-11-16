

const weatherResult = document.getElementById("weatherResult");
const weatherRefresh = document.getElementById("weatherRefresh");

async function loadWeather() {
    weatherResult.textContent = "Loading weather...";

    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=51.1694&longitude=71.4491&current=temperature_2m,relative_humidity_2m,wind_speed_10m");

        if (!response.ok) {
            weatherResult.textContent = "Could not load weather.";
            return;
        }

        const data = await response.json();

        if (!data.current || data.current.temperature_2m === undefined || data.current.relative_humidity_2m === undefined || data.current.wind_speed_10m === undefined) {
            weatherResult.textContent = "Weather data is unavailable.";
            return;
        }

        weatherResult.innerHTML = "";

        const temperature = document.createElement("p");
        temperature.className = "weather-temperature";
        temperature.textContent = data.current.temperature_2m + " °C";

        const details = document.createElement("div");
        details.className = "weather-details";

        const humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + data.current.relative_humidity_2m + "%";

        const wind = document.createElement("p");
        wind.textContent = "Wind: " + data.current.wind_speed_10m + " km/h";

        details.appendChild(humidity);
        details.appendChild(wind);

        weatherResult.appendChild(temperature);
        weatherResult.appendChild(details);

    } catch (error) {
        weatherResult.textContent = "Unable to connect. Please try again.";
    }
}

weatherRefresh.addEventListener("click", loadWeather);
loadWeather();
