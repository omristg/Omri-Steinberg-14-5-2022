import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppHeader } from "./cmps/AppHeader"
import { FavoriteList } from "./pages/FavoriteList"
import { WeatherApp } from "./pages/WeatherApp"

export const RootCmp = () => {

    return (
        <Router>
            <AppHeader />
            <Routes>
                <Route index element={<WeatherApp />} />
                <Route path="/favorites" element={<FavoriteList />} />
            </Routes>
        </Router>
    )

}