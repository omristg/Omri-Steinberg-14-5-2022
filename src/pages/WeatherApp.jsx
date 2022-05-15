import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getForecastAndCurrWeather } from "../store/forecast/weather.slice"
import { checkIsFavorite } from "../store/forecast/weather.slice"

import { ForecastList } from "../cmps/ForecastList"
import { SearchBar } from "../cmps/SearchBar"
import { CityDetails } from "../cmps/CityDetails"
import { Spinner } from '../cmps/layout/Spinner'

export const WeatherApp = () => {

    const { currCity, currWeather, forecasts, currGeoLocCity, isLoading, isError } = useSelector(({ weatherModule }) => weatherModule)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            dispatch(getForecastAndCurrWeather())
        })();
    }, [dispatch])

    useEffect(() => {
        dispatch(checkIsFavorite(currCity.cityId))
    }, [dispatch, currCity])

    if (isLoading) return <Spinner />

    const currCityWithWeather = { ...currCity, ...currWeather }

    return (
        <div className="weather-app">
            <SearchBar />
            <CityDetails city={currCityWithWeather} isRenderedByFavorites={false} />
            <ForecastList forecasts={forecasts} />
        </div>
    )
}