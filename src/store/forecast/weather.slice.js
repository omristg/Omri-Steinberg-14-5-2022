import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { weatherService } from './weather.service'

const initialState = {
    currCity: null,
    currGeoLocationCity: null,
    currWeather: null,
    forecasts: [],
    isLoading: false,
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
            return { currWeather, forecasts }
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
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getForecastAndCurrWeather.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getForecastAndCurrWeather.fulfilled, (state, action) => {
                const { currWeather, forecasts } = action.payload
                state.currWeather = currWeather
                state.forecasts = forecasts
                state.isLoading = false

            })
            .addCase(getForecastAndCurrWeather.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { } = weatherSlice.actions

export default weatherSlice.reducer
