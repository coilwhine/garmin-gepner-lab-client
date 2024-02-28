import dayjs from "dayjs";

export function dateFormater(date: string) {
    return dayjs(date).format('DD.MM.YYYY')
}