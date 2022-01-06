///Display current date and time of user
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let date = currentDate.getDate();
let month = months[currentDate.getMonth()];
let year = currentDate.getFullYear();
let minute = currentDate.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let day = days[currentDate.getDay()];
let present = document.querySelector("#current-day");
present.innerHTML = `${day} ${hour}:${minute}`;
let todaysDate = document.querySelector("#current-date");
todaysDate.innerHTML = ` ${month} ${date}, ${year}`;

///create conversion to celcius or farenheit functions
function converFarenheit(event) {
  event.preventDefault();
  let FtemperatureElement = document.querySelector("#temperature");
  let Ftemperature = FtemperatureElement.innerHTML;
  Ftemperature = Number(Ftemperature);
  FtemperatureElement.innerHTML = Math.round((Ftemperature * 9) / 5 + 32);
}
function converCelcius(event) {
  event.preventDefault();
  let CtemperatureElement = document.querySelector("#temperature");
  let Ctemperature = CtemperatureElement.innerHTML;
  Ctemperature = Number(Ctemperature);
  CtemperatureElement.innerHTML = Math.round(((Ctemperature - 32) * 5) / 9);
}
let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", converFarenheit);
let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", converCelcius);

///Display name and current weather of searched city
let currentCity = document.querySelector("#search-input");
let apiKey = "2f77a721f146c97e77d99956a2de9fe0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=metric`;

function showWeather(response) {
  console.log(response.data);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let currentCountry = document.querySelector("#current-country");
  currentCountry.innerHTML = response.data.sys.country;
  document.querySelector("#temperature-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temperature-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function showCity(event) {
  event.preventDefault();
  let apiKey = "2f77a721f146c97e77d99956a2de9fe0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let myCity = document.querySelector("#city-search");
myCity.addEventListener("submit", showCity);

///Dispay current city and temperature using geolocation API

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "2f77a721f146c97e77d99956a2de9fe0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(currentWeather);
}
function currentWeather(response) {
  console.log(response.data);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let currentCountry = document.querySelector("#current-country");
  currentCountry.innerHTML = response.data.sys.country;
  document.querySelector("#temperature-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temperature-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let button = document.querySelector("#location-current");
button.addEventListener("click", getLocation);

function onLoadLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
window.onload = onLoadLocation();
