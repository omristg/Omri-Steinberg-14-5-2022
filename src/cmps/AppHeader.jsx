import { NavLink, useNavigate } from "react-router-dom"
import { ReactComponent as AppIcon } from "../assets/img/app-icon.svg"

export const AppHeader = () => {

    const navigate = useNavigate()

    return (
        <div className="app-header">
            <div className="logo" onClick={() => navigate('/')}>
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