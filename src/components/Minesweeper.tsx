import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './Minesweeper.css';
import { cellType } from '../types'

const Minesweeper = () => {
    const [bombsCoordinates, setBombsCoordinates] = useState<cellType[]>([]);
    const [bombs, setBombs] = useState<number>(40);
    const [columns, setColumns] = useState<number>(16);
    const [rows, setRows] = useState<number>(16);

    useEffect( () => {
        generateBombs();
    }, []);

    const generateBombs = () => {
        const initialBombArr: cellType[] = []
        for(let bomb_i = 0; bomb_i < bombs; bomb_i++){
            const bomb_col = Math.floor(Math.random() * columns)
            const bomb_row = Math.floor(Math.random() * rows)

            // const bomb_loc = `${bomb_col}-${bomb_row}`
            const bomb_loc = {col: bomb_col, row: bomb_row};
            
            if(initialBombArr.includes(bomb_loc)){
                //if bomb coordinate already exists in bomb_coordiantes array, then decrement bomb_i and continue for loop
                console.log('found duplicate')
                bomb_i --;
                continue;
            } else {
                initialBombArr.push(bomb_loc)
            }

        }
        setBombsCoordinates(initialBombArr)
    };

    const generateCells = () => {
        //generate a 16x16 matrix for game area        
        const col_map = [...Array(columns)].map( (col_val, col_index) => {
            const row_map = [...Array(rows)].map( (row_val, row_index) => {

                const cell_key = `${col_index}-${row_index}`
                const cell_coordinate = {col: col_index, row: row_index}
                let isBomb = false;
                if( bombsCoordinates.includes(cell_coordinate) ){
                    isBomb = true;
                }
                return(
                    <Cell dig={dig} cell_coordinate={cell_coordinate} isBomb={isBomb} key={cell_key} />
                )
            })

            return (
                <div className="column" key={col_index} >
                    {row_map}
                </div>
            )
        } )

        return(col_map)
        
    };

    const dig = (event:Event, cell_coordinate:cellType) => {
        //OnClick handler for digging cells
        console.log(perimeterCheck(cell_coordinate));
        
    };

    const perimeterCheck = (cell_coordiante:cellType) => {
        const { row: clickedRow, col:clickedCol } = cell_coordiante;
        //will be called when cell is clicked.
        //checks for bombs around cell and returns # of bombs;

        // 0-0 1-0 2-0
        // 0-1 1-1 2-1
        // 0-2 1-2 2-2

        const topLeftCoord = {col: clickedCol - 1, row: clickedRow - 1};
        const topMidCoord = {col: clickedCol, row: clickedRow - 1};
        const topRightCoord = {col: clickedCol + 1, row: clickedRow - 1};

        const midLeftCoord = {col: clickedCol - 1, row: clickedRow};
        const midRightCoord = {col: clickedCol + 1, row: clickedRow};

        const botLeftCoord = {col: clickedCol - 1, row: clickedRow + 1};
        const botMidCoord = {col: clickedCol, row: clickedRow + 1};
        const botRightCoord = {col: clickedCol + 1, row: clickedRow + 1};
        
        const perimetersArr:cellType[] = [
            topLeftCoord, 
            topMidCoord, 
            topRightCoord, 
            midLeftCoord,
            midRightCoord,
            botLeftCoord,
            botMidCoord,
            botRightCoord,
        ]

        let adjacentBombsCount = 0;
        console.log(perimetersArr);
        console.log(bombsCoordinates);
        for(let perimeterCoord of perimetersArr){

            for(let i = 0; i < bombsCoordinates.length; i++){
                if(bombsCoordinates[i].row === perimeterCoord.row && bombsCoordinates[i].col === perimeterCoord.col){
                    adjacentBombsCount++;
                }
            }            
        }
        return adjacentBombsCount;

    }
    return(
        <div>
            <h1 className="game-header" >Minesweeper</h1>
            
            <div className="game-container" >
                {generateCells()}
            </div>
        </div>
    );
};

export default Minesweeper;