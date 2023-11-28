function reloadWeather(response) {
    let date =new Date(response.data.time * 1000);
    let timeElement =document.querySelector("#time");
    let cityElement =document.querySelector("#weather-city");
    let iconElement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let descriptionElement =document.querySelector("#description");
    let humidityElement =document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");

    timeElement.innerHTML = formatDate(date);
    cityElement.innerHTML = response.data.city;
    iconElement.innerHTML = `<img scr="${response.data.condition.icon_url}" class="weather-icon" />`;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML =response.data.condition.description;
    humidityElement.innerHTML =`${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML =`${response.data.wind.speed}km/h`;

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
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(reloadWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSearchSubmit);

searchCity("Paris");