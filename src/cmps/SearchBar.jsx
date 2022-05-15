import { BsSearch } from 'react-icons/bs'
import { useEffect, useState } from "react"
import { DataList } from './DataList'
import { weatherService } from '../store/forecast/weather.service'
import { useDebounce } from '../hooks/useDebounce'
import { useUpdateEffect } from '../hooks/useUpdateEffect'

export const SearchBar = () => {

    const [searchVal, setSearchVal] = useState('')
    const [cityOptions, setCityOptions] = useState([])
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

    return (
        <div className="search-bar">
            <div className="container">
                <input className="search-input open" type="text" value={searchVal} onChange={handleChange} />
                <BsSearch className="search-icon" />
                {!!cityOptions?.length && (
                    <DataList cityOptions={cityOptions} resetSearch={resetSearch} />
                )}
            </div>
        </div>
    )
}