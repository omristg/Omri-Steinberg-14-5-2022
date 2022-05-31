import { useSelector } from "react-redux"
import { preferencesService } from "../../store/preferences/preferences.service"

export const CurrentWeather = ({ city, onNavigate }) => {

    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)
    const { temp, dateString, weatherDesc, icon } = city

    const imgUrl = `https://vortex.accuweather.com/adc2010/images/slate/Icons/${icon}.svg`

    const { getTempToShow, getUnitToShow } = preferencesService

    const formattedTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div className="current-weather" onClick={onNavigate}>
            <div className="img-container">
                <img src={imgUrl} alt={weatherDesc} />
                <div className="date">{formattedTime(dateString)}</div>
            </div>
            <div className="details">
                <div className="weather-desc">{weatherDesc}</div>
                <div className="temp" >{getTempToShow(isMetric, temp)}&deg;{getUnitToShow(isMetric)}</div>
            </div>
        </div>
    )
}