import { sub } from "date-fns"

const STORAGE_KEY = 'cache'

export const cacheService = {
    getByIdIfValid,
    upsert
}

function getByIdIfValid(cityId) {
    const cities = _loadFromStorage()
    const city = cities.find(item => item.cityId === cityId)
    if (!city) return null

    const validCacheTime = sub(new Date(), { minutes: 30 })
    if (city.lastReq < validCacheTime) return null
    else return city

}

function upsert(city) {
    const lastReq = Date.now()
    const cities = _loadFromStorage()
    const idx = cities.findIndex(item => item.cityId === city.cityId)
    if (idx === -1) cities.push({ ...city, lastReq })
    else cities.splice(idx, 1, { ...city, lastReq })
    _saveToStorage(cities)
}


function _saveToStorage(citiesToSave) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(citiesToSave))
}

function _loadFromStorage() {
    const jsonVal = localStorage.getItem(STORAGE_KEY)
    if (!jsonVal) return []
    return JSON.parse(jsonVal)
}