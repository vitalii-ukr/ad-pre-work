
function showPlainData(){
    alert("plain data");

}

function showChartData(){
    alert("chart data");
}

document.getElementById("dataShownTypeForm").addEventListener("click", () => {
    var shownTypes = document.getElementById("dataShownTypeForm").getElementsByTagName("input");
    alert("outside");
    Array.from(shownTypes).forEach(element => {
        if(element.type === "radio"){
            alert("inside");
            if(!element.checked)
                return;

            var shownType = element.id.replace("Type", "").toLowerCase();       
            switch(shownType)
            {
                case "plain":
                    showPlainData();
                    break;
                case "chart":
                    showChartData();
                    break;
                default: alert("Shown data type: " + shownType + " not supported!");
            }
        }
    });    

});