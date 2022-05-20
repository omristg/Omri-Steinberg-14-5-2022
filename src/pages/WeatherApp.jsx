import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { getForecastAndCurrWeather, resetError } from "../store/weather/weather.slice"

import { ForecastList } from "../cmps/forecast/ForecastList"
import { SearchBar } from "../cmps/SearchBar"
import { CityDetails } from "../cmps/favorite/CityDetails"
import { Spinner } from '../cmps/layout/Spinner'

export const WeatherApp = () => {


    const { currCity, currWeather, forecasts, isLoading, isError, message } = useSelector(({ weatherModule }) => weatherModule)
    const dispatch = useDispatch()
    const { cityId } = currCity


    useEffect(() => {
        dispatch(getForecastAndCurrWeather(cityId))
    }, [dispatch, cityId])


    useEffect(() => {
        if (!isError) return
        toast.error(message, {
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
            <CityDetails city={currCityWithWeather} />
            <ForecastList forecasts={forecasts} />
        </div>
    )
}