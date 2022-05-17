import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

import { setIsBydefaultCity } from "../store/forecast/weather.slice"
import { toggleIsMetric, toggleIsDarkMode } from "../store/preferences/preferences.slice"

import { ReactComponent as AppIcon } from "../assets/img/app-icon.svg"
import { FiMenu } from 'react-icons/fi'
import { DarkModeSwitch } from "./layout/DarkModeSwitch"
import { useState } from "react"
import { Tooltip } from "@mui/material"
import { Backdrop } from "./layout/Backdrop"
import { AnimatePresence } from "framer-motion"

export const AppHeader = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
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

            <AnimatePresence>
                {isMenuOpen && (
                    <Backdrop isClosable={true} handleClose={() => setIsMenuOpen(false)} />
                )}
            </AnimatePresence>

            {!isMenuOpen && (
                <FiMenu className="hamburger" onClick={() => setIsMenuOpen(true)} />
            )}

            <div className={`nav-and-actions ${isMenuOpen && 'open'}`}>
                <nav>
                    <NavLink onClick={() => setIsMenuOpen(false)} to="/">Weather</NavLink>
                    <NavLink onClick={() => setIsMenuOpen(false)} to="/favorites">Favorites</NavLink>
                </nav>
                <div className="preferences">
                    <Tooltip title="Switch between celsius and fahrenheit"
                        enterDelay={400} leaveDelay={0} arrow placement="bottom-start">
                        <div
                            className="metric-btn"
                            onClick={() => dispatch(toggleIsMetric())}
                        >
                            {isMetric ? 'C' : 'F'}&deg;
                        </div>
                    </Tooltip>
                    <DarkModeSwitch handleSwitch={() => dispatch(toggleIsDarkMode())} />
                </div>
            </div>
        </header>
    )
}