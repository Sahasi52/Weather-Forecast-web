/*weather-forecast*/
// const weather_Forecast_container = document.querySelector(
//   ".weather-forecast-container"
// );
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const apiKey = "91f55213ef45f9d8c5518003b786969d";
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city name!");
  }
});
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  document.getElementById("cityDisplay").textContent = city;
  document.getElementById("temperatureDisplay").textContent = `${(
    temp - 273.15
  ).toFixed(1)}°C`;
  document.getElementById(
    "humidityDisplay"
  ).textContent = `Humidity: ${humidity}`;
  document.getElementById("descriptionDisplay").textContent = description;
  document.getElementById("weatherEmoji").textContent = getWeatherEmoji(id);
  // const cityDisplay = document.createElement("h1");
  // const temperatureDisplay = document.createElement("p");
  // const humidityDisplay = document.createElement("p");
  // const descriptionDisplay = document.createElement("p");
  // const weatherEmoji = document.createElement("p");
  // cityDisplay.textContent = city;
  // temperatureDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  // humidityDisplay.textContent = `Humidity: ${humidity}`;
  // descriptionDisplay.textContent = description;
  // weatherEmoji.textContent = getWeatherEmoji(id);
  // cityDisplay.classList.add("cityDisplay");
  // temperatureDisplay.classList.add("temperatureDisplay");
  // humidityDisplay.classList.add("humidityDisplay");
  // descriptionDisplay.classList.add("descriptionDisplay");
  // weatherEmoji.classList.add("weatherEmoji");
  // weather_Forecast_container.appendChild(cityDisplay);
  // weather_Forecast_container.appendChild(temperatureDisplay);
  // weather_Forecast_container.appendChild(humidityDisplay);
  // weather_Forecast_container.appendChild(descriptionDisplay);
  // weather_Forecast_container.appendChild(weatherEmoji);
}
function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌩️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "⛈️";
    case weatherId >= 600 && weatherId < 700:
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "🌤️";
  }
}
function displayError(message) {
  setTimeout(() => {
    alert(message);
  }, 2000);
  // const errorDisplay = document.createElement("p");
  // errorDisplay.textContent = message;
  // errorDisplay.classList.add("errorDisplay");
  // weather_Forecast_container.appendChild(errorDisplay);
}
