import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getForecastAndCurrWeather } from "../store/forecast/weather.slice"

import { ForecastList } from "../cmps/ForecastList"
import { SearchBar } from "../cmps/SearchBar"
import { CityDetails } from "../cmps/CityDetails"
import { Spinner } from '../cmps/layout/Spinner'

export const WeatherApp = () => {


    // eslint-disable-next-line
    const { currCity, currWeather, forecasts, isLoading, isError } = useSelector(({ weatherModule }) => weatherModule)
    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)
    const dispatch = useDispatch()
    const { cityId } = currCity


    useEffect(() => {
        dispatch(getForecastAndCurrWeather(cityId))
    }, [dispatch, cityId, isMetric])




    if (isLoading || !currWeather) return <Spinner />

    const currCityWithWeather = { ...currCity, ...currWeather }

    return (
        <div className="weather-app">
            <SearchBar />
            <CityDetails city={currCityWithWeather} isRenderedByFavorites={false} />
            <ForecastList forecasts={forecasts} />
        </div>
    )
}