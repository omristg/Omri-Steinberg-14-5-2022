export const preferencesService = {
    convertToFahrenheit
}

function convertToFahrenheit(celsius) {
    return ((celsius * 1.8) + 32).toFixed()

}