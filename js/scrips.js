// API for find coordinates by city name
// https://geocoding-api.open-meteo.com/v1/search?name=chica

function showPlainData(){
    alert("plain data");

}

function showChartData(){
    alert("chart data");
}

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
