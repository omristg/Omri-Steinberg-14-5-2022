import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

import { setIsBydefaultCity } from "../store/forecast/weather.slice"
import { toggleIsMetric, toggleIsDarkMode } from "../store/preferences/preferences.slice"

import { ReactComponent as AppIcon } from "../assets/img/app-icon.svg"

export const AppHeader = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onNavigate = () => {
        dispatch(setIsBydefaultCity(true))
        navigate('/')
    }

    return (
        <div className="app-header">
            <div className="logo-and-nav">
                <div className="logo" onClick={onNavigate}>
                    <AppIcon className="app-icon" />
                    <div>Weather App</div>
                </div>
                <nav>
                    <NavLink to="/">Weather</NavLink>
                    <NavLink to="/favorites">Favorites</NavLink>
                </nav>
            </div>
            <div className="actions">
                <button onClick={() => dispatch(toggleIsMetric())}>Set Metric</button>
                <button onClick={() => dispatch(toggleIsDarkMode())}>Set Dark Mode</button>
            </div>
        </div>
    )
}