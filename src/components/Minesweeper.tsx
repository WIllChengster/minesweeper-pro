import React, { useState } from 'react';
import Cell from './Cell';
import './Minesweeper.css'

const Minesweeper = () => {
    const [bombsCoordinates, setBombsCoordinates] = useState<string[]>([]);
    const [bombs, setBombs] = useState<number>(40)
    const [columns, setColumns] = useState<number>(16)
    const [rows, setRows] = useState<number>(16);

    const generateBombs = () => {
        for(let bomb_i = 0; bomb_i < bombs; bomb_i++){
            const bomb_col = Math.floor(Math.random() * columns)
            const bomb_row = Math.floor(Math.random() * rows)

            const bomb_loc = `${bomb_col}-${bomb_row}`

            if(bombsCoordinates.includes(bomb_loc)){
                //if bomb coordinate already exists in bomb_coordiantes array, then decrement bomb_i and continue for loop
                bomb_i --;
                continue;
            }
            setBombsCoordinates( 
                prevState => [...prevState, `${bomb_col}-${bomb_row}`]
            )
            // bombsCoordinates.push(`${bomb_col}-${bomb_row}`);
        }
    }

    const generateCells = () => {
        //generate a 16x16 matrix for game area

        // generateBombs();
        console.log(bombsCoordinates)
        
        const col_map = [...Array(columns)].map( (col_val, col_index) => {
            const row_map = [...Array(rows)].map( (row_val, row_index) => {
                const cell_coordinate = `${col_index}-${row_index}`
                let isBomb = false;
                if( bombsCoordinates.includes(cell_coordinate) ){
                    isBomb = true;
                }
                return(
                    <Cell dig={dig} cell_coordinate={cell_coordinate} isBomb={isBomb} key={cell_coordinate} />
                )
            })

            return (
                <div className="column" key={col_index} >
                    {row_map}
                </div>
            )
        } )

        return(col_map)
        
    }

    const dig = (event:Event, cell_coordinate:String) => {
        console.log(cell_coordinate)
    }

    return(
        <div>
            <h1 className="game-header" >Minesweeper</h1>
            
            <div className="game-container" >
                {generateCells()}
            </div>
        </div>
    )
}

export default Minesweeper;