import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { weatherService } from '../forecast/weather.service'
import { favoriteService } from './favorite.service'

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
        removeFavorites: (state, action) => {
            const { cityId } = action.payload
            const filteredFavorites = favoriteService.removeFavorite(cityId)
            state = filteredFavorites
        },
        addFavorite: (state, action) => {
            const cityToSave = action.payload
            const newFavorites = favoriteService.addFavorite(cityToSave)
            state = newFavorites
        },
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

export const { addFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer
