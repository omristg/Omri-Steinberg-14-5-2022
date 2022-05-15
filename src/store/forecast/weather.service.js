import axios from "axios"

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const API_KEY = 'H3XWBbkAd0UWexItRa3Jnew91XbMLAF1'
const TEL_AVIV_CITY_KEY = '215854'


const BASE_URL = 'http://dataservice.accuweather.com'

// End Points
const CURRENT_CONDITIONS_END_POINT = '/currentconditions/v1/'
const FIVE_DAYS_FORECAST_END_POINT = '/forecasts/v1/daily/5day/'
const AUTO_COMPLETE_END_POINT = '/locations/v1/cities/autocomplete'
const CITY_SEARCH_END_POINT = '/locations/v1/cities/search'

export const weatherService = {
    getCityData,
    getCurrConditions,
    getForecast,
    runAutoComplete
}

async function getCityData(searchVal) {
    const params = new URLSearchParams({
        apikey: API_KEY,
        q: searchVal
    })
    try {
        const { data } = await axios.get(`${BASE_URL}${CITY_SEARCH_END_POINT}`, { params })
        const cityData = data[0]
        return {
            cityId: cityData.Key,
            cityName: cityData.LocalizedName,
            countryName: cityData.Country.LocalizedName
        }
    } catch (err) {
        throw err
    }
}

async function getCurrConditions(cityId = TEL_AVIV_CITY_KEY) {

    const { data } = await axios.get(`${BASE_URL}${CURRENT_CONDITIONS_END_POINT}${cityId}?apikey=${API_KEY}`)
    const currCondition = data[0]
    return {
        dateString: currCondition.LocalObservationDateTime,
        temp: currCondition.Temperature.Metric.Value,
        icon: currCondition.WeatherIcon,
        weatherDesc: currCondition.WeatherText
    }
}

async function getForecast(cityId = TEL_AVIV_CITY_KEY) {
    try {
        const { data } = await axios.get(`${BASE_URL}${FIVE_DAYS_FORECAST_END_POINT}${cityId}?apikey=${API_KEY}&metric=true`)
        return data.DailyForecasts
    } catch (err) {
        throw err
    }
}

async function runAutoComplete(query) {
    if (!query) return
    const params = new URLSearchParams({
        q: query,
        apikey: API_KEY
    })
    try {
        const { data } = await axios.get(`${BASE_URL}${AUTO_COMPLETE_END_POINT}`, { params })
        const options = data.map(option => ({
            cityId: option.Key,
            cityName: option.LocalizedName,
            countryName: option.Country.LocalizedName,
        }))
        return options
    } catch (err) {
        throw err
    }
}
