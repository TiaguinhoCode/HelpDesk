export function ConvertStringToBoolean(value: string) {
    return value === "true" ? true : value === "false" ? false : "";
}