import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

import { setIsBydefaultCity } from "../store/forecast/weather.slice"
import { toggleIsMetric, toggleIsDarkMode } from "../store/preferences/preferences.slice"

import { ReactComponent as AppIcon } from "../assets/img/app-icon.svg"
import { DarkModeSwitch } from "./layout/DarkModeSwitch"

export const AppHeader = () => {

    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onNavigate = () => {
        dispatch(setIsBydefaultCity(true))
        navigate('/')
    }

    return (
        <header className="app-header">
            <div className="logo" onClick={onNavigate}>
                <AppIcon className="app-icon" />
                <div>Weather App</div>
            </div>
            <div className="nav-and-actions">
                <nav>
                    <NavLink to="/">Weather</NavLink>
                    <NavLink to="/favorites">Favorites</NavLink>
                </nav>
                <div className="preferences">
                    <div
                        className="metric-btn"
                        onClick={() => dispatch(toggleIsMetric())}
                    >
                        {isMetric ? 'C' : 'F'}&deg;
                    </div>
                    <DarkModeSwitch handleSwitch={() => dispatch(toggleIsDarkMode())} />
                </div>
            </div>
        </header>
    )
}