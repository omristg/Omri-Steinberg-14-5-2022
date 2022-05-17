import { useDispatch } from 'react-redux'
import { useConfirm } from '../hooks/useConfirm'

import { CurrentWeather } from './CurrentWeather'
import { addFavorite, removeFavorite } from '../store/favorite/favorite.slice'

import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'


export const CityDetails = ({ city }) => {

    const dispatch = useDispatch()
    const { confirm } = useConfirm();
    const { cityName, countryName, isFavorite, cityId } = city


    const onRemoveFavorite = async () => {
        if (!await confirm('Do you confirm your choice?')) return
        dispatch(removeFavorite(cityId))
    }

    return (
        <div className='city-details'>
            <div className="details-sections">
                <h4>{`${cityName}, ${countryName}`}</h4>
                <div className="favorite-btn">
                    {isFavorite ? (
                        <MdFavorite onClick={onRemoveFavorite} />
                    ) : (
                        <MdOutlineFavoriteBorder onClick={() => dispatch(addFavorite(city))} />
                    )}
                </div>
            </div>
            <CurrentWeather city={city} />
        </div>
    )
}