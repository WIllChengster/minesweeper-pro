import React from 'react';

type CellProps = { 
    cell_coordinate: String,
    isBomb: Boolean,
    dig: Function
}

const Cell = ({cell_coordinate, isBomb, dig}: CellProps) => {
    
    return (
        <div onClick={(e) => dig(e, cell_coordinate)} className="cell" >
        </div>    
    )
}

export default Cell;