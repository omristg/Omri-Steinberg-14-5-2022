import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { favoriteService } from '../favorite/favorite.service'
import { weatherService } from './weather.service'


const initialState = {
    currCity: {
        cityId: '215854',
        cityName: 'Tel Aviv',
        countryName: 'Israel',
        isFavorite: false
    },
    isByGeoPosition: true,
    currWeather: null,
    forecasts: [],
    isLoading: true,
    isError: false,
    message: ''
}


export const getForecastAndCurrWeather = createAsyncThunk('weather/getForecastAndWeather',
    async (cityId, thunkAPI) => {
        try {
            const [currWeather, forecasts] = await Promise.all([
                weatherService.getCurrConditions(cityId),
                weatherService.getForecast(cityId)
            ])
            thunkAPI.dispatch(checkIsFavorite(cityId))
            return { currWeather, forecasts }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(msg)
        }
    }
)

export const setGeoPositionCity = createAsyncThunk('weather/setGeoPositionCity',
    async (geoPosition, thunkAPI) => {
        const cityData = await weatherService.getCityByGeoPosition(geoPosition)
        thunkAPI.dispatch(setCurrCity(cityData))
    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurrCity: (state, action) => {
            state.currCity = action.payload
        },
        checkIsFavorite: (state, action) => {
            const cityId = action.payload
            const favorites = favoriteService.getFavorites()
            const isFavorite = favorites.some(favCity => favCity.cityId === cityId)
            if (isFavorite) state.currCity.isFavorite = true
        },
        setIsFavorite: (state, action) => {
            state.currCity.isFavorite = action.payload
        },
        setIsByGeoPosition: (state, action) => {
            state.isByGeoPosition = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getForecastAndCurrWeather.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getForecastAndCurrWeather.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getForecastAndCurrWeather.fulfilled, (state, action) => {
                const { currWeather, forecasts } = action.payload
                state.currWeather = currWeather
                state.forecasts = forecasts
                state.isLoading = false
            })
    }
})

export const { setCurrCity, checkIsFavorite, setIsFavorite, setIsByGeoPosition } = weatherSlice.actions

export default weatherSlice.reducer
