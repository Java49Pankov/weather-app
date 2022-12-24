import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";
import { minMaxDays } from "./ui/minMaxDays.js";

const weatherProcessor = new WeatherDataProcessor();
const temperatureList = new TemperaturesList("items-list", "city");

const params = {
    idForm: "data_form", idDateFrom: "date_from", idDateTo: "date_to",
    idHourFrom: "hour_from", idHourTo: "hour_to", idErrorMessage: "error_message",
    idListCities: "city_list",
    cities: weatherProcessor.getCities(),
    minMaxDate: minMaxDays(weatherProcessor.getHowDays())
};

const dataForm = new DataForm(params);
dataForm.addHandler(async (dataFromForm) => {
    const data = await weatherProcessor.getData(dataFromForm);
    temperatureList.showTemperaures(data)
});




