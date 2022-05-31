import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { weatherService } from '../weather/weather.service'
import { favoriteService } from './favorite.service'
import { cacheService } from '../weather/cache.service'
import { toast } from 'react-toastify'

const initialState = {
    favorites: [],
    isLoading: true,
    isError: false,
    message: ''
}

export const getFavorites = createAsyncThunk('favorite/getFavorites',
    async (_, thunkAPI) => {
        const favorites = favoriteService.getFavorites()

        try {
            const favsWithWeather = await Promise.all(
                favorites.map(async (city) => {

                    const cachedCity = cacheService.getByIdIfValid(city.cityId)
                    if (cachedCity) return { ...city, ...cachedCity.weather }

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
        },
        resetError: (state) => {
            state.message = ''
            state.isError = false
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

export const { setFavorites, resetError } = favoriteSlice.actions

export const addFavorite = (city) => (dispatch) => {
    const newFavorites = favoriteService.addFavorite(city)
    dispatch(setFavorites(newFavorites))
    toast.success('City added to favorites!')
}

export const removeFavorite = (cityId) => (dispatch) => {
    const newFavorites = favoriteService.removeFavorite(cityId)
    dispatch(setFavorites(newFavorites))
    toast.success('City removed from favorites!')
}

export const saveFavorites = (favorites) => (dispatch) => {
    favoriteService.saveToStrorage(favorites)
    dispatch(setFavorites(favorites))
}

export default favoriteSlice.reducer
