import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { weatherService } from '../weather/weather.service'
import { favoriteService } from './favorite.service'
import { setDefaultIsFavorite, setIsFavorite } from '../weather/weather.slice'
import { toast } from 'react-toastify'

const initialState = {
    favorites: [],
    isLoading: true,
    isError: false,
    message: ''
}

export const getFavorites = createAsyncThunk('favorite/getFavorites',
    async (_, thunkAPI) => {
        const { isMetric } = thunkAPI.getState().preferencesModule
        const favorites = favoriteService.getFavorites()

        try {
            const favsWithWeather = await Promise.all(
                favorites.map(async (city) => {
                    const weather = await weatherService.getCurrConditions(city.cityId, isMetric)
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
    dispatch(checkIsItDefaultCity(city.cityId, true))
    dispatch(setIsFavorite(true))
    const cityToSave = { ...city, isFavorite: true }
    const newFavorites = favoriteService.addFavorite(cityToSave)
    dispatch(setFavorites(newFavorites))
    toast.success('City added to favorites!')
}

export const removeFavorite = (cityId) => (dispatch) => {
    checkIsItDefaultCity(cityId, false)
    dispatch(setIsFavorite(false))
    const newFavorites = favoriteService.removeFavorite(cityId)
    dispatch(setFavorites(newFavorites))
    toast.success('City removed from favorites!')
}

export const saveFavorites = (favorites) => (dispatch) => {
    favoriteService.saveToStrorage(favorites)
    dispatch(setFavorites(favorites))
}

export const checkIsItDefaultCity = (cityId, action) => (dispatch, getState) => {
    const { defaultCity } = getState().weatherModule
    if (defaultCity.cityId === cityId) dispatch(setDefaultIsFavorite(action))
}

export default favoriteSlice.reducer
