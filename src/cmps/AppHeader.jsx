import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { setIsByGeoPosition } from "../store/forecast/weather.slice"

import { ReactComponent as AppIcon } from "../assets/img/app-icon.svg"

export const AppHeader = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onNavigate = () => {
        dispatch(setIsByGeoPosition(true))
        navigate('/')
    }

    return (
        <div className="app-header">
            <div className="logo" onClick={onNavigate}>
                <AppIcon className="app-icon" />
                <div>Weather App</div>
            </div>
            <nav>
                <NavLink to="/">Weather</NavLink>
                <NavLink to="/favorites">Favorites</NavLink>
            </nav>
        </div>
    )
}