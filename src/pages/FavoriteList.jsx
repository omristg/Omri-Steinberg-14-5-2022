import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CityDetails } from "../cmps/CityDetails";

import { getFavorites } from "../store/favorite/favorite.slice";

export const FavoriteList = () => {

    const { favorites, isLoading } = useSelector(({ favoriteModule }) => favoriteModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFavorites())
    }, [dispatch])

    if (isLoading) return <div>Loading...</div>
    if (!favorites.length) return <div>No favorites yet...</div>

    return (
        <div className="favorites-list">
            {favorites.map(city =>
                <CityDetails key={city.cityId} city={city} isFavorites={true} />
            )}
        </div>
    )
}