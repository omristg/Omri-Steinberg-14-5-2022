import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cacheService } from './cache.service'
import { weatherService } from './weather.service'

const DEFAULT_CITY = {
    cityId: '215854',
    cityName: 'Tel Aviv',
    countryName: 'Israel',
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

        const { defaultCity, isByDefaultCity } = thunkAPI.getState().weatherModule
        if (isByDefaultCity) cityId = defaultCity.cityId

        const cachedCity = cacheService.getByIdIfValid(cityId)
        if (cachedCity) return cachedCity

        try {
            const [currWeather, forecasts] = await Promise.all([
                weatherService.getCurrConditions(cityId),
                weatherService.getForecast(cityId)
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
        setIsByDefaultCityTrue: (state) => {
            state.isByDefaultCity = true
            state.currCity = { ...state.currCity, ...state.defaultCity }
        },
        setIsByDefaultCityFalse: (state) => {
            state.isByDefaultCity = false
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
            // getForecastAndCurrWeather
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
            // setGeoPositionCity
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
            // getCityOptions
            .addCase(getCityOptions.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCityOptions.fulfilled, (state, action) => {
                state.cityOptions = action.payload
            })
    }
})

export const { setCurrCity, setDefaultCity, setCityOptions, resetError,
    setIsByDefaultCityTrue, setIsByDefaultCityFalse } = weatherSlice.actions

export const setIsByDefaultCity = (boolean) => (dispatch) => {
    if (boolean) dispatch(setIsByDefaultCityTrue())
    else dispatch(setIsByDefaultCityFalse())
}

export default weatherSlice.reducer
