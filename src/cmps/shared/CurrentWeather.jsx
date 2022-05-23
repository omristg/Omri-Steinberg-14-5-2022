import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { preferencesService } from "../../store/preferences/preferences.service"

export const CurrentWeather = ({ city, onNavigate }) => {

    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)
    const { temp, dateString, weatherDesc, icon } = city
    const [tempToShow, setTempToShow] = useState(temp)
    const [unitToShow, setUnitToShow] = useState('C')

    const imgUrl = `https://vortex.accuweather.com/adc2010/images/slate/Icons/${icon}.svg`

    const formattedTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    }

    useEffect(() => {
        let newTemp = temp
        if (!isMetric) newTemp = preferencesService.convertToFahrenheit(temp)
        setTempToShow(newTemp)
        setUnitToShow(isMetric ? 'C' : 'F')
    }, [isMetric, temp])


    return (
        <div className="current-weather" onClick={onNavigate}>
            <div className="img-container">
                <img src={imgUrl} alt={weatherDesc} />
                <div className="date">{formattedTime(dateString)}</div>
            </div>
            <div className="details">
                <div className="weather-desc">{weatherDesc}</div>
                <div className="temp" >{tempToShow}&deg;{unitToShow}</div>
            </div>
        </div>
    )
}