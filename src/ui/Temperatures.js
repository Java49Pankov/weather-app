export class TemperaturesList {
    #listElement;
    constructor(idList) {
        this.#listElement = document.getElementById(idList)
    }
    showTemperatures(dataArray) {
        this.#listElement.innerHTML = getTemperList(dataArray)
    }
}
function getTemperList(dataArr) {
    console.log(dataArr)
    return dataArr.map(value => {
        console.log(value)
        return ` <div class="details-list">
<ul>
    <li>Data: ${value.date}</li>
    <li>Hours: ${value.hour}</li>
    <li>Temperature value: ${value.temperature}</li>
</ul>
</div>`});
}
