$(document).ready(function () {

//var APIKey = "28c82c982b5d989f68dfe35b65a9e386"
//var APIKey = "19b63f6a9e10dc5a731779766a775baa"
var APIKey = "166a433c57516f51dfab1f7edaed8413"

$(".btn").on("click", function(){

  var city = $("#city").val().trim();
  
  if (!city) {
    return
  }

  $(".hide").removeClass("hide")
  getWeather(city)
  
  var li = $("<li>")
  li.addClass("list-group-item")
  li.addClass("saved-city")
  li.attr("data-city", city)
  var input = li.html(city)
  $(".list-group").append(input)

});

$(".list-group").on("click", ".saved-city", function(){
  getWeather($(this).attr("data-city"))

  getStoredWeather(city)
})

function getStoredWeather(city) {
  JSON.parse(localStorage.getItem(city))
  
}

function getWeather(city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .then(function(response) {

        console.log(queryURL)

        $("#show-city").html(response.name)     
        var date = $("<span>")
        var showDate = date.html(" &#40;" + moment().format("L") + "&#41;")
        $("#show-city").append(showDate)
        var iconCode = response.weather[0].icon 
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png"
        var img = $("<img>")
        var showImg = img.attr("src", iconURL)
        $("#show-city").append(showImg)
  
        $("#temperature").html("Temperature: " + response.main.temp.toFixed(1) + " &degF")
        $("#humidity").html("Humidity: " + response.main.humidity +"%")
        $("#windspeed").html("Windspeed: " + response.wind.speed + " MPH")

        var values = {
          "date": moment().format("L"),
          "icon": response.weather[0].icon, 
          "temp": response.main.temp,
          "humidity": response.main.humidity,
          "windspeed": response.wind.speed,
        }
        
        var longitude = response.coord.lon
        var latitude = response.coord.lat

        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude  + "&lon=" + longitude + "&appid=" + APIKey;

        $.ajax({
          url: queryURL2,
          method: "GET",
        })
          .then(function(response) {
            console.log(queryURL2)

            $("#uv-index").html(response.value)

            var uvIndex = response.value
            if (uvIndex < 3) {
              $("#uv-index").addClass("green")
            }
            if (uvIndex < 6) {
              $("#uv-index").addClass("yellow")
            }
            if (uvIndex < 8) {
              $("#uv-index").addClass("orange")
            }
            if (uvIndex < 11) {
              $("#uv-index").addClass("red")
            }
            values.uv_index = uvIndex
            
            
        })   
        var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

        $.ajax({
          url: queryURL3,
          method: "GET",
        })
          .then(function(response) {
              
              console.log(queryURL3)
    
              var counter = 1
    
              for (var i = 8; i < response.list.length; i+=7) {
              var showFutureDate = moment(response.list[i].dt *1000).format("L")
              $("#forecast-date" + counter).html(showFutureDate)
        
              var iconCode = response.list[i].weather[0].icon
              var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png"
              var img = $("<img>")
              var showImg = img.attr("src", iconURL)
              $("#forecast-date" + counter).append(showImg)
    
              $("#forecast-temp" + counter).html("Temp: " + response.list[i].main.temp.toFixed(2) + " &degF")
              $("#forecast-humidity" + counter).html("Humidity: " + response.list[i].main.humidity +"%") 
                
              counter += 1
              
              values.forecastdate = moment(response.list[i].dt *1000).format("L")
              values.forecasticon = response.list[i].weather[0].icon
              values.forecasttemp = response.list[i].main.temp
              values.forecasthumidity = response.list[i].main.humidity

              localStorage.setItem(city, JSON.stringify(values))
              
              }
          });           
    }); 
    
   
}
})