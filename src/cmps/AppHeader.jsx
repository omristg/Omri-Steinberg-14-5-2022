import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

import { setIsBydefaultCity } from "../store/forecast/weather.slice"
import { toggleIsMetric, toggleIsDarkMode } from "../store/preferences/preferences.slice"

import { ReactComponent as AppIcon } from "../assets/img/app-icon.svg"
import { FiMenu } from 'react-icons/fi'
import { DarkModeSwitch } from "./layout/DarkModeSwitch"
import { useState } from "react"

export const AppHeader = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(true)
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
            {isMenuOpen ? (
                <div className="backdrop" onClick={() => setIsMenuOpen(false)}></div>
            ) : (
                <FiMenu className="hamburger" onClick={() => setIsMenuOpen(true)} />
            )}
            <div className={`nav-and-actions ${isMenuOpen && 'open'}`}>
                <nav>
                    <NavLink onClick={() => setIsMenuOpen(false)} to="/">Weather</NavLink>
                    <NavLink onClick={() => setIsMenuOpen(false)} to="/favorites">Favorites</NavLink>
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