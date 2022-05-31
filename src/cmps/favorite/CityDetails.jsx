import { useDispatch } from 'react-redux'
import { useConfirm } from '../../hooks/useConfirm'

import { CurrentWeather } from '../shared/CurrentWeather'
import { addFavorite, removeFavorite } from '../../store/favorite/favorite.slice'

import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import { favoriteService } from '../../store/favorite/favorite.service'
import { useState } from 'react'


export const CityDetails = ({ city }) => {

    const { cityName, countryName, cityId } = city
    const [isFavorite, setIsFavorite] = useState(favoriteService.checkIsFavorite(cityId))
    const dispatch = useDispatch()
    const { confirm } = useConfirm();

    const onRemoveFavorite = async () => {
        if (!await confirm('Do you confirm your choice?')) return
        setIsFavorite(false)
        dispatch(removeFavorite(cityId))
    }

    const onAddFavorite = () => {
        setIsFavorite(true)
        dispatch(addFavorite(city))
    }

    return (
        <div className='city-details'>
            <div className="details-sections">
                <h4>{`${cityName}, ${countryName}`}</h4>
                <div className="favorite-btn">
                    {isFavorite ? (
                        <MdFavorite onClick={onRemoveFavorite} />
                    ) : (
                        <MdOutlineFavoriteBorder onClick={onAddFavorite} />
                    )}
                </div>
            </div>
            <CurrentWeather city={city} />
        </div>
    )
}