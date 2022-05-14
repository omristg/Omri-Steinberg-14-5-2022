import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { weatherService } from "../store/forecast/weather.service"
import { getForecastAndCurrWeather } from "../store/forecast/weather.slice"


export const WeatherApp = () => {

    const { currCity, currGeoLocCity, isLoading, isError } = useSelector(({ weatherModule }) => weatherModule)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            dispatch(getForecastAndCurrWeather())
        })();
    }, [dispatch])

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="weather-app">
            WeatherApp works!
        </div>
    )
}