const stars= document.querySelectorAll('.stars a');
stars.forEach((star, idx) => { 
    star.addEventListener('click', ()=>{
        console.log('star of index ${idx} was clicked');
        //
    });
});

let favorites = $("#favorites")
let forecast = $("#forecast")
let events = $("#events")
let search = $("#searchButton")
let query = $("#query")

$("#searchButton").click(function(){
    weatherSearch(query.val());
})


let weatherSearch = function(param){
    forecast.empty()
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + param + "&units=imperial&appid=7cfd96e09578686d48a4d422e2ebfb44")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let weatherData = $(data)
        let firstSix = weatherData[0].list.slice(0,6)
        firstSix.forEach(function(item){
            let div1 = document.createElement("div")
            let div2 = document.createElement("div")
            let div3 = document.createElement("div")
            let div4 = document.createElement("div")
            let div5 = document.createElement("div")
            let div6 = document.createElement("div")
            let h1 = document.createElement("h1")
            let h2 = document.createElement("h2")
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
            div6.append(h1)
            div6.append(h2)  
          
           
        })
    })

}



// For Event Api

var cityfetch = "https://app.ticketmaster.com/discovery/v2/events.json?&dmaId=324&apikey=IsHdraDgQ6AybSMTXCgWdC4WQFWUkgBn"

const allcities = [
    { number: 212, name: 'abilene - sweetwater' },
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
{ number: 301, name: 'huntsville' }
]



$('#searchButton').click(function(event) {
    event.preventDefault();
    console.log("i kind of work");
    for (var i = 0; i < allcities.length; i++) {
        var tempcityname = $('#query').val().toLowerCase();
        if (tempcityname === allcities[i].name) {
            console.log("i work");
            console.log(allcities[i]);
            citynum = allcities[i].number;
            fetch("https://app.ticketmaster.com/discovery/v2/events.json?&dmaId=" + 
            citynum + "&apikey=IsHdraDgQ6AybSMTXCgWdC4WQFWUkgBn")
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log(data._embedded.events);
                    for (var i = 0; i < 6; i++) {
                        console.log(data._embedded.events[i].name);
                    }
                })
        }
    }
})