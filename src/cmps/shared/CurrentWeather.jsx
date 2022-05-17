
export const CurrentWeather = ({ city, onNavigate }) => {

    const { temp, dateString, weatherDesc, icon, unit } = city
    const imgUrl = `http://vortex.accuweather.com/adc2010/images/slate/Icons/${icon}.svg`

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
                <div className="temp" >{temp}&deg;{unit}</div>
            </div>
        </div>
    )
}