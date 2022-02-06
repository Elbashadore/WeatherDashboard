

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
 

// DOM Manipulators 

/////////////////////////////////////////////////////////////////

$(homeSearch).click(geocde);



// functions

////////////////////////////////////////////////////////////////


// load search results page after homeSearch is clicked

function geocde(event){
pastSearches();
var cityName = cityNameSelector.val();
var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&" + "limit=" + limit + "&appid=" + apiKey;
alert(cityName);
alert(geocodeUrl);
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
    weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    fetch(weatherApiUrl)
    .then(response =>{
        if(response.ok){
            return response.json()
        }
    })
    .then(data =>{
        console.log(data);
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

// API Calls

////////////////////////////////////////////////////////////////

// Geocode API call


