import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppHeader } from "./cmps/AppHeader"
import { FavoriteList } from "./pages/FavoriteList"
import { WeatherApp } from "./pages/WeatherApp"
import { setGeoPositionCity } from "./store/forecast/weather.slice"

export const RootCmp = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const geoPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            dispatch(setGeoPositionCity(geoPosition))
        })
    }, [dispatch])

    return (
        <Router>
            <AppHeader />
            <Routes>
                <Route index element={<WeatherApp />} />
                <Route path="/favorites" element={<FavoriteList />} />
            </Routes>
        </Router>
    )

}