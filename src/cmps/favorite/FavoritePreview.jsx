import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useConfirm } from '../../hooks/useConfirm'

import { CurrentWeather } from '../shared/CurrentWeather'
import { removeFavorite } from '../../store/favorite/favorite.slice'
import { setCurrCity, setIsByDefaultCity } from '../../store/weather/weather.slice'

import { MdFavorite } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

export const FavoritePreview = ({ city, idx }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { confirm } = useConfirm();
    const { cityName, countryName, cityId } = city
    console.log(city);

    const onNavigate = () => {
        dispatch(setIsByDefaultCity(false))
        dispatch(setCurrCity(city))
        navigate('/')
    }

    const onRemoveFavorite = async () => {
        if (!await confirm('Are you sure you want to delete this?')) return
        dispatch(removeFavorite(cityId))
    }

    return (
        <Draggable draggableId={cityId} index={idx} key={cityId}>
            {(provider) => (
                <div className='favorite-preview'
                    ref={provider.innerRef}
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                >
                    <div className="details-sections">
                        <h4 onClick={onNavigate}>{`${cityName}, ${countryName}`}</h4>
                        <div className="favorite-btn">
                            <MdFavorite onClick={onRemoveFavorite} />
                        </div>
                    </div>
                    <CurrentWeather city={city} onNavigate={onNavigate} />
                </div>
            )}
        </Draggable>
    )
}