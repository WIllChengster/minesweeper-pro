import React from 'react';
import { cellType } from '../types'

type CellProps = { 
    coordiante: cellType,
    isBomb: Boolean,
    dig: Function
}

const Cell = ({coordiante, isBomb, dig}: CellProps) => {
    
    return (
        <div onClick={(e) => dig(e, coordiante)} className="cell" >
        </div>    
    )
}

export default Cell;