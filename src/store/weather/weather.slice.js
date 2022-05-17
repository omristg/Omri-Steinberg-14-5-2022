import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { favoriteService } from '../favorite/favorite.service'
import { cacheService } from './cache.service'
import { weatherService } from './weather.service'

const DEFAULT_CITY = {
    cityId: '215854',
    cityName: 'Tel Aviv',
    countryName: 'Israel',
    isFavorite: false
}

const initialState = {
    currCity: DEFAULT_CITY,
    defaultCity: DEFAULT_CITY,
    isByDefaultCity: true,
    currWeather: null,
    forecasts: [],
    cityOptions: [],
    isLoading: true,
    isError: false,
    message: ''
}


export const getForecastAndCurrWeather = createAsyncThunk('weather/getForecastAndWeather',
    async (cityId, thunkAPI) => {
        const { isMetric } = thunkAPI.getState().preferencesModule
        const { currCity, isByDefaultCity } = thunkAPI.getState().weatherModule
        if (isByDefaultCity) cityId = currCity.cityId


        thunkAPI.dispatch(checkIsFavorite(cityId))
        const cachedCity = cacheService.getByIdIfValid(cityId)
        if (cachedCity) return cachedCity

        try {
            const [currWeather, forecasts] = await Promise.all([
                weatherService.getCurrConditions(cityId, isMetric),
                weatherService.getForecast(cityId, isMetric)
            ])
            const city = { currWeather, forecasts, cityId }
            cacheService.upsert(city)
            return city

        } catch (err) {
            const msg = err.response?.data?.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(msg)
        }
    }
)

export const setGeoPositionCity = createAsyncThunk('weather/setGeoPositionCity',
    async (geoPosition, thunkAPI) => {
        try {
            const geoPosCity = await weatherService.getCityByGeoPosition(geoPosition)
            thunkAPI.dispatch(setDefaultCity(geoPosCity))
            return geoPosCity
        } catch (err) {
            const msg = err.response?.data?.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(msg)
        }

    }
)

export const getCityOptions = createAsyncThunk('weather/getCityOptions',
    async (searchVal, thunkAPI) => {
        try {
            return await weatherService.runAutoComplete(searchVal)
        } catch (err) {
            const msg = err.response?.data?.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(msg)
        }
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
        setIsByDefaultCity: (state, action) => {
            state.isByDefaultCity = action.payload
            if (action.payload) state.currCity = state.defaultCity
        },
        setDefaultCity: (state, action) => {
            state.defaultCity = action.payload
        },
        setCityOptions: (state, action) => {
            state.cityOptions = action.payload
        },
        resetError: (state) => {
            state.isError = false
            state.message = ''
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
            .addCase(setGeoPositionCity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setGeoPositionCity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(setGeoPositionCity.fulfilled, (state, action) => {
                state.currCity = action.payload
                state.isLoading = false
            })
            .addCase(getCityOptions.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCityOptions.fulfilled, (state, action) => {
                state.cityOptions = action.payload
            })
    }
})

export const { setCurrCity, checkIsFavorite, setIsFavorite, setIsByDefaultCity, setDefaultCity, setCityOptions, resetError } = weatherSlice.actions

export default weatherSlice.reducer
