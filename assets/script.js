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
