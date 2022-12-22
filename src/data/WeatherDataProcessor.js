export class WeatherDataProcessor {
    #cityGeocodes
    constructor() {
        this.#cityGeocodes = [{ city: "Haifa", latitude: 32.82, longitude: 34.99 },
        { city: "Tel-Aviv", latitude: 32.08, longitude: 34.78 },
        { city: "Rehovot", latitude: 31.89, longitude: 34.81 },
        { city: "Jerusalem", latitude: 31.77, longitude: 35.22 },
        { city: "Eilat", latitude: 29.56, longitude: 34.95 }];
    }
    getData(requestObject) {
        const url = this.getUrl(requestObject);
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()))
    }

    getUrl(requestObject) {
        const cityData = this.#cityGeocodes.find(a => a.city == requestObject.city)
        console.log(requestObject)
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";
        const url = `${baseUrl}latitude=${cityData.latitude}&longitude=${cityData.longitude}${baseParams}start_date=${requestObject.dateFrom}&end_date=${requestObject.dateTo}`
        return url;

    }
    // getHourLimits(requestObject) {
    //     return {hourMin: +requestObject.hourFrom, hourMax: +requestObject.hourTo};
    // }

    processData(promiseData) {
        console.log(promiseData)
        return promiseData.then(data => {
            console.log(data)
            const result = [];
            for (let i = 0; i < data.hourly.time.length; i++) {
                const dateTime = data.hourly.time[i].split("T");
                result.push({
                    date: dateTime[0],
                    hour: dateTime[1],
                    temperature: data.hourly.temperature_2m[i]
                })
            }
            return result;
        })
    }
}

