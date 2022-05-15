import { BsSearch } from 'react-icons/bs'
import { useEffect, useState } from "react"
import { DataList } from './DataList'
import { weatherService } from '../store/forecast/weather.service'
import { useDebounce } from '../hooks/useDebounce'
import { useUpdateEffect } from '../hooks/useUpdateEffect'

export const SearchBar = () => {

    const [searchVal, setSearchVal] = useState('')
    const [cityOptions, setCityOptions] = useState([])
    const [selectedCityIdx, setSelectedCityIdx] = useState(0)
    const debouncedValue = useDebounce(searchVal, 300)

    const handleChange = ({ target: { value } }) => {
        setSearchVal(value)
    }

    useUpdateEffect(() => {
        if (!debouncedValue) setCityOptions([]);
        (async () => {
            const cityOptions = await weatherService.runAutoComplete(debouncedValue)
            setCityOptions(cityOptions)
        })();
    }, [debouncedValue])

    const resetSearch = () => {
        setSearchVal('')
        setCityOptions([])
    }

    const handleKeyPress = (ev) => {
        if (!cityOptions?.length) return
        else if (ev.key === 'Enter') handleEnterPress()
        else if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return

        else if ((ev.key === 'ArrowDown' || ev.key === 'ArrowUp') && selectedCityIdx === null) setSelectedCityIdx(0)
        else if (ev.key === 'ArrowDown' && selectedCityIdx < cityOptions.length - 1) setSelectedCityIdx(selectedCityIdx + 1)
        else if (ev.key === 'ArrowUp' && selectedCityIdx > 0) setSelectedCityIdx(selectedCityIdx - 1)
    }

    const handleEnterPress = () => {
        if (selectedCityIdx === null) return
        dispatchCity(cityOptions[selectedCityIdx])
    }

    useEffect(() => {
        setSelectedCityIdx(0)
    }, [cityOptions])


    const dispatchCity = ({ cityId }) => {
        console.log(cityId);
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
                {!!cityOptions?.length && (
                    <DataList
                        cityOptions={cityOptions}
                        resetSearch={resetSearch}
                        dispatchCity={dispatchCity}
                        selectedCityIdx={selectedCityIdx}
                        setSelectedCityIdx={setSelectedCityIdx}
                    />
                )}
            </div>
        </div>
    )
}