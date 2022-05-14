import axios from "axios"

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const API_KEY = 'YjGGzGlvwYKwCLKP9iZ3rbCSnwn8tOyh'
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
    getForecast
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
        timestamp: currCondition.EpochTime,
        temp: currCondition.Temperature.Metric.Value,
        isDayTime: currCondition.IsDayTime,
        icon: currCondition.WeatherIcon,
        text: currCondition.WeatherText
    }
}

async function getForecast(cityId = TEL_AVIV_CITY_KEY) {
    try {
        const { data } = await axios.get(`${BASE_URL}${FIVE_DAYS_FORECAST_END_POINT}${cityId}?apikey=${API_KEY}`)
        return data.DailyForecasts
    } catch (err) {
        throw err
    }
}