import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMetric: true,
    isDarkMode: false,
    isConfirmShown: false,
    confirmText: ''
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

export const { toggleIsMetric, toggleIsDarkMode, showConfirm, hideConfirm } = preferencesSlice.actions

export default preferencesSlice.reducer