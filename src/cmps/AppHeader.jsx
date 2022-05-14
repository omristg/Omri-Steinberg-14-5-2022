import { NavLink } from "react-router-dom"

export const AppHeader = () => {

    return (
        <div className="app-header">
            <div className="logo">Weather App</div>
            <nav>
                <NavLink to="/">Weather</NavLink>
                <NavLink to="/favorites">Favorites</NavLink>
            </nav>
        </div>
    )
}