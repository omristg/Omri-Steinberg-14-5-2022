
export const ForecastPreview = ({ forecast }) => {

    const { Day: day, Temperature: temp } = forecast
    const { Icon: icon } = day
    const dateString = forecast.Date
    const imgUrl = `http://vortex.accuweather.com/adc2010/images/slate/icons/${icon}.svg`

    const formattedDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL')
    }

    const shortenedDay = (dateString) => {
        const newDate = new Date(dateString)
        const options = { weekday: 'short' }
        return new Intl.DateTimeFormat('en-US', options).format(newDate)
    }

    const tempUnit = () => {
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
                    <span>{day.IconPhrase}</span>
                </div>
                <div className="temps">
                    <div >
                        <span className="title">Max:</span>
                        <span>{temp.Maximum.Value}  &deg;{tempUnit()}</span>
                    </div>
                    <div >
                        <span className="title">Min:</span>
                        <span>{temp.Minimum.Value}  &deg;{tempUnit()}</span>
                    </div>
                </div>
                <div className="date">{formattedDate(dateString)}</div>
            </div>
        </div>
    )
}