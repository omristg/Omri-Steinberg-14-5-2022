import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { preferencesService } from "../../store/preferences/preferences.service"

export const ForecastPreview = ({ forecast }) => {

    const { Day, Temperature } = forecast
    const { Icon } = Day
    const dateString = forecast.Date
    const imgUrl = `https://vortex.accuweather.com/adc2010/images/slate/Icons/${Icon}.svg`

    const maxTemp = Temperature.Maximum.Value
    const minTemp = Temperature.Minimum.Value

    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)

    const [maxTempToShow, setMaxTempToShow] = useState(maxTemp)
    const [minTempToShow, setMinTempToShow] = useState(minTemp)
    const [unitToShow, setUnitToShow] = useState('C')

    useEffect(() => {
        let newMaxTemp = maxTemp
        let newMinTemp = minTemp
        if (!isMetric) {
            newMaxTemp = preferencesService.convertToFahrenheit(maxTemp)
            newMinTemp = preferencesService.convertToFahrenheit(minTemp)
        }
        setMaxTempToShow(newMaxTemp)
        setMinTempToShow(newMinTemp)
        setUnitToShow(isMetric ? 'C' : 'F')
    }, [isMetric, maxTemp, minTemp])

    const formattedDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL')
    }

    const shortenedDay = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
    }

    return (
        <li className="forecast-preview">
            <div className="img-container">
                <img src={imgUrl} alt={Day.IconPhrase} />
                <div className="day">{shortenedDay(dateString)}</div>
            </div>
            <div className="details">
                <div className="weather-desc">
                    <span>{Day.IconPhrase}</span>
                </div>
                <div className="temps">
                    <div >
                        <span className="title">Max:</span>
                        <span>{maxTempToShow}&deg;{unitToShow}</span>
                    </div>
                    <div >
                        <span className="title">Min:</span>
                        <span>{minTempToShow}&deg;{unitToShow}</span>
                    </div>
                </div>
                <div className="date">{formattedDate(dateString)}</div>
            </div>
        </li>
    )
}