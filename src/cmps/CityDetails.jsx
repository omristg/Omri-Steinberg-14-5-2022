import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { CurrentWeather } from './CurrentWeather'
import { addFavorite, removeFavorite } from '../store/favorite/favorite.slice'

export const CityDetails = ({ city, isRenderedByFavorites }) => {

    const dispatch = useDispatch()
    const { cityName, countryName, isFavorite, cityId } = city

    return (
        <div className={isRenderedByFavorites ? 'favorite-preview' : 'city-details'}>
            <div className="details-sections">
                <h4>{`${cityName}, ${countryName}`}</h4>
                <div className="favorite-btn">
                    {isFavorite ? (
                        <MdFavorite onClick={() => dispatch(removeFavorite(cityId))} />
                    ) : (
                        <MdOutlineFavoriteBorder onClick={() => dispatch(addFavorite(city))} />
                    )}
                </div>
            </div>
            <CurrentWeather city={city} />
        </div>
    )
}