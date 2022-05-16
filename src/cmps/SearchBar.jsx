import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { useDebounce } from '../hooks/useDebounce'
import { useUpdateEffect } from '../hooks/useUpdateEffect'

import { weatherService } from '../store/forecast/weather.service'
import { getForecastAndCurrWeather, setCurrCity, setIsBydefaultCity } from '../store/forecast/weather.slice'

import { BsSearch } from 'react-icons/bs'
import { DataList } from './DataList'

export const SearchBar = () => {

    const [searchVal, setSearchVal] = useState('')
    const [cityOptions, setCityOptions] = useState([])
    const [selectedCityIdx, setSelectedCityIdx] = useState(0)
    const [isInvalid, setisInvalid] = useState(false)
    const debouncedValue = useDebounce(searchVal, 200)

    const dispatch = useDispatch()

    const handleChange = ({ target: { value } }) => {
        setSearchVal(value)
    }

    useUpdateEffect(() => {
        if (!debouncedValue) return setCityOptions([]);
        (async () => {
            const cityOptions = await weatherService.runAutoComplete(debouncedValue)
            setCityOptions(cityOptions)
        })();
    }, [debouncedValue])

    useEffect(() => {
        const regex = /^([a-z\s,']*)$/i
        if (regex.test(searchVal)) setisInvalid(false)
        else setisInvalid(true)
    }, [searchVal])

    const resetSearch = () => {
        setSearchVal('')
        setCityOptions([])
    }

    const handleKeyPress = ({ key }) => {
        if (!cityOptions.length) return
        else if (key === 'Enter') handleEnterPress()
        else if (key === 'Escape') setCityOptions([])
        else if (key !== 'ArrowDown' && key !== 'ArrowUp') return

        else if ((key === 'ArrowDown' || key === 'ArrowUp') && selectedCityIdx === null) setSelectedCityIdx(0)
        else if (key === 'ArrowDown' && selectedCityIdx < cityOptions.length - 1) setSelectedCityIdx(selectedCityIdx + 1)
        else if (key === 'ArrowUp' && selectedCityIdx > 0) setSelectedCityIdx(selectedCityIdx - 1)
    }

    const handleEnterPress = () => {
        if (selectedCityIdx === null) return
        dispatchCity(cityOptions[selectedCityIdx])
    }

    useEffect(() => {
        setSelectedCityIdx(0)
    }, [cityOptions])


    const dispatchCity = (city) => {
        if (isInvalid) return
        resetSearch()
        dispatch(setIsBydefaultCity(false))
        dispatch(setCurrCity(city))
        dispatch(getForecastAndCurrWeather(city.cityId))
    }

    return (
        <div className="search-bar">
            <div className="container">
                <input
                    className="search-input open"
                    type="text"
                    value={searchVal}
                    onChange={handleChange}
                    onKeyDownCapture={handleKeyPress}
                />
                <BsSearch className="search-icon" />
                {!!cityOptions.length && (
                    <DataList
                        cityOptions={cityOptions}
                        resetSearch={resetSearch}
                        dispatchCity={dispatchCity}
                        selectedCityIdx={selectedCityIdx}
                        setSelectedCityIdx={setSelectedCityIdx}
                    />
                )}
            </div>
            {isInvalid && (
                <div className="invalid-input-msg">Input text is invalid!</div>
            )}
        </div>
    )
}