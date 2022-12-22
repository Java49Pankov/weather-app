const TIME_OUT_ERROR_MESSAGE = 3000;
const ERROR_CLASS = "error";
export function errorMessage(element, message, errorElement) {
    element.classList.add(ERROR_CLASS);
    errorElement.innerHTML = message;
    setTimeout(() => {
        element.classList.remove(ERROR_CLASS);
        element.value = '';
        errorElement.innerHTML = '';
    }, TIME_OUT_ERROR_MESSAGE);
}