import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getForecastAndCurrWeather } from "../weather/weather.slice";

const initialState = {
    isMetric: true,
    isDarkMode: false,
    isConfirmShown: false,
    confirmText: ''
}

export const toggleIsMetric = createAsyncThunk('preferences/toggleIsMetric',
    async (_, thunkAPI) => {
        const { cityId } = thunkAPI.getState().weatherModule.currCity
        const { isMetric } = thunkAPI.getState().preferencesModule
        thunkAPI.dispatch(setIsMetric(!isMetric))

        try {
            thunkAPI.dispatch(getForecastAndCurrWeather(cityId))
        } catch (err) {
            const msg = err.response?.data?.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(msg)
        }

    })

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        setIsMetric: (state, action) => {
            state.isMetric = action.payload
        },
        toggleIsDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode
        },
        hideConfirm: (state) => {
            state.isConfirmShown = false
            state.confirmText = ''
        },
        showConfirm: (state, action) => {
            state.isConfirmShown = true
            state.confirmText = action.payload
        }
    },
})

export const { setIsMetric, toggleIsDarkMode, showConfirm, hideConfirm } = preferencesSlice.actions

export default preferencesSlice.reducer