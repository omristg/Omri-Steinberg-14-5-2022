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

    const handleSwitch = () => {
        dispatch(toggleIsDarkMode())
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
                <span onClick={() => dispatch(toggleIsMetric())}>{isMetric ? 'F' : 'C'}</span>
                {/* <button onClick={() => dispatch(toggleIsDarkMode())}>Set Dark Mode</button> */}
                <DarkModeSwitch handleSwitch={handleSwitch} />
            </div>
        </div>
    )
}