// API for finding coordinates by city name
// use "name" for searching
const localityAPIUrl = "https://geocoding-api.open-meteo.com/v1/search";

document.getElementById("searchField").addEventListener("keydown", async (event) => {
    if(event.key !== "Enter"){
        return;
    }
    
    var apiUrl = new URL(localityAPIUrl);
    apiUrl.searchParams.append("name", event.target.value);    
    const response = await fetch(apiUrl);
    var respinseAsJson = await response.json();
    try
    {
        var targetLocality = respinseAsJson.results[0];
        document.getElementById("latitude").value = targetLocality.latitude;
        document.getElementById("longitude").value = targetLocality.longitude;
    }
    catch(e)
    {
        alert("Cannot find any locality with name: " + event.target.value);
    }
    
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
