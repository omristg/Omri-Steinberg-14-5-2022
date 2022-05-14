import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './forecast/weather.slice';

export const store = configureStore({
    reducer: {
        weatherModule: weatherSlice,
    },
});
