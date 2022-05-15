const STORAGE_KEY = 'favorites'

export const favoriteService = {
    getFavorites,
    removeFavorite,
    addFavorite
}

function getFavorites() {
    return _loadFromStorage()
}

function removeFavorite(cityId) {
    const favorites = _loadFromStorage()
    const filteredFavorites = favorites.filter(city => city.cityId !== cityId)
    _saveToStrorage(filteredFavorites)
    return filteredFavorites
}

function addFavorite(cityToSave) {
    const favorites = _loadFromStorage()
    favorites.unshift(cityToSave)
    _saveToStrorage(favorites)
    return favorites
}

function _saveToStrorage(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

function _loadFromStorage() {
    const jsonList = localStorage.getItem(STORAGE_KEY)
    if (!jsonList) return []
    return JSON.parse(jsonList)
}