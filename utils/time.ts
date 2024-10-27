export function formatDateToTimeString(date: any, is24HourFormat: boolean = true) {
    var d: Date = new Date();
    if (date instanceof Date) {
        d = date;
    } else if (typeof date === "string") {
        d = new Date(date);
    }
    const utcOffset = 7 * 60;
    const localDate = new Date(d.getTime() + (utcOffset * 60 * 1000));

    const hoursUTC = localDate.getHours();
    const minutes = localDate.getMinutes();

    let hours;
    let amPm = '';

    if (is24HourFormat) {
        hours = hoursUTC < 10 ? '0' + hoursUTC : hoursUTC;
    } else {
        hours = hoursUTC % 12 || 12;
        amPm = hoursUTC >= 12 ? ' PM' : ' AM';
    }
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return is24HourFormat
        ? `${hours}:${formattedMinutes}`
        : `${hours}:${formattedMinutes}${amPm}`;
}