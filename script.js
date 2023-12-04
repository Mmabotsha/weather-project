function reloadWeather(response) {
    
    let timeElement =document.querySelector("#time");
    let cityElement =document.querySelector("#weather-city");
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let descriptionElement =document.querySelector("#description");
    let humidityElement =document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let date =new Date(response.data.time* 1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML =response.data.condition.description;
    humidityElement.innerHTML =`${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML =`${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    getForecast(response.data.city);
}

function formatDate(date) {
    let days = [ 
        "Sunday",
         "Monday", 
         "Tuesday", 
         "Wednesday", 
         "Thursday", 
         "Friday",
          "Saturday"
        ];

    let day = days[date.getDay];

    let hours = date.getMinutes();

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
let apiKey ="f4636bad38ata3f0d08f08de433380o5";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(reloadWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[date.getDay()];
}
function getForecast(city) {
    let apiKey = "f4636bad38ata3f0d08f08de433380o5";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
  }
  
  function displayForecast(response) {
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml =
          forecastHtml +
          `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
  
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>
      `;
      }
    });

    let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSearchSubmit);

searchCity("Paris");