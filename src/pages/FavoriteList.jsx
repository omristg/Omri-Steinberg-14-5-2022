import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { getFavorites, saveFavorites } from "../store/favorite/favorite.slice";

import { FavoritePreview } from "../cmps/favorite/FavoritePreview";
import { Spinner } from '../cmps/layout/Spinner'


export const FavoriteList = () => {

    const { favorites, isLoading } = useSelector(({ favoriteModule }) => favoriteModule)
    const { isMetric } = useSelector(({ preferencesModule }) => preferencesModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFavorites())
    }, [dispatch, isMetric])

    const handleDrag = (ev) => {
        const newFavorites = [...favorites]
        const [srcItem] = newFavorites.splice(ev.source.index, 1)
        newFavorites.splice(ev.destination.index, 0, srcItem)
        dispatch(saveFavorites(newFavorites))
    }

    if (isLoading) return <Spinner />
    if (!favorites.length) return <div className="no-favorites">No favorites saved...</div>

    return (
        <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId="favorite-list">
                {(provided) => (
                    <ul className="favorites-list"
                        {...provided.droppableProps} ref={provided.innerRef}
                    >
                        {favorites.map((city, idx) =>
                            <FavoritePreview key={city.cityId} city={city} idx={idx} />
                        )}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}