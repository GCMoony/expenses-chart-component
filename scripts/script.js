const chart = document.querySelector("#report-chart");

function addDataPoint(dataName, dataValue, maxValue) {
    /*
    <div class="datapoint flex-col">
        <div class="data"></div>
        <p>mon</p><
    /div>
    */
    let datapoint = document.createElement("div");
    datapoint.className = "datapoint flex-col";

    let numberTag = document.createElement("p");
    numberTag.appendChild(document.createTextNode(`$${dataValue}`));
    numberTag.className = "data-value font-heavy"
    datapoint.appendChild(numberTag);

    let data = document.createElement("div");
    dataValue == maxValue?  data.className = "data data-highest": data.className = "data";
    data.setAttribute("style", `height: ${dataValue / maxValue * 70}%`);
    datapoint.appendChild(data);

    data.addEventListener("mouseenter", () => {
      datapoint.querySelector(".data-value").classList.add("show"); 
    });

    data.addEventListener("mouseleave", () => {
        datapoint.querySelector(".data-value").classList.remove("show"); 
      })

    let dataTag = document.createElement("p");
    dataTag.appendChild(document.createTextNode(dataName));
    datapoint.appendChild(dataTag);

    chart.appendChild(datapoint);
}

async function getData() {
    const data = await fetch("../data.json");
    const json = await data.json();
    let maxValue = 0;
    let monthTotal = 0;
    for (let item of json) {
        if (item.amount > maxValue) {
            maxValue = item.amount;
        }
        monthTotal += item.amount;
    }

    //console.log(maxValue)

    json.forEach(entry => {
        addDataPoint(entry.day, entry.amount, maxValue);
    })

}



getData();