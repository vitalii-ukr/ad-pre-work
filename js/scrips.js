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
    alert('add listener to '+element.id+' outside');
    element.addEventListener("change", (shownTypeElement) => {
        shownTypeElementId = shownTypeElement.target.id;
        alert('changed: '+ shownTypeElementId);
        var shownType = shownTypeElementId.replace("Type", "").toLowerCase();
        switch(shownType)
        {
            case "plain":
                showPlainData();
                break;
            case "chart":
                showChartData();
                break;
            default: alert("Shown data type: " + shownTypeElementId + " not supported!");
        }

    })
});
