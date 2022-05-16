import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { weatherService } from '../forecast/weather.service'
import { favoriteService } from './favorite.service'
import { setIsFavorite } from '../forecast/weather.slice'

const initialState = {
    favorites: [],
    isLoading: true,
    isError: false,
    message: ''
}

export const getFavorites = createAsyncThunk('favorite/getFavorites',
    async (_, thunkAPI) => {
        try {
            const favorites = favoriteService.getFavorites()
            const favsWithWeather = await Promise.all(
                favorites.map(async (city) => {
                    const weather = await weatherService.getCurrConditions(city.cityId)
                    return { ...city, ...weather }
                })
            )
            return favsWithWeather
        } catch (err) {
            const msg = err.response?.data?.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(msg)
        }
    }
)


export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFavorites.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.message = action.payload
                state.isLoading = false
                state.isError = true
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload
                state.isLoading = false
            })
    }
})

export const { setFavorites } = favoriteSlice.actions

export const addFavorite = (city) => (dispatch) => {
    dispatch(setIsFavorite(true))
    const cityToSave = { ...city, isFavorite: true }
    const newFavorites = favoriteService.addFavorite(cityToSave)
    dispatch(setFavorites(newFavorites))
}

export const removeFavorite = (cityId) => (dispatch) => {
    dispatch(setIsFavorite(false))
    const newFavorites = favoriteService.removeFavorite(cityId)
    dispatch(setFavorites(newFavorites))
}


export default favoriteSlice.reducer
