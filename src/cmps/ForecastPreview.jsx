
export const ForecastPreview = ({ forecast }) => {

    const { Day, Temperature } = forecast
    const { Icon } = Day
    const dateString = forecast.Date
    const imgUrl = `http://vortex.accuweather.com/adc2010/images/slate/Icons/${Icon}.svg`

    const formattedDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL')
    }

    const shortenedDay = (dateString) => {
        const newDate = new Date(dateString)
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(newDate)
    }

    const temperatureUnit = () => {
        return 'C'
    }

    return (
        <div className="forecast-preview">
            <div className="img-container">
                <img src={imgUrl} alt="" />
                <div className="day">{shortenedDay(dateString)}</div>
            </div>
            <div className="details">
                <div className="weather-desc">
                    <span>{Day.IconPhrase}</span>
                </div>
                <div className="temps">
                    <div >
                        <span className="title">Max:</span>
                        <span>{Temperature.Maximum.Value}  &deg;{temperatureUnit()}</span>
                    </div>
                    <div >
                        <span className="title">Min:</span>
                        <span>{Temperature.Minimum.Value}  &deg;{temperatureUnit()}</span>
                    </div>
                </div>
                <div className="date">{formattedDate(dateString)}</div>
            </div>
        </div>
    )
}