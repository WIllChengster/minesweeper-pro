export interface cellCoordinate {
    row: number
    col: number
}

export interface cellData {
    isBomb: Boolean,
    isDug: Boolean,
    adjacentBombs: number,
}