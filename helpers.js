export function getCurrentDateTime(apiDate) {   
    const date = new Date(apiDate);

    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };
    return date.toLocaleString("ru-RU", options).replace(",", "");
}