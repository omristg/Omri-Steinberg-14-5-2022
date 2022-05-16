import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMetric: false,
    isDarkMode: false,

}

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        toggleIsMetric: (state) => {
            state.isMetric = !state.isMetric
        },
        toggleIsDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode
        }
    },
})

export const { toggleIsMetric, toggleIsDarkMode } = preferencesSlice.actions

export default preferencesSlice.reducer