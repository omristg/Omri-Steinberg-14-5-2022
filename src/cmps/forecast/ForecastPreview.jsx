import { useSelector } from "react-redux"
import { preferencesService } from "../../store/preferences/preferences.service"

export const ForecastPreview = ({ forecast }) => {

    const { Day, Temperature } = forecast
    const { Icon } = Day
    const dateString = forecast.Date
    const imgUrl = `https://vortex.accuweather.com/adc2010/images/slate/Icons/${Icon}.svg`

    const maxTemp = Temperature.Maximum.Value
    const minTemp = Temperature.Minimum.Value

    const { getTempToShow, getUnitToShow } = preferencesService

    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)

    const formattedDate = () => {
        return new Date(dateString).toLocaleDateString('he-IL')
    }

    const shortenedDay = () => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
    }

    return (
        <li className="forecast-preview">
            <div className="img-container">
                <img src={imgUrl} alt={Day.IconPhrase} />
                <div className="day">{shortenedDay()}</div>
            </div>
            <div className="details">
                <div className="weather-desc">
                    <span>{Day.IconPhrase}</span>
                </div>
                <div className="temps">
                    <div >
                        <span className="title">Max:</span>
                        <span>{getTempToShow(isMetric, maxTemp)}&deg;{getUnitToShow(isMetric)}</span>
                    </div>
                    <div >
                        <span className="title">Min:</span>
                        <span>{getTempToShow(isMetric, minTemp)}&deg;{getUnitToShow(isMetric)}</span>
                    </div>
                </div>
                <div className="date">{formattedDate()}</div>
            </div>
        </li>
    )
}