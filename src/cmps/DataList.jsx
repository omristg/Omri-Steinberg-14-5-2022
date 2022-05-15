import { useState } from 'react'
import { nanoid } from "@reduxjs/toolkit"
import { ClickAwayListener } from '@mui/base';

export const DataList = ({ cityOptions, resetSearch }) => {


    return (
        <ClickAwayListener onClickAway={() => resetSearch()}>
            <div className="data-list">
                {cityOptions.map(city => {
                    const { cityName, countryName } = city
                    return (
                        <div key={nanoid(10)}>{cityName}, {countryName}</div>
                    )
                })}
            </div>
        </ClickAwayListener>
    )
}