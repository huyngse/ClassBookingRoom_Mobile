export function formatDateToTimeString(date: Date, is24HourFormat: boolean) {
    // Convert the date to UTC+7
    const utcOffset = 7 * 60; // UTC+7 in minutes
    const localDate = new Date(date.getTime() + (utcOffset * 60 * 1000));

    const hoursUTC = localDate.getHours();
    const minutes = localDate.getMinutes();

    let hours;
    let amPm = '';

    if (is24HourFormat) {
        // 24-hour format
        hours = hoursUTC < 10 ? '0' + hoursUTC : hoursUTC; // Pad with zero if needed
    } else {
        // 12-hour format
        hours = hoursUTC % 12 || 12; // Convert 0 to 12 for 12 AM
        amPm = hoursUTC >= 12 ? ' PM' : ' AM';
    }

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return is24HourFormat
        ? `${hours}:${formattedMinutes}`
        : `${hours}:${formattedMinutes}${amPm}`;
}