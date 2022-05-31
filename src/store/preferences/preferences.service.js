export const preferencesService = {
    convertToFahrenheit,
    getTempToShow,
    getUnitToShow
}

function convertToFahrenheit(celsius) {
    return ((celsius * 1.8) + 32).toFixed()

}

function getTempToShow(isMetric, temp) {
    if (isMetric) return temp
    else return convertToFahrenheit(temp)
}

function getUnitToShow(isMetric) {
    if (isMetric) return 'C'
    else return 'F'
}