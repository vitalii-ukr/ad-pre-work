// API for finding coordinates by city name
// use "name" for searching
const localityAPIUrl = "https://geocoding-api.open-meteo.com/v1/search";
const weatherAPIUrl = "https://api.open-meteo.com/v1/forecast"
//?latitude=48.7501&longitude=30.2194&hourly=temperature_2m,relative_humidity_2m&forecast_days=1

function setLocality(locality){
    document.getElementById("latitude").value = locality.latitude;
    document.getElementById("longitude").value = locality.longitude;
}

async function fetchWeatherData(){
    var isUrlHasSearchParameters = false;
    var apiUrl = new URL(weatherAPIUrl);
    if (document.getElementById("temperature").checked) {
        apiUrl.searchParams.append("hourly", "temperature_2m");
        isUrlHasSearchParameters = true;
    }
    if (document.getElementById("humidity").checked) {        
        apiUrl.searchParams.append("hourly", "relative_humidity_2m");
        isUrlHasSearchParameters = true;
    }

    if(!isUrlHasSearchParameters){
        alert("Please, select data for displaying");
        return;
    }

    // forecast data for only 1 day
    apiUrl.searchParams.append("forecast_days", 1);
    apiUrl.searchParams.append("latitude", document.getElementById("latitude").value);
    apiUrl.searchParams.append("longitude", document.getElementById("longitude").value);
    
    const response = await fetch(apiUrl);
    var respinseAsJson = await response.json();
    setWeatherDataCache(JSON.stringify(respinseAsJson));
}

function cleanNodes(node) {
    while (node.hasChildNodes()) {
        node.childNodes[0].remove();
    }
}

async function tryToFindLocality(localityName){
    var apiUrl = new URL(localityAPIUrl);
    apiUrl.searchParams.append("name", localityName);    
    const response = await fetch(apiUrl);
    var respinseAsJson = await response.json();
    
    var localities = document.getElementById("localities");
    // clear privious results    
    cleanNodes(localities);
        
    try
    {   
        respinseAsJson.results.forEach(locality => {                        
            localities.appendChild(new Option(locality.country + ' / ' + locality.admin1 + ' / ' + locality.name, JSON.stringify(locality)));
        })
        
        setLocality(respinseAsJson.results[0]);
        document.getElementById("possibleLocalities").removeAttribute("hidden");
    }
    catch(e)
    {
        alert("Cannot find any locality with name: " + localityName);
    }        
}

function searchButtonClick(){
    var localityName = document.getElementById("searchField").value;    
    tryToFindLocality(localityName);
}

document.getElementById("searchField").addEventListener("keydown", async (event) => {
    if(event.key !== "Enter"){
        return;
    }
    var localityName = event.target.value;
    tryToFindLocality(localityName);
});

function setWeatherDataCache(newWeatherData){
    document.getElementById("dataInfo").setAttribute("data-source", newWeatherData);
}
function getWeatherDataCache(){
    const cache = document.getElementById("dataInfo").getAttribute("data-source");
    var dataObject;
    try
    {
        dataObject = JSON.parse(cache);        
    }
    catch(e)
    {        
        dataObject = {};
    }
    return dataObject;
}

function isJSONObjectEmpty(obj){
    return JSON.stringify(obj) === JSON.stringify({});
}

function cleanDataContainer(){
    cleanNodes(document.getElementById("plainDataType"));
    cleanNodes(document.getElementById("chartDataType"));
}

function showPlainData(){
    console.log("plain");
    var data = getWeatherDataCache();
    if(isJSONObjectEmpty(data)){
        return;
    }

    var plainDataContainer = document.getElementById("plainDataType");
    cleanDataContainer();
    var hasTemerature = data.hourly.hasOwnProperty("temperature_2m");
    var hasHumidity = data.hourly.hasOwnProperty("relative_humidity_2m");
    
    var table = document.createElement("table");
    var headerRow = table.createTHead().insertRow();

    var headerRowNumber = 0;
    headerRow.insertCell(headerRowNumber++).innerHTML = "Time";
    if(hasHumidity)
        headerRow.insertCell(headerRowNumber++).innerHTML = "Humidity, " + data.hourly_units.relative_humidity_2m;
    if(hasTemerature)
        headerRow.insertCell(headerRowNumber++).innerHTML = "Temperature, " + data.hourly_units.temperature_2m;

    var tbody = table.createTBody();
    for (var i = 0; i < data.hourly.time.length; i++) {
        var row = tbody.insertRow(i);
        
        row.insertCell().innerHTML = data.hourly.time[i];
        if (hasHumidity) {            
            row.insertCell().innerHTML = data.hourly.relative_humidity_2m[i];
        }
        if (hasTemerature) {            
            row.insertCell().innerHTML = data.hourly.temperature_2m[i];
        }                
    }
   
    plainDataContainer.appendChild(table);
    
}

function showChartData(){
    cleanDataContainer();
    alert("chart data");
}

// managing subscribsion for different types of shown data
var dataShownTypesElements = document.getElementById("dataShownTypeForm").querySelectorAll("input[type=radio]");
dataShownTypesElements.forEach(element => {
    const shownElementId = element.id;
    var shownType = shownElementId.replace("Type", "").toLowerCase();        
    switch(shownType)
        {
            case "plain":
                element.addEventListener("change", () => {
                    showPlainData();
                });                                
                break;
            case "chart":
                element.addEventListener("change", () => {
                    showChartData();
                }); 
                break;
            default: alert("Shown data type: " + shownTypeElementId + " not supported!");
        }    
});

document.getElementById("localities").addEventListener("change", async (event) => {
    // selected first locality    
    var targetLocality = JSON.parse(event.target.value);
    console.log(targetLocality);
    setLocality(targetLocality);
})

async function showWeatherData(){
    await fetchWeatherData();
    document.getElementById("dataShownTypeForm").querySelectorAll("input[type=radio][checked]").forEach(e => {e.dispatchEvent(new Event("change"))});
}
