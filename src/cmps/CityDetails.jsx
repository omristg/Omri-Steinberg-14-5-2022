import { useState } from 'react'
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { CurrentWeather } from './CurrentWeather'
import { addFavorite } from '../store/favorite/favorite.slice'

export const CityDetails = ({ city, isFavorites }) => {

    const [isHoverd, setIsHoverd] = useState(false)
    const [isFavorite, setIsFavorite] = useState(true)
    const dispatch = useDispatch()
    const { cityName, countryName } = city

    return (
        <div className={isFavorite ? 'favorite-preview' : 'city-details'}>
            <div className="details-sections">
                <h4>{`${cityName}, ${countryName}`}</h4>
                <div
                    className="favorite-btn"
                    onClick={() => dispatch(addFavorite(city))}
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
            <CurrentWeather city={city} />
        </div>
    )
}