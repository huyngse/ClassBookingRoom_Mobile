import { formatDateToTimeString } from "./time";

export function formatDate(date: any, includetime: boolean = false) {
    if (date instanceof Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        if (includetime) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}, ${day}/${month}/${year}`;
        }
        return `${day}/${month}/${year}`;
    } else if (typeof date === "string") {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        if (includetime) {
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}, ${day}/${month}/${year}`;
        }
        return `${day}/${month}/${year}`;
    } else {
        throw new Error("formatDate() => Invalid argument");
    }
}

export function areDatesEqual(date1: Date, date2: Date) {
    const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return normalizeDate(date1).getTime() - normalizeDate(date2).getTime();
}

export function toLocalDate(date: any) {
    if (date instanceof Date) {
        return new Date(date.getTime() + 7 * 3600000);
    } else if (typeof date === "string") {
        return new Date(new Date(date).getTime() + 7 * 3600000);
    } else {
        throw new Error("toLocalDate() => Invalid argument");
    }
}