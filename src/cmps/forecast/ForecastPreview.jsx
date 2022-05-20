import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { preferencesService } from "../../store/preferences/preferences.service"

export const ForecastPreview = ({ forecast }) => {

    const { Day, Temperature } = forecast
    const { Icon } = Day
    const dateString = forecast.Date
    const imgUrl = `https://vortex.accuweather.com/adc2010/images/slate/Icons/${Icon}.svg`

    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)

    const [maxTempToShow, setMaxTempToShow] = useState(Temperature.Maximum.Value)
    const [minTempToShow, setMinTempToShow] = useState(Temperature.Minimum.Value)
    const [unitToShow, setUnitToShow] = useState('C')

    useEffect(() => {
        if (isMetric) return
        const newMaxTemp = preferencesService.convertToFahrenheit(Temperature.Maximum.Value)
        const newMinTemp = preferencesService.convertToFahrenheit(Temperature.Minimum.Value)
        setMaxTempToShow(newMaxTemp)
        setMinTempToShow(newMinTemp)
        setUnitToShow('F')
    }, [isMetric, Temperature])

    const formattedDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL')
    }

    const shortenedDay = (dateString) => {
        const newDate = new Date(dateString)
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(newDate)
    }

    return (
        <div className="forecast-preview">
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
        </div>
    )
}