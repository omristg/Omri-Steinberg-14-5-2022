import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getForecastAndCurrWeather, checkIsFavorite, setGeoPositionCity } from "../store/forecast/weather.slice"

import { ForecastList } from "../cmps/ForecastList"
import { SearchBar } from "../cmps/SearchBar"
import { CityDetails } from "../cmps/CityDetails"
import { Spinner } from '../cmps/layout/Spinner'

export const WeatherApp = () => {

    // eslint-disable-next-line
    const { currCity, currWeather, forecasts, isByGeoPosition, isLoading, isError } = useSelector(({ weatherModule }) => weatherModule)
    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)
    const dispatch = useDispatch()
    const { cityId } = currCity


    const onInit = useCallback(() => {
        if (isByGeoPosition) {
            navigator.geolocation.getCurrentPosition((position) => {
                const geoPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                dispatch(setGeoPositionCity(geoPosition))
            })
        }
        dispatch(checkIsFavorite(cityId))
        dispatch(getForecastAndCurrWeather(cityId))
    }, [isByGeoPosition, cityId, dispatch])

    useEffect(() => {
        onInit()
    }, [onInit, isMetric])

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