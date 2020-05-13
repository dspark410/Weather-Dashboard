var APIKey = "19b63f6a9e10dc5a731779766a775baa";

$(".btn").on("click", function(){
   
    var city = $("#city").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET",
      })
        .then(function(response) {
            console.log(response)
            console.log(queryURL)
            
            $("#show-city").html(response.name + response.weather[0].icon)
            $("#temperature").html(response.main.temp)
            $("#humidity").html(response.main.humidity)
            $("#windspeed").html(response.wind.speed)
            //$("#uv-index").html(response.)
            
            <img src="http://openweathermap.org/img/wn/10d@2x.png"> 
    
    
        });
});
