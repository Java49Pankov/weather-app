export function minMaxDays(days) {
    const currentDate = new Date();
    const minDate = currentDate.toISOString().substring(0, 10);
    const newCurData = currentDate.getDate();
    currentDate.setDate(newCurData + days);
    const maxDay = currentDate.toISOString().substring(0, 10);
    return { minDay: minDate, maxDay: maxDay };
}