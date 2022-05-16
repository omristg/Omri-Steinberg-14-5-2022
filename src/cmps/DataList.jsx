import { nanoid } from "@reduxjs/toolkit"
import { ClickAwayListener } from '@mui/base';

export const DataList = ({ cityOptions, resetSearch, selectedCityIdx, setSelectedCityIdx, dispatchCity }) => {


    return (
        <ClickAwayListener onClickAway={() => resetSearch()}>
            <div className="data-list">
                {cityOptions.map((city, idx) => {
                    const { cityName, countryName } = city
                    return (
                        <div
                            className={selectedCityIdx === idx ? 'selected' : ''}
                            key={nanoid(5)}
                            onClick={() => dispatchCity(city)}
                            onMouseOver={() => setSelectedCityIdx(null)}
                        >{cityName}, {countryName}</div>
                    )
                })}
            </div>
        </ClickAwayListener>
    )
}