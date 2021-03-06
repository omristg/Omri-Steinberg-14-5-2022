import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { useDebounce } from '../hooks/useDebounce'
import { useUpdateEffect } from '../hooks/useUpdateEffect'

import { getForecastAndCurrWeather, setCurrCity, setIsByDefaultCity } from '../store/weather/weather.slice'

import { BsSearch } from 'react-icons/bs'
import { DataList } from './DataList'
import { weatherService } from "../store/weather/weather.service"
import { toast } from "react-toastify"

export const SearchBar = () => {

    const dispatch = useDispatch()

    const [searchVal, setSearchVal] = useState('')
    const [selectedCityIdx, setSelectedCityIdx] = useState(0)
    const [isInvalid, setisInvalid] = useState(false)
    const [cityOptions, setCityOptions] = useState([])
    const debouncedValue = useDebounce(searchVal, 200)


    const handleChange = ({ target: { value } }) => {
        setSearchVal(value)
    }

    useUpdateEffect(() => {
        if (!debouncedValue || isInvalid) return setCityOptions([])
        else getCityOptions()
        async function getCityOptions() {
            try {
                const cityOptions = await weatherService.runAutoComplete(debouncedValue)
                setCityOptions(cityOptions)
            } catch (err) {
                toast.error(err, {
                    hideProgressBar: false,
                    autoClose: 3000
                })
                setCityOptions([])
            }
        }
    }, [debouncedValue])


    useEffect(() => {
        const regex = /^([a-z\s,']*)$/i
        if (regex.test(searchVal)) setisInvalid(false)
        else setisInvalid(true)
    }, [searchVal])

    useEffect(() => {
        setSelectedCityIdx(0)
    }, [cityOptions])

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

    const dispatchCity = (city) => {
        if (isInvalid) return
        resetSearch()
        dispatch(setIsByDefaultCity(false))
        dispatch(setCurrCity(city))
        dispatch(getForecastAndCurrWeather(city.cityId))
    }

    return (
        <div className="search-bar">
            <div className="container">
                <input
                    className="search-input"
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
                {isInvalid && (
                    <div className="invalid-input-msg">Input text is invalid!</div>
                )}
            </div>
        </div>
    )
}