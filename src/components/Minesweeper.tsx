import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './Minesweeper.css';
import { cellData, cellCoordinate } from '../types'

const Minesweeper = () => {
    // const [bombsCoordinates, setBombsCoordinates] = useState<cellCoordinate[]>([]);
    const [bombs, setBombs] = useState<number>(40);
    const [columns, setColumns] = useState<number>(16);
    const [rows, setRows] = useState<number>(16);
    const [cellGrid, setCellGrid] = useState<Array<cellData[]>>([[]]);

    useEffect(() => {
        //create grid on render
        const grid = [];
        for (let i = 0; i < columns; i++) {
            const col = [];
            for (let j = 0; j < rows; j++) {
                const cellPlaceholder: cellData = {
                    isBomb: false,
                    isDug: false,
                    adjacentBombs: 0,
                }
                col.push(cellPlaceholder)
            }
            grid.push(col);
        }
        setCellGrid(grid);
    }, [])

    useEffect(() => {
        //create bombs on render
        generateBombs();
    }, []);

    const generateBombs = () => {
        //add bombs to cellGrid state 
        setCellGrid(prevCellGrid => {

            const newCellGrid = [...prevCellGrid];
            for (let bomb_i = 0; bomb_i < bombs; bomb_i++) {
                const bomb_col = Math.floor(Math.random() * columns)
                const bomb_row = Math.floor(Math.random() * rows)

                if (newCellGrid[bomb_col][bomb_row].isBomb) {
                    //if bomb coordinate already exists in bomb_coordiantes array, then decrement bomb_i and continue for loop
                    bomb_i--;
                    continue;
                } else {
                    newCellGrid[bomb_col][bomb_row].isBomb = true
                }

            }

            return newCellGrid
        })
    };

    const generateCells = () => {
        //return a 16x16 div for game area
        const col_map = cellGrid.map((col_val, col_index) => {
            const row_map = col_val.map((row_val, row_index) => {
                const cell_key = `${col_index} - ${row_index}`;
                let isBomb = false;
                if(row_val.isBomb){
                    isBomb = true;
                }
                const cell_coordiante = {col: col_index, row: row_index}
                return (
                    <Cell cellData={row_val} coordiante={cell_coordiante} dig={dig} isBomb={isBomb} key={cell_key} ></Cell>
                )
            })

            return (
                <div className="column" key={col_index} >
                    {row_map}
                </div>
            )
        })

        return col_map
    };

    const dig = (event: Event, coordinate: cellCoordinate) => {
        const { col: clickedCol, row: clickedRow } = coordinate
        //OnClick handler for digging cells
        const adjacentBombs = getAdjacentBombs(coordinate)
        const clickedCell = cellGrid[clickedCol][clickedRow]

        const clickedCellStatus: cellData = {
            ...clickedCell,
            isDug: true,
            adjacentBombs,
        }

        const initialGrid = [...cellGrid];

        initialGrid[clickedCol][clickedRow] = clickedCellStatus;
        setCellGrid( prevGrid => initialGrid );


    };
    const getAdjacentBombs = (cell_coordiante: cellCoordinate) => {
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

        const perimetersArr:cellCoordinate[] = [
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
        const clickedCell = cellGrid[clickedCol][clickedRow]
        for(let perimeterCoord of perimetersArr){
            const {col: periCol, row: periRow} = perimeterCoord
            let perimeterCell;

            //in case user clicks on a cell adjacent to a boundary
            // i.e. cell 16-16 on a 16x16 grid
            try{
                perimeterCell = cellGrid[periCol][periRow];
            } catch {
                continue;
            }

            if(perimeterCell.isBomb){
                adjacentBombsCount++
            }

        }
        return adjacentBombsCount;

    }

    return (
        <div>
            <h1 className="game-header" >Minesweeper</h1>

            <div className="game-container" >
                {generateCells()}
            </div>
        </div>
    );
};

export default Minesweeper;