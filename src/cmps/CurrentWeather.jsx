import { useSelector } from "react-redux"

export const CurrentWeather = () => {

    const { currWeather, } = useSelector(({ weatherModule }) => weatherModule)

    const { temp, dateString, weatherDesc, icon, isDayTime } = currWeather
    const imgUrl = `http://vortex.accuweather.com/adc2010/images/slate/Icons/${icon}.svg`

    const formattedTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    }

    const temperatureUnit = () => {
        return 'C'
    }

    return (
        <div className="current-weather">
            <div className="img-container">
                <img src={imgUrl} alt={weatherDesc} />
                <div className="date">{formattedTime(dateString)}</div>
            </div>
            <div className="details">
                <div className="weather-desc">{weatherDesc}</div>
                <div className="temp" >{temp}  &deg;{temperatureUnit()}</div>
            </div>
        </div>
    )
}