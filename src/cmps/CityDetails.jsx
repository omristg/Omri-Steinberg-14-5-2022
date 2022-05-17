import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { CurrentWeather } from './CurrentWeather'
import { addFavorite, removeFavorite } from '../store/favorite/favorite.slice'
import { setCurrCity, setIsBydefaultCity } from '../store/forecast/weather.slice'

import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import { toast } from 'react-toastify'

export const CityDetails = ({ city, isRenderedByFavorites }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cityName, countryName, isFavorite, cityId } = city

    const onNavigate = () => {
        if (!isRenderedByFavorites) return
        dispatch(setIsBydefaultCity(false))
        dispatch(setCurrCity(city))
        // toast.error(message)
        navigate('/')
    }

    const onAddFavorite = () => {
        dispatch(addFavorite(city))
        toast.success('City added to favorites!')
    }

    const onRemoveFavorite = () => {
        dispatch(removeFavorite(cityId))
        toast.success('City removed to favorites!')
    }

    return (
        <div className={isRenderedByFavorites ? 'favorite-preview' : 'city-details'}>
            <div className="details-sections">
                <h4 onClick={onNavigate}>{`${cityName}, ${countryName}`}</h4>
                <div className="favorite-btn">
                    {isFavorite ? (
                        <MdFavorite onClick={onRemoveFavorite} />
                    ) : (
                        <MdOutlineFavoriteBorder onClick={onAddFavorite} />
                    )}
                </div>
            </div>
            <CurrentWeather city={city} onNavigate={onNavigate} />
        </div>
    )
}