import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { getFavorites, saveFavorites, resetError } from "../store/favorite/favorite.slice";

import { FavoritePreview } from "../cmps/favorite/FavoritePreview";
import { Spinner } from '../cmps/layout/Spinner'
import { toast } from "react-toastify";


export const FavoriteList = () => {

    const { favorites, isLoading, isError, message } = useSelector(({ favoriteModule }) => favoriteModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFavorites())
    }, [dispatch])

    useEffect(() => {
        if (!isError) return
        toast.error(message, {
            hideProgressBar: false,
            autoClose: 3000
        })
        dispatch(resetError())
    }, [dispatch, isError, message])


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