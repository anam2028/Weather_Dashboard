// Example queryURL for Giphy API
//   var queryURL = "api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+APIKey;
// first Ajax call to get the weather data
function link() {
  var link_s = document.getElementById('link_id').value;
  document.getElementById('link_str').innerHTML = link_s.link()
}

var state = "us";
var cityName = "new york";
var API_Key = "396525f46320f8dae3e9e436c82e1c67";
var lat;
var lon;

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
  El.html(response.main.temp);

  currentWeatherEl.append(El);
  console.log(response);
  var date = new Date().toLocaleDateString();
  console.log("date:", date);
  El.append("<h1>" + date + "</h1>");
  var temperature = response.main.temp;
  console.log("temp:", temperature);
  El.append("<h1>" + temperature + "</h1>");
  var humidity = response.main.humidity;
  console.log("humadity:", humidity);
  El.append("<h1>" + humidity + "</h1>");
  var windSpeed = response.wind.speed;
  console.log("windSpeed: ", windSpeed);
  El.append("<h1>" + windSpeed + "</h1>");
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
    El.append("<h1>" + response.value + "</h1>");
  });
});

// 3rd Ajax call to get five day forecast
//  api.openweathermap.org/data/2.5/forecast?q={city name},{state}&appid={your api key}

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
    }
  }
});
