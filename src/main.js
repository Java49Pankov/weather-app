import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";
//https://api.open-meteo.com/v1/gfs?latitude=31.0461&longitude=34.8516&hourly=temperature_2m&timezone=IST&start_date=2022-12-18&end_date=2023-01-03
// let latitude = 31.046;
// let longitude=34.851;
// let start_date="2022-12-18";
// let end_date="2022-12-19";

// let promiseResponse = fetch(url);

// let promiseData = promiseResponse.then(response=>response.json());
// let dataProcessing = promiseData.then(data => console.log(data.hourly.time
//     ))
// this.#formElement = document.getElementById(params.idForm);
//        this.#inputElements = document.querySelectorAll(`#${params.idForm} [name]`);
//        this.#dateFromElement = document.getElementById(params.idDateFrom);
//        this.#dateToElement = document.getElementById(params.idDateTo);
//        this.#hourFromElement = document.getElementById(params.idHourFrom);
//        this.#hourToElement = document.getElementById(params.idHourTo);
//        this.#errorMessageElem = document.getElementById(params.idErrorMessage);
const params = {idForm: "data_form", idDateFrom: "date_from", idDateTo: "date_to",
idHourFrom: "hour_from", idHourTo: "hour_to", idErrorMessage: "error_message"};
const weatherProcessor = new WeatherDataProcessor();
const dataForm = new DataForm(params);
const temperatureList = new TemperaturesList("items-list", "city");
dataForm.addHandler((dataFromForm) => {
    console.log(dataFromForm);
     const promiseData = weatherProcessor.getData(dataFromForm);
    
    promiseData.then(data => temperatureList.showTemperatures(data));
    
})



