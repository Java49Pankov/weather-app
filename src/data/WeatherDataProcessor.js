export class WeatherDataProcessor {
    #cityGeocodes
    constructor() {
        this.#cityGeocodes = [{ city: "Rehovot", latitude: 31.8928, longitude: 34.8113 },
        { city: "Haifa", latitude: 32.7940, longitude: 34.9896 },
        { city: "Jerusalem", latitude: 31.7683, longitude: 35.2137 },
        { city: "Tel-Aviv", latitude: 32.0853, longitude: 34.7818 },
        { city: "Eilat", latitude: 29.5577, longitude: 34.9519 }]
    }

    async getData(requestObject) {
        const url = this.getUrl(requestObject);
        const response = await fetch(url);
        return this.processData((await response.json()),
            requestObject);

    }

    getUrl(requestObject) {
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";
        const geocodes = this.#cityGeocodes.find(gc => gc.city == requestObject.city);
        const latitude = geocodes.latitude;
        const longitude = geocodes.longitude;
        const startDate = requestObject.dateFrom;
        const endDate = requestObject.dateTo;
        const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}start_date=${startDate}&end_date=${endDate}`
        return url;
    }

    processData(data, requestObject) {
        const times = data.hourly.time;
        const temperatures = data.hourly.temperature_2m;
        const indexFrom = getIndexOfDate(times, requestObject.dateFrom);
        const indexTo = getIndexOfDate(times, requestObject.dateTo) + 24;
        const timesSelectedDates = times.slice(indexFrom, indexTo);
        const timesSelectedDatesHours = timesSelectedDates.filter((time, index) => {
            index = index % 24;
            return index >= requestObject.hourFrom && index <= requestObject.hourTo;
        })
        const temperaturesSelectedDates = temperatures.slice(indexFrom, indexTo);
        const temperaturesDatesHours = temperaturesSelectedDates.filter((time, index) => {
            index = index % 24;
            return index >= requestObject.hourFrom && index <= requestObject.hourTo;
        })
        const objects = timesSelectedDatesHours.map((dt, index) => {
            const dateTime = dt.split("T");
            return { date: dateTime[0], hour: dateTime[1], temperature: temperaturesDatesHours[index] }
        })
        return { city: requestObject.city, objects }
    }

    getCities() {
        let arrCities = this.#cityGeocodes.map(res => {
            return res.city;
        })
        return arrCities;
    }

    getHowDays() {
        return 17;
    }
}

function getIndexOfDate(times, date) {
    return times.findIndex(t => t.includes(date));
}
