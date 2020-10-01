import React, { useState, useEffect } from 'react';
import { cellCoordinate, cellData } from '../types'

type CellProps = { 
    coordiante: cellCoordinate,
    isBomb: Boolean,
    dig: Function,
    cellData: cellData
}

const Cell = ({coordiante, isBomb, dig, cellData}: CellProps) => {
    const [value, setValue] = useState<number>();

    useEffect( () => {
        if(cellData.isDug){
            console.log("newVal:", cellData.adjacentBombs)
            setValue( cellData.adjacentBombs )
        }
    }, [cellData] )

    const digClass = cellData.isDug ? 'isDug' : ''

    return (
        <div className={`cell ${digClass}`}  onClick={() => dig(coordiante)}>
            {value}
        </div>    
    )
}

export default Cell;