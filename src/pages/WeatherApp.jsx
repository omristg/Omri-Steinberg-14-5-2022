import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getForecastAndCurrWeather } from "../store/forecast/weather.slice"

import { ForecastList } from "../cmps/ForecastList"
import { SearchBar } from "../cmps/SearchBar"
import { CityDetails } from "../cmps/CityDetails"

export const WeatherApp = () => {

    const { currCity, currWeather, forecasts, currGeoLocCity, isLoading, isError } = useSelector(({ weatherModule }) => weatherModule)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            dispatch(getForecastAndCurrWeather())
        })();
    }, [dispatch])

    if (isLoading) return <div>Loading...</div>

    const currCityWithWeather = { ...currCity, ...currWeather }

    return (
        <div className="weather-app">
            <SearchBar />
            <CityDetails city={currCityWithWeather} isFavorites={false} />
            <ForecastList forecasts={forecasts} />
        </div>
    )
}