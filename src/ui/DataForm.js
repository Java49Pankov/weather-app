import { errorMessage } from "./showErrorMessage.js";
export class DataForm {
    #formElement
    #inputElements;
    #dateFromElement
    #dateToElement
    #dateFrom;
    #dateTo;
    #hoursFromElement;
    #hoursToElement;
    #hoursFrom;
    #hoursTo;
    #errorMessageElem
    constructor(params) {
        this.#formElement = document.getElementById(params.idForm);
        this.#inputElements = document.querySelectorAll(`#${params.idForm} [name]`);
        this.#dateFromElement = document.getElementById(params.idDateFromInputElem);
        this.#dateToElement = document.getElementById(params.idDateToInputElem);
        this.#hoursFromElement = document.getElementById(params.idHoursFromElem);
        this.#hoursToElement = document.getElementById(params.idHoursToElem);
        this.#errorMessageElem = document.getElementById(params.idShowErrorMessage);
        this.onChangeDateFrom();
        this.onChangeDateTo();
        // this.onChangeTimeFrom();
        // this.onChangeTimeTo();
    }
    addSubmitHandler(processFun) {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const weather = Array.from(this.#inputElements).reduce(
                (res, cur) => {
                    res[cur.name] = cur.value;
                    return res;
                }, {}
            )
            processFun(weather);
        })
    }
    onChangeDateFrom() {
        this.#dateFromElement.addEventListener("change", (event) => {
            const value = event.target.value;
            if (this.#dateTo && value >= this.#dateTo) {
                errorMessage(event.target,
                    `Date From must be less than Date To`, this.#errorMessageElem);
            } else {
                this.#dateFrom = value;
            }
        })
    }

    onChangeDateTo() {
        this.#dateToElement.addEventListener("change", (event) => {
            const value = event.target.value;
            if (this.#dateFrom && value < this.#dateFrom) {
                errorMessage(event.target,
                    `Date To must be greater than Date From`, this.#errorMessageElem);
            } else {
                this.#dateTo = value;
            }
        })
    }

    // onChangeTimeFrom() {
    //     this.#hoursFromElement.addEventListener("change", (event) => {
    //         const value = +event.target.value;
    //         if (this.#hoursTo && value > this.#hoursTo) {
    //             errorMessage(event.target,
    //                 `Hours From must be less than hours To`, this.#errorMessageElem);
    //         } else {
    //             this.#hoursFrom = value;
    //         }
    //     })
    // }

    // onChangeTimeTo() {
    //     this.#hoursToElement.addEventListener("change", (event) => {
    //         const value = +event.target.value;
    //         if (this.#hoursFrom && value < this.#hoursFrom) {
    //             errorMessage(event.target,
    //                 `Hours To must be greater than Hours From`, this.#errorMessageElem);
    //         } else {
    //             this.#hoursTo = value;
    //         }
    //     })
    // }
}