// Example queryURL for Giphy API
//   var queryURL = "api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+APIKey;
// first Ajax call to get the weather data


var state = "us";
var cityName = "new york";
var API_Key = "396525f46320f8dae3e9e436c82e1c67";
var lat;
var lon;
//Search Button
function link() {
  var link_s = document.getElementById('link_id').value;
  document.getElementById('link_str').innerHTML = link_s.link()
  console.log('Link_s',link_s);
  todays_weather(link_s);
  fiveDay_forecast(link_s);
}
// var searchInputBtn = $("<button>")
//         searchInputBtn.text(searchInput)
//         $(".previousSearch").append(searchInputBtn)
//         searchInputBtn.attr("class", "test");

// 2nd ajax call for UV Index

function getUV(lon, lat) {
  var queryURL2 =
    "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
    API_Key +
    "&lat=" +
    lat +
    "&lon=" +
    lon;

  $.ajax({
    url: queryURL2,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    for (let i = 0; i < response.length; i++) {
      var uvIndex = response[i].value;
      console.log(uvIndex);
    }
  });
}
function todays_weather(cityName){
var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "," +
  state +
  "&appid=" +
  API_Key +
  "&units=imperial";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  var currentWeatherEl = $("#currentWeather");
  var El = $("<div>");
  
  // El.html(response.main.temp);
  // clear function for current weather
  currentWeatherEl.empty();
  currentWeatherEl.append(El);
  console.log(response);

  var date = new Date().toLocaleDateString();
  console.log("date:", date);
  El.append("<h3>" + cityName + ":" + date + "</h3>");
  // date.textContent = "Date:";
  var temperature = response.main.temp;
  console.log("temp:", temperature);
  El.append("<h6>Temperature: " + temperature + "</h6>");
  var humidity = response.main.humidity;
  console.log("humadity:", humidity);
  El.append("<h6>Humadity: " + humidity + "</h6>");
  var windSpeed = response.wind.speed;
  console.log("windSpeed: ", windSpeed);
  El.append("<h6> WindSpeed: " + windSpeed + "</h6>");
  //  var uvIndex = response.
  lon = response.coord.lon;
  console.log("lon: ", lon);
  lat = response.coord.lat;
  console.log("lat: ", lat);
  // getUV(lon, lat);
  var queryURLuv =
    "http://api.openweathermap.org/data/2.5/uvi?appid=" +
    API_Key +
    "&lat=" +
    lat +
    "&lon=" +
    lon;
  $.ajax({
    url: queryURLuv,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    El.append("<h6>UV Index: " + response.value + "</h6>");
  });
});
}
// 3rd Ajax call to get five day forecast
//  api.openweathermap.org/data/2.5/forecast?q={city name},{state}&appid={your api key}

function fiveDay_forecast(cityName){
var queryURL3 =
  "http://api.openweathermap.org/data/2.5/forecast?q=" +
  cityName +
  "&appid=" +
  API_Key;

//dt_txt: "2020-02-18 06:00:00"

$.ajax({
  url: queryURL3,
  method: "GET"
}).then(function(response) {
  console.log(response);
  for (let i = 0; i < response.list.length; i++) {
    if (response.list[i].dt_txt.includes("06:00:00")) {
      console.log(response.list[i].main.temp);
      $('#forecast').append(`
      <div class='col-md-2 border grey'>
      <h9> Temp: ${response.list[i].main.temp} </h9>
      <h9> Hum: ${response.list[i].main.humidity} </h9>
      </div>`)
      // forecast.empty();
    }
  }
});
}