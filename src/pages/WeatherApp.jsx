import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { getForecastAndCurrWeather, resetError } from "../store/forecast/weather.slice"

import { ForecastList } from "../cmps/ForecastList"
import { SearchBar } from "../cmps/SearchBar"
import { CityDetails } from "../cmps/CityDetails"
import { Spinner } from '../cmps/layout/Spinner'

export const WeatherApp = () => {


    const { currCity, currWeather, forecasts, isLoading, isError, message } = useSelector(({ weatherModule }) => weatherModule)
    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)
    const dispatch = useDispatch()
    const { cityId } = currCity


    useEffect(() => {
        dispatch(getForecastAndCurrWeather(cityId))
    }, [dispatch, cityId, isMetric])


    useEffect(() => {
        if (isError) toast.error(message, {
            hideProgressBar: false,
            autoClose: 3000
        })
        dispatch(resetError())
    }, [dispatch, isError, message])



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