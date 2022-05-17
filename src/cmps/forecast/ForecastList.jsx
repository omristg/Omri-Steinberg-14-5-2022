import { nanoid } from "@reduxjs/toolkit"
import { ForecastPreview } from "./ForecastPreview"

export const ForecastList = ({ forecasts }) => {

    return (
        <div className="forecast-list">
            {forecasts.map(forecast => (
                <ForecastPreview key={nanoid(10)} forecast={forecast} />
            ))}
        </div>
    )
}