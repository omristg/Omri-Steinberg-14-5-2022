import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CityDetails } from "../cmps/CityDetails";

import { getFavorites } from "../store/favorite/favorite.slice";
import { Spinner } from '../cmps/layout/Spinner'

export const FavoriteList = () => {

    const { favorites, isLoading } = useSelector(({ favoriteModule }) => favoriteModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFavorites())
    }, [dispatch])

    if (isLoading) return <Spinner />
    if (!favorites.length) return <div className="no-favorites">No favorites saved...</div>

    return (
        <div className="favorites-list">
            {favorites.map(city =>
                <CityDetails key={city.cityId} city={city} isRenderedByFavorites={true} />
            )}
        </div>
    )
}