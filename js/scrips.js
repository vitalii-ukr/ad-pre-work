// API for finding coordinates by city name
// use "name" for searching
const localityAPIUrl = "https://geocoding-api.open-meteo.com/v1/search";

async function tryToFindLocality(localityName){
    var apiUrl = new URL(localityAPIUrl);
    apiUrl.searchParams.append("name", localityName);    
    const response = await fetch(apiUrl);
    var respinseAsJson = await response.json();
    
    var localities = document.getElementById("localities");    
    while(localities.hasChildNodes())
    {        
        localities.childNodes[0].remove();
    }
        
    try
    {        
        console.log(JSON.stringify(respinseAsJson.results));
        respinseAsJson.results.forEach(locality => {
            console.log(locality.country + locality.admin1 + locality.name);            
            localities.appendChild(new Option(locality.country + ' / ' + locality.admin1 + ' / ' + locality.name), locality);
        })

        document.getElementById("possibleLocalities").removeAttribute("hidden");
       
        // selected first locality
        var targetLocality = respinseAsJson.results[0];
        document.getElementById("latitude").value = targetLocality.latitude;
        document.getElementById("longitude").value = targetLocality.longitude;
        
    }
    catch(e)
    {
        alert("Cannot find any locality with name: " + localityName);
    }        
}

function searchButtonClick(){
    var localityName = document.getElementById("searchField").value;
    alert(localityName);
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
