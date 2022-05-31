import axios from "axios"

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

// End Points
const CURRENT_CONDITIONS_END_POINT = '/currentconditions/v1/'
const FIVE_DAYS_FORECAST_END_POINT = '/forecasts/v1/daily/5day/'
const AUTO_COMPLETE_END_POINT = '/locations/v1/cities/autocomplete'
const GEOPOSITION_END_POINT = '/locations/v1/cities/geoposition/search'

const accuWeather = axios.create({
    baseURL: 'https://dataservice.accuweather.com',
    params: {
        apikey: API_KEY
    }
})

export const weatherService = {
    getCurrConditions,
    getForecast,
    runAutoComplete,
    getCityByGeoPosition
}

async function getCurrConditions(cityId) {
    try {
        const { data } = await accuWeather.get(`${CURRENT_CONDITIONS_END_POINT}${cityId}`)
        const currCondition = data[0]
        return {
            dateString: currCondition.LocalObservationDateTime,
            temp: currCondition.Temperature.Metric.Value,
            icon: currCondition.WeatherIcon,
            weatherDesc: currCondition.WeatherText
        }
    } catch (err) {
        throw err
    }
}

async function getForecast(cityId) {
    const params = {
        metric: true
    }
    try {
        const { data } = await accuWeather.get(`${FIVE_DAYS_FORECAST_END_POINT}${cityId}`, { params })
        return data.DailyForecasts
    } catch (err) {
        throw err
    }
}

async function runAutoComplete(query) {
    if (!query) return
    const params = {
        q: query,
    }
    try {
        const { data } = await accuWeather.get(AUTO_COMPLETE_END_POINT, { params })
        const options = data.map(option => ({
            cityId: option.Key,
            cityName: option.LocalizedName,
            countryName: option.Country.LocalizedName,
        }))
        return options
    } catch (err) {
        const msg = err.response?.data?.message || err.message || err.toString()
        throw msg
    }
}

async function getCityByGeoPosition(geoPosition) {
    const { lat, lng } = geoPosition
    const params = {
        q: `${lat},${lng}`
    }
    try {
        const { data } = await accuWeather.get(GEOPOSITION_END_POINT, { params })
        return {
            cityId: data.Key,
            cityName: data.LocalizedName,
            countryName: data.Country.LocalizedName
        }
    } catch (err) {
        throw err
    }
}