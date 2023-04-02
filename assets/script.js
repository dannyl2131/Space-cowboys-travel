var favorites = $("#favorites")
var forecast = $("#forecast")
var events = $("#events")
var search = $("#searchButton")
var query = $("#query")

search.click(function(){
    weatherSearch(query.val());
})


var weatherSearch = function(param){
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + param + "&units=imperial&appid=7cfd96e09578686d48a4d422e2ebfb44")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var weatherData = $(data)
        var firstSix = weatherData[0]
    })
}