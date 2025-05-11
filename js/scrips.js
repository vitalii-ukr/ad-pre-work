// API for finding coordinates by city name
// use "name" for searching
const localityAPIUrl = "https://geocoding-api.open-meteo.com/v1/search";

function setLocality(locality){
    document.getElementById("latitude").value = locality.latitude;
    document.getElementById("longitude").value = locality.longitude;
}

async function tryToFindLocality(localityName){
    var apiUrl = new URL(localityAPIUrl);
    apiUrl.searchParams.append("name", localityName);    
    const response = await fetch(apiUrl);
    var respinseAsJson = await response.json();
    
    var localities = document.getElementById("localities");
    // clear privious results    
    while(localities.hasChildNodes())
    {        
        localities.childNodes[0].remove();
    }
        
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


function showPlainData(){
    alert("plain data");

}

function showChartData(){
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

function showWeatherData(){
    document.getElementById("dataShownTypeForm").querySelectorAll("input[type=radio][checked]").forEach(e => {e.dispatchEvent(new Event("change"))});
}