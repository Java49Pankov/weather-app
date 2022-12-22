import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/Temperatures.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";

const weatherProcessor = new WeatherDataProcessor();
const temperaturesList = new TemperaturesList("temperatures-list");

const dataForm = new DataForm({
    idForm: "temp_form", idDateFromInputElem: "date_from", idDateToInputElem: "date_to",
    idHoursFromElem: "time_from", idHoursToElem: "time_to", idShowErrorMessage: "date_error"
});
dataForm.addSubmitHandler((dataFromForm) => {
    const promiseData = weatherProcessor.getData(dataFromForm);
    promiseData.then(data => temperaturesList.showTemperatures(data))
})

// dataForm.addSubmitHandler((dataFromForm) => {
//     const promiseData = weatherProcessor.getData(dataFromForm);
//     promiseData.then(data => {
//         const limits = weatherProcessor.getHourLimits(dataFromForm);
//         const temp = data.filter(rec => {
//             const hour = +(rec.hour.slice(0,2));
//             console.log(hour)
//             return hour >= limits.hourMin && hour < limits.hourMax;
//         })
//         temperaturesList.showTemperatures(temp);
//     })
// })