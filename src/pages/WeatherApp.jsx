import { useEffect, useState } from "react"
import axios from "axios"

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const API_KEY = 'YjGGzGlvwYKwCLKP9iZ3rbCSnwn8tOyh'
const TEL_AVIV_CITY_KEY = '215854'


const BASE_URL = 'http://dataservice.accuweather.com'

// End Points
const CURRENT_CONDITIONS_END_POINT = '/currentconditions/v1/'
const FIVE_DAYS_FORECAST_END_POINT = '/forecasts/v1/daily/5day/'
const AUTO_COMPLETE_END_POINT = '/locations/v1/cities/autocomplete'

export const WeatherApp = () => {

    const [currentConditionsRes, setCurrentConditionsRes] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log(API_KEY);
    }, [])

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="weather-app">
            WeatherApp works!
            <code>{JSON.stringify(currentConditionsRes, null, 2)}</code>
        </div>
    )
}