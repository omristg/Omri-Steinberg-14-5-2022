import { useState } from 'react'
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import { CurrentWeather } from './CurrentWeather'

export const CityDetails = ({ currCity }) => {

    const [isHoverd, setIsHoverd] = useState(false)
    const [isFavorite, setIsFavorite] = useState(true)

    const { cityName, countryName } = currCity

    return (
        <div className="city-details">
            <div className="details-sections">
                <h4>{`${cityName}, ${countryName}`}</h4>
                <div
                    className="favorite-btn"
                    onMouseEnter={() => setIsHoverd(true)}
                    onMouseLeave={() => setIsHoverd(false)}
                >
                    {!isFavorite && (
                        isHoverd ? <MdFavorite /> : <MdOutlineFavoriteBorder />
                    )}
                    {isFavorite && (
                        isHoverd ? <MdOutlineFavoriteBorder /> : <MdFavorite />
                    )}
                </div>
            </div>
            <CurrentWeather />
        </div>
    )
}