import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import { setGeoPositionCity } from "./store/weather/weather.slice"

import { FavoriteList } from "./pages/FavoriteList"
import { WeatherApp } from "./pages/WeatherApp"
import { AppHeader } from "./cmps/AppHeader"
import { ConfirmDialog } from "./cmps/layout/ConfirmDialog"

export const RootCmp = () => {

    const { isDarkMode } = useSelector(({ preferencesModule }) => preferencesModule)
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

    useEffect(() => {
        document.body.classList.toggle('dark-mode')
    }, [isDarkMode])

    return (
        <>
            <Router>
                <AppHeader />
                <Routes>
                    <Route index element={<WeatherApp />} />
                    <Route path="/favorites" element={<FavoriteList />} />
                </Routes>
            </Router>
            <ConfirmDialog />
            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                closeButton={false}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
                pauseOnHover={false}
                toastClassName='toast-override'
            />
        </>
    )

}