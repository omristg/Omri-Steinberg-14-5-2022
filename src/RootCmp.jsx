import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppHeader } from "./cmps/AppHeader"
import { Favorites } from "./pages/Favorites"
import { WeatherApp } from "./pages/WeatherApp"

export const RootCmp = () => {

    return (
        <Router>
            <AppHeader />
            <Routes>
                <Route index element={<WeatherApp />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </Router>
    )

}