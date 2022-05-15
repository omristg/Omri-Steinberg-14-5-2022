import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './forecast/weather.slice';
import favoriteSlice from './favorite/favorite.slice';

export const store = configureStore({
    reducer: {
        weatherModule: weatherSlice,
        favoriteModule: favoriteSlice,
    },
});
