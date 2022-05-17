import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './weather/weather.slice';
import favoriteSlice from './favorite/favorite.slice';
import preferencesSlice from './preferences/preferences.slice';

export const store = configureStore({
    reducer: {
        weatherModule: weatherSlice,
        favoriteModule: favoriteSlice,
        preferencesModule: preferencesSlice
    },
});
