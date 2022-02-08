

// variables 

/////////////////////////////////////////////////////////////////
var homeSearch = $("#click-me");
var apiKey = "a19e123a3b1cf7f00d08b299db07954c";
var cityNameSelector = $("#search-input");
var pastSearchSelector = $("#result-content");
var limit = "5";
var pastSearch = [];
var h2 = $("h2");
var searchResults = document.createElement("div");
var olElement = document.createElement("ol");
var liElement0 = document.createElement("li");
var liElement1 = document.createElement("li");
var liElement2 = document.createElement("li");
var liElement3 = document.createElement("li");
var liElement4 = document.createElement("li");
var liElement5 = document.createElement("li");
var liElement6 = document.createElement("li");
var liElement7 = document.createElement("li");
var liElement8 = document.createElement("li");
var liElement9 = document.createElement("li");
var currentWeatherSelector = $(".currentWeather");
var currentWeather = document.createElement("div");
var wiconEl = document.createElement("img");
var currentTempEl = document.createElement("p");
var currentWindEl = document.createElement("p");
var currentHumidityEl = document.createElement("p");
var currentUviEl = document.createElement("div");
var placeDateEl = document.createElement("p");
var cityName = cityNameSelector.val();
var uviColorEl = document.createElement("p");
var backgroundRed = {"background-color": "#E6777E"};
var backgroundGreen = {"background-color": "#49E670"};
var backgroundYellow = {"background-color": "yellow"};
var forecastSelector =$(".forecast");
var forecast0El = document.createElement("div");
var forecast1El = document.createElement("div");
var forecast2El = document.createElement("div");
var forecast3El = document.createElement("div");
var forecast4El = document.createElement("div");
var past = false;
var namei = "";



 

// DOM Manipulators 

/////////////////////////////////////////////////////////////////

$(homeSearch).click(geocde);



// functions

////////////////////////////////////////////////////////////////


// load search results page after homeSearch is clicked

function geocde(event){
pastSearches();
var cityName = cityNameSelector.val();
var geocodeUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
event.preventDefault();
fetch(geocodeUrl)
    .then(function(res) {
        if (res.ok){
            return res.json();
        }   
    })
    .then(function(data) {
        console.log(data[0].lat);
        console.log(data[0].lon);
        weatherSearch(data)
    })


}


function weatherSearch(data){
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latitude + "&lon=" + longitude + "&units=imperial" + "&appid=" + apiKey;
    fetch(weatherApiUrl)
    .then(response =>{
        if(response.ok){
            return response.json()
        }
    })
    .then(data =>{
        console.log(data);
        curWeather(data);
        // forecast0El = "";
        // forecast1El = "";
        // forecast2El = "";
        // forecast3El = "";
        // forecast4El = "";
        forecast(data)
    })
}


//function to store recent weather searches

function pastSearches(){
pastSearch.unshift(cityNameSelector.val());
console.log(pastSearch);
$(liElement0).text(pastSearch[0]);
$(liElement1).text(pastSearch[1]); 
$(liElement2).text(pastSearch[2]);
$(liElement3).text(pastSearch[3]);
$(liElement4).text(pastSearch[4]);
$(liElement5).text(pastSearch[5]);
$(liElement6).text(pastSearch[6]);
$(liElement7).text(pastSearch[7]);
$(liElement8).text(pastSearch[8]);
$(liElement9).text(pastSearch[9]);
h2.append(searchResults);
searchResults.append(olElement);
olElement.append(liElement0);
olElement.append(liElement1);
olElement.append(liElement2);
olElement.append(liElement3);
olElement.append(liElement4);
olElement.append(liElement5);
olElement.append(liElement6);
olElement.append(liElement7);
olElement.append(liElement8);
olElement.append(liElement9);

liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]

for (i=0; i<pastSearch.length; i++) {
    if (pastSearch[i] !== ""){
        liElementArray[i].classList.add("cardStyle")
        
    }
}
    

}


// function to display current weather to the page

function curWeather(data){
    var placeDate = data["current"].dt;
    var miliseconds = placeDate * 1000
    var dateObject = new Date(miliseconds);
    var currentTemp = data["current"].temp;
    var currentWind = data["current"].wind_speed;
    var currentHumidity = data["current"].humidity;
    var currentUvi = data["current"].uvi;
    var currentIcon = data["current"].weather[0].icon;
     cityName = cityNameSelector.val();

    var iconUrl = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
    console.log(iconUrl);
    // http://openweathermap.org/img/wn/10d@2x.png

    $(currentTempEl).text(`Temp: ${currentTemp} F`);
    $(currentWindEl).text(`Wind: ${currentWind} MPH`);
    $(currentHumidityEl).text(`Humidity: ${currentHumidity} %`);
    $(uviColorEl).text(`UV Index ${currentUvi}`);
   
    

    currentWeatherSelector.append(currentWeather);
    currentWeather.append(placeDateEl);
    currentWeather.append(wiconEl);
    currentWeather.append(currentTempEl);
    currentWeather.append(currentWindEl);
    currentWeather.append(currentHumidityEl);
    currentWeather.append(currentUviEl);
    currentUviEl.append(uviColorEl);
    

    currentWeather.classList.add("weatherStyle");
    $(wiconEl).attr("id", "wicon");
    $(wiconEl).attr("src", iconUrl);
    $(wiconEl).attr("alt", "weather icon");
    currentTempEl.classList.add("currentWeatherCard");
    currentWindEl.classList.add("currentWeatherCard");
    currentHumidityEl.classList.add("currentWeatherCard");
    currentUviEl.classList.add("currentWeatherCard");
    uviColorEl.classList.add("uviColor");


    if (past == true && namei == 1){
        cityName = pastSearch[0];
        $(placeDateEl).text(`${cityName} ${dateObject}`);

    }
    else if(past == true && namei == 2) {
        cityName = pastSearch[1]
     $(placeDateEl).text(`${cityName} ${dateObject}`);}

    else if(past == true && namei ==3){
        cityName = pastSearch[2];
        $(placeDateEl).text(`${cityName} ${dateObject}`);
    }

    else if(past == true && namei ==4){
        cityName = pastSearch[3];
        $(placeDateEl).text(`${cityName} ${dateObject}`);
    }

    else if(past == true && namei ==5){
        cityName = pastSearch[4];
        $(placeDateEl).text(`${cityName} ${dateObject}`);
    }

    else if(past == true && namei ==6){
        cityName = pastSearch[5];
        $(placeDateEl).text(`${cityName} ${dateObject}`);
    }

    else if(past == true && namei ==7){
        cityName = pastSearch[6];
        $(placeDateEl).text(`${cityName} ${dateObject}`);
    }

    else if(past == true && namei ==8){
        cityName = pastSearch[7];
        $(placeDateEl).text(`${cityName} ${dateObject}`);
    }

    else if(past == true && namei ==9){
        cityName = pastSearch[8];
        $(placeDateEl).text(`${cityName} ${dateObject}`);
    }

    // else if(past == true && namei ==9){
    //     cityName = pastSearch[9];
    //     $(placeDateEl).text(`${cityName} ${dateObject}`);
    // }

    else {$(placeDateEl).text(`${cityName} ${dateObject}`);}

    past = false;
    namei = ""

    if (currentUvi <= 2){
        $(uviColorEl).css(backgroundGreen);
    }
    else if (currentUvi > 2 && currentUvi <= 5) {
        $(uviColorEl).css(backgroundYellow);
    }
    else {
        $(uviColorEl).css(backgroundRed);
    }


    console.log(currentTemp);
    console.log(currentWind);
    console.log(currentHumidity, currentUvi);
}

// function to display forecast 

function forecast(data){

    var forecastArray = [forecast0El, forecast1El,forecast2El, forecast3El, forecast4El]


    for (i=0; i<5; i++){
        

        




        forecastDay = data["daily"][i].dt
        forecastWicon = data["daily"][i]["weather"][0].icon
        var forecastIconUrl = "http://openweathermap.org/img/wn/" + forecastWicon + ".png";
        forecastWiconEl = document.createElement("img")
        $(forecastWiconEl).attr("id", "wicon");
        $(forecastWiconEl).attr("src", forecastIconUrl);
        $(forecastWiconEl).attr("alt", "weather icon");
        forecastDayEl = document.createElement("p");
        var d = new Date(forecastDay * 1000);
        d.toDateString();
        // var miliseconds = forecastDay * 1000
        // var dateObject = new Date(miliseconds);
        // dateObject.toISOString().split('T')[0]
        // var dateObject = new Date(miliseconds);
        $(forecastDayEl).text(` ${cityName} ${d}`)
       forecastTemp =  data["daily"][i].temp.max;
       forecastTempEl = document.createElement("p");
       $(forecastTempEl).text(`Temp ${forecastTemp} F`)
       forecastWind = data["daily"][i].wind_speed;
       forecastWindEl = document.createElement("p");
       $(forecastWindEl).text(`Wind: ${forecastWind} MPH`)
       forecastHumidity = data["daily"][i].humidity;
       forecastHumidityEl = document.createElement("p");
       $(forecastHumidityEl).text(`Humidity ${forecastHumidity} %`)

        forecastArray[i].classList.add("forecastCard")

       forecastArray[i].replaceChildren(forecastWiconEl, forecastDayEl, forecastTempEl, forecastWindEl, forecastHumidityEl);
       forecastSelector.append(forecastArray[i]);


       console.log(forecastDay, forecastTemp, forecastWind, forecastHumidity);
    }


   

}


// search histroy api calls
$(liElement0).on("click",function(event){
    namei = 0
    pastSearch.unshift(pastSearch[0]);
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    

    
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
var cityName = pastSearch[0];
var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
event.preventDefault();
fetch(geocodeUrl)
    .then(function(res) {
        if (res.ok){
            return res.json();
        }   
    })
    .then(function(data) {
        console.log(data[0].lat);
        console.log(data[0].lon);
        past = true;
        weatherSearch(data, past)
    })


})
$(liElement1).on("click", function(event){
    namei = 1
    pastSearch.unshift(pastSearch[1]);
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
    var cityName = pastSearch[1];
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            past = true;
            weatherSearch(data)
        })
    
    
    })

$(liElement2).on("click", function(event){
    pastSearch.unshift(pastSearch[2]);
    namei = 2
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
    var cityName = pastSearch[2];
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            past = true;
            weatherSearch(data)
        })
    
    
    })
$(liElement3).on("click", function(event){
    namei = 3;
    pastSearch.unshift(pastSearch[3]);
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
    var cityName = pastSearch[3];
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            past = true;
            weatherSearch(data)
        })
    
    
    })
$(liElement4).on("click", function(event){
    pastSearch.unshift(pastSearch[4]);
    namei = 4;
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
    var cityName = pastSearch[4];
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            past = true;
            weatherSearch(data)
        })
    
    
    })
$(liElement5).on("click", function(event){
    namei = 5;
    pastSearch.unshift(pastSearch[5]);
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
    var cityName = pastSearch[5];
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            past = true;
            weatherSearch(data)
        })
    
    
    })
$(liElement6).on("click", function(event){
    pastSearch.unshift(pastSearch[6]);
    namei = 6;
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
    var cityName = pastSearch[6];
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            past = true;
            weatherSearch(data)
        })
    
    
    })
$(liElement7).on("click", function(event){
    namei = 7;
    pastSearch.unshift(pastSearch[0]);
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
    var cityName = pastSearch[7];
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            past = true;
            weatherSearch(data)
        })
    
    
    })
$(liElement8).on("click", function(event){
    pastSearch.unshift(pastSearch[8]);
    namei = 8;
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
    var cityName = pastSearch[8];
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            past = true;
            weatherSearch(data)
        })
    
    
    })
$(liElement9).on("click", function(event){
    pastSearch.unshift(pastSearch[9]);
    namei = 9;
    console.log(pastSearch);
    $(liElement0).text(pastSearch[0]);
    $(liElement1).text(pastSearch[1]); 
    $(liElement2).text(pastSearch[2]);
    $(liElement3).text(pastSearch[3]);
    $(liElement4).text(pastSearch[4]);
    $(liElement5).text(pastSearch[5]);
    $(liElement6).text(pastSearch[6]);
    $(liElement7).text(pastSearch[7]);
    $(liElement8).text(pastSearch[8]);
    $(liElement9).text(pastSearch[9]);
    h2.append(searchResults);
    searchResults.append(olElement);
    olElement.append(liElement0);
    olElement.append(liElement1);
    olElement.append(liElement2);
    olElement.append(liElement3);
    olElement.append(liElement4);
    olElement.append(liElement5);
    olElement.append(liElement6);
    olElement.append(liElement7);
    olElement.append(liElement8);
    olElement.append(liElement9);
    
    liElementArray = [liElement0, liElement1, liElement2, liElement3, liElement4, liElement5, liElement6, liElement7, liElement8, liElement9]
    
    for (i=0; i<pastSearch.length; i++) {
        if (pastSearch[i] !== ""){
            liElementArray[i].classList.add("cardStyle")
            
        }
    }
    var cityName = pastSearch[9];
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
    event.preventDefault();
    fetch(geocodeUrl)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }   
        })
        .then(function(data) {
            console.log(data[0].lat);
            console.log(data[0].lon);
            past = true;
            weatherSearch(data)
        })
    
    
    })

// API Calls

////////////////////////////////////////////////////////////////

// Geocode API call


