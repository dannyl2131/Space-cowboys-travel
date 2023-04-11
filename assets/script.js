let reset = $("#reset")
let favorites = $("#favorites")
let forecast = $("#forecast")
let events = $("#events")
let search = $("#searchButton")
let query = $("#query")

//For adding as favorite

var recentcity = [];


let getLocalStorage = function(){
    var tempStorage = localStorage.getItem("favorites")
    if(tempStorage == undefined){
        localStorage.setItem("favorites", '["Boston"]')
    } 
    return JSON.parse(localStorage.getItem("favorites"))
}

reset.click(function(){
    clearStorage();
})

let clearStorage = function(){
    localStorage.clear()
    favorites.innerHTML = ""
}

$("#star").click(function(event) {
    event.preventDefault();
    var favcities = getLocalStorage("")
    favcities.push($('#query').val());
    localStorage.setItem('favorites', JSON.stringify(favcities));
    let localcitycard = document.createElement("div");
    let localcityname = document.createElement("a");

    localcitycard.classList.add("item");
    localcityname.classList.add("favlinks");

    localcitycard.appendChild(localcityname);

    $('#favorites').append(localcitycard);
    localcityname.append($('#query').val());
})








let eventSearch = function(param) {
    param = param.toLowerCase()
    for (var i = 0; i < allcities.length; i++) {
        var tempcityname = param
        if (tempcityname === allcities[i].name) {
            citynum = allcities[i].number;
            fetch("https://app.ticketmaster.com/discovery/v2/events.json?&dmaId=" + citynum + "&apikey=IsHdraDgQ6AybSMTXCgWdC4WQFWUkgBn")
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    var tempevent = [];
                    console.log(data)
                    var eventObject = []
                    for (var i = 0; i < 30; i++) {
                        if (i === 0) {
                            tempevent.push(data._embedded.events[i].name);
                            eventObject.push(data._embedded.events[i])
                            continue;
                        }  
                        for (var j = 0; j < data._embedded.events.length; j++) {
                            if (tempevent.includes(data._embedded.events[j].name)) {
                                data._embedded.events.splice(i, 1);
                            } else {
                                tempevent.push(data._embedded.events[j].name);
                                eventObject.push(data._embedded.events[j])
                            }
                        }
                    }
                        for(var k = 0; k < 6; k++){
                            let currentEvent = eventObject.splice(0,1)
                            let div1 = document.createElement("div")
                            let div2 = document.createElement("div")
                            let div3 = document.createElement("div")
                            let div4 = document.createElement("div")
                            let div5 = document.createElement("div")
                            let div6 = document.createElement("div")
                            let date = document.createElement("h2")
                            let name = document.createElement("h2")
                            let url = document.createElement("a")
                            events.append(div1)
                            div1.classList.add("column")
                            div2.classList.add("ui")
                            div2.classList.add("card")
                            div3.classList.add("content")
                            div4.classList.add("header")
                            div5.classList.add("description")  
                            url.classList.add("eventlinks")
                            div1.append(div2)
                            div2.append(div3)
                            div3.append(div4)
                            div3.append(div5)
                            div3.append(div6)
                            div6.append(name)
                            div6.append(date)
                            div6.append(url)
                            name.innerHTML = "Event name: " + currentEvent[0].name
                            date.innerHTML = "Start date: "  + currentEvent[0].dates.start.localDate
                            url.href = currentEvent[0].url
                            url.innerHTML = "Event URL"
                        }
                })
        } 
    }
}

let weatherSearch = function(param){
    forecast.empty()
    events.empty()
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + param + "&units=imperial&appid=7cfd96e09578686d48a4d422e2ebfb44")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let weatherData = $(data)
        let firstSix = []
        for(let i = 0; i < 40; i+=7){
            firstSix.push(weatherData[0].list[i])
        }
        firstSix.forEach(function(item){
            const unixTimestamp = item.dt
            const milliseconds = unixTimestamp * 1000
            const dateObject = new Date(milliseconds)
            let div1 = document.createElement("div")
            let div2 = document.createElement("div")
            let div3 = document.createElement("div")
            let div4 = document.createElement("div")
            let div5 = document.createElement("div")
            let div6 = document.createElement("div")
            let date = document.createElement("h2")
            let icon = document.createElement("i")
            let temperature = document.createElement("h2")
            let wind = document.createElement("h2")
            forecast.append(div1)
            div1.classList.add("column")
            div2.classList.add("ui")
            div2.classList.add("card")
            div3.classList.add("content")
            div4.classList.add("header")
            div5.classList.add("description")  
            div1.append(div2)
            div2.append(div3)
            div3.append(div4)
            div3.append(div5)
            div3.append(div6)
            div6.append(date)
            div6.append(icon)
            div6.append(temperature)
            div6.append(wind)
            date.innerHTML = dateObject.toLocaleDateString()
            temperature.innerHTML = "Temp: " + item.main.temp + "F"
            wind.innerHTML = "Wind speed: "  + item.wind.speed + "MPH"
            icon.innerHTML = "<img src=https://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png>"
        })
        
    })

}

$("#searchButton").click(function(){
    weatherSearch(query.val());
    eventSearch(query.val());
    $('#cityname').text(query.val());
})

// For Event Api

var cityfetch = "https://app.ticketmaster.com/discovery/v2/events.json?&dmaId=324&apikey=IsHdraDgQ6AybSMTXCgWdC4WQFWUkgBn"

const allcities = [
  { number: 212, name: 'abilene' },
  { number: 213, name: 'albany' },
  { number: 214, name: 'albany, GA' },
  { number: 215, name: 'albuquerque' },
  { number: 216, name: 'alexandria, la' },
  { number: 217, name: 'alpena' },
  { number: 218, name: 'amarillo' },
  { number: 219, name: 'anchorage' },
  { number: 220, name: 'atlanta' },
  { number: 221, name: 'augusta' },
  { number: 222, name: 'austin' },
  { number: 223, name: 'bakersfield' },
  { number: 224, name: 'baltimore' },
  { number: 225, name: 'bangor' },
  { number: 226, name: 'baton rouge' },
  { number: 227, name: 'beaumont' },
  { number: 228, name: 'bend' },
  { number: 229, name: 'billings' },
  { number: 230, name: 'biloxi' },
  { number: 231, name: 'binghamton' },
  { number: 232, name: 'birmingham' },
  { number: 233, name: 'bluefield' },
  { number: 234, name: 'boise' },
  { number: 235, name: 'boston' },
  { number: 236, name: 'bowling green' },
  { number: 237, name: 'buffalo' },
  { number: 238, name: 'burlington' },
  { number: 239, name: 'bozeman' },
  { number: 240, name: 'casper' },
  { number: 241, name: 'cedar rapids' },
  { number: 242, name: 'champaign' },
  { number: 243, name: 'charleston' },
  { number: 244, name: 'charleston-huntington' },
  { number: 245, name: 'charlotte' },
  { number: 246, name: 'charlottesville' },
  { number: 247, name: 'chattanooga' },
  { number: 248, name: 'cheyenne ' },
  { number: 249, name: 'chicago' },
  { number: 250, name: 'chico' },
  { number: 251, name: 'cincinnati' },
  { number: 252, name: 'clarksburg' },
  { number: 253, name: 'cleveland' },
  { number: 254, name: 'colorado springs' },
  { number: 255, name: 'columbia'},
  { number: 259, name: 'columbus' },
  { number: 260, name: 'corpus christi' },
  { number: 261, name: 'dallas' },
  { number: 262, name: 'davenport' },
  { number: 263, name: 'dayton' },
  { number: 264, name: 'denver' },
  { number: 265, name: 'des moines' },
  { number: 266, name: 'detroit' },
  { number: 267, name: 'dothan' },
  { number: 268, name: 'duluth' },
  { number: 269, name: 'el paso' },
  { number: 270, name: 'elmira' },
  { number: 271, name: 'erie' },
  { number: 272, name: 'eugene' },
  { number: 273, name: 'eureka' },
  { number: 274, name: 'evansville' },
  { number: 275, name: 'fairbanks' },
  { number: 276, name: 'fargo' },
  { number: 277, name: 'flint' },
  { number: 278, name: 'florence' },
  { number: 279, name: 'fort myers' },
  { number: 280, name: 'fort smith' },
  { number: 281, name: 'fort wayne' },
  { number: 282, name: 'fresno' },
  { number: 283, name: 'gainesville' },
  { number: 284, name: 'glendive' },
  { number: 285, name: 'grand junction' },
{ number: 286, name: 'grand rapids' },
{ number: 287, name: 'great falls' },
{ number: 288, name: 'green bay' },
{ number: 289, name: 'greensboro' },
{ number: 291, name: 'greenville' },
{ number: 292, name: 'greenwood' },
{ number: 293, name: 'harlingen' },
{ number: 294, name: 'harrisburg' },
{ number: 295, name: 'harrisonburg' },
{ number: 296, name: 'hartford' },
{ number: 297, name: 'hattiesburg' },
{ number: 298, name: 'helena' },
{ number: 299, name: 'honolulu' },
{ number: 300, name: 'houston' },
{ number: 301, name: 'huntsville' },
{ number: 302, name: 'idaho falls' },
{ number: 303, name: 'indianapolis' },
{ number: 304, name: 'jackson, ms' },
{ number: 305, name: 'jackson, tn' },
{ number: 306, name: 'jacksonville' },
{ number: 307, name: 'johnstown' },
{ number: 308, name: 'jonesboro' },
{ number: 309, name: 'joplin' },
{ number: 310, name: 'juneau' },
{ number: 311, name: 'kansas city' },
{ number: 312, name: 'knoxville' },
{ number: 313, name: 'la crosse' },
{ number: 314, name: 'lafayette, in' },
{ number: 315, name: 'lafayette, la' },
{ number: 316, name: 'lake charles' },
{ number: 317, name: 'lansing' },
{ number: 318, name: 'laredo' },
{ number: 319, name: 'las vegas' },
{ number: 320, name: 'lexington' },
{ number: 321, name: 'lima' },
{ number: 322, name: 'lincoln' },
{ number: 323, name: 'little rock' },
{ number: 324, name: 'los angeles' },
{ number: 325, name: 'louisville' },
{ number: 326, name: 'lubbock' },
{ number: 327, name: 'macon' },
{ number: 328, name: 'madison' },
{ number: 329, name: 'mankato' },
{ number: 330, name: 'marquette' },
{ number: 331, name: 'medford' },
{ number: 332, name: 'memphis' },
{ number: 333, name: 'meridian' },
{ number: 334, name: 'miami' },
{ number: 335, name: 'milwaukee' },
{ number: 336, name: 'minneapolis' },
{ number: 337, name: 'minot' },
{ number: 338, name: 'missoula' },
{ number: 339, name: 'mobile' },
{ number: 340, name: 'monroe' },
{ number: 341, name: 'monterey' },
{ number: 342, name: 'montgomery' },
{ number: 343, name: 'nashville' },
{ number: 344, name: 'new orleans' },
{ number: 345, name: 'new york' },
{ number: 346, name: 'norfolk' },
{ number: 347, name: 'north platte' },
{ number: 348, name: 'odessa' },
{ number: 349, name: 'oklahoma' },
{ number: 350, name: 'omaha' },
{ number: 351, name: 'orlando'},
{ number: 352, name: 'ottumwa' },
{ number: 353, name: 'paducah' },
{ number: 354, name: 'palm springs' },
{ number: 355, name: 'panama city' },
{ number: 356, name: 'parkersburg' },
{ number: 357, name: 'peoria' },
{ number: 358, name: 'philadelphia' },
{ number: 359, name: 'phoenix' },
{ number: 360, name: 'pittsburgh' },
{ number: 361, name: 'portland  auburn' },
{ number: 362, name: 'portland' },
{ number: 363, name: 'presque isle' },
{ number: 364, name: 'providence' },
{ number: 365, name: 'quincy' },
{ number: 366, name: 'raleigh' },
{ number: 367, name: 'rapid city' },
{ number: 368, name: 'reno' },
{ number: 369, name: 'richmond' },
{ number: 370, name: 'roanoke' },
{ number: 371, name: 'rochester' },
{ number: 373, name: 'rockford' },
{ number: 374, name: 'sacramento' },
{ number: 375, name: 'saint joseph' },
{ number: 376, name: 'saint louis' },
{ number: 377, name: 'salisbury' },
{ number: 378, name: 'salt lake city' },
{ number: 379, name: 'san angelo' },
{ number: 380, name: 'san antonio' },
{ number: 381, name: 'san diego' },
{ number: 382, name: 'san francisco' },
{ number: 383, name: 'santa barbara' },
{ number: 384, name: 'savannah' },
{ number: 385, name: 'seattle' },
{ number: 386, name: 'sherman' },
{ number: 387, name: 'shreveport' },
{ number: 388, name: 'sioux city' },
{ number: 389, name: 'sioux falls' },
{ number: 390, name: 'south bend' },
{ number: 391, name: 'spokane' },
{ number: 392, name: 'springfield' },
{ number: 393, name: 'springfield' },
{ number: 394, name: 'syracuse' },
{ number: 395, name: 'tallahassee' },
{ number: 396, name: 'tampa' },
{ number: 397, name: 'terre haute' },
{ number: 398, name: 'toledo' },
{ number: 399, name: 'topeka'},
{ number: 400, name: 'traverse city' },
{ number: 401, name: 'tri-cities' },
{ number: 402, name: 'tucson' },
{ number: 403, name: 'tulsa' },
{ number: 404, name: 'twin falls' },
{ number: 405, name: 'tyler' },
{ number: 406, name: 'utica' },
{ number: 407, name: 'victoria' },
{ number: 408, name: 'waco ' },
{ number: 409, name: 'washington dc' },
{ number: 410, name: 'watertown' },
{ number: 411, name: 'wausau' },
{ number: 412, name: 'west palm beach' },
{ number: 413, name: 'wheeling' },
{ number: 414, name: 'wichita' },
{ number: 415, name: 'wichita falls' },
{ number: 416, name: 'wilkes barre' },
{ number: 417, name: 'wilmington' },
{ number: 418, name: 'yakima' },
{ number: 419, name: 'youngstown' },
{ number: 420, name: 'yuma' },
{ number: 421, name: 'zanesville' },
{ number: 422, name: 'northern new jersey' },

]





window.addEventListener('load', function() {
    getLocalStorage();
    weatherSearch("boston");
    eventSearch("boston");
    
    $('#cityname').text("Boston");

    var loadfavs = JSON.parse(localStorage.getItem("favorites"));
    for (i = 0; i < loadfavs.length; i++) {
        let localcitycard = document.createElement("div");
        let localcityname = document.createElement("a");

        localcitycard.classList.add("item");
        localcityname.classList.add("favlinks");

        localcitycard.appendChild(localcityname);

        $('#favorites').append(localcitycard);
        localcityname.append(loadfavs[i]);
    }

})  
// for on load example 
$('#favorites').click(function(event) {
    var target =event.target
    if(target.tagName === "A"){
        weatherSearch(target.textContent)
        eventSearch(target.textContent)
        $('#cityname').text(target.textContent)
    }
})

