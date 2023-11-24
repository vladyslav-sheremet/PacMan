import { Direction, eDirection } from "../../../Direction";

export interface IField
{
    get Width(): number;
    get Height(): number;

    IsCanMove(x: number, y: number, direction: eDirection): boolean;
}

export interface ICoordinate
{
    x: number;
    y: number;
}

// ################################

export class Field implements IField
{
    private readonly horizontalWalls: boolean[][]; // Horizontal walls between rows
    private readonly verticalWalls: boolean[][];   // Vertical walls between columns

    constructor() {
        // Initialize the field with walls (for example)
        this.horizontalWalls = Array.from({ length: this.Width - 1 }, () => Array(this.Height).fill(false));
        this.verticalWalls = Array.from({ length: this.Width }, () => Array(this.Height - 1).fill(false));

        // Set walls
        const horizontalWallsCoordinates: ICoordinate[] = [
            {x: 4, y: 0},
            {x: 5, y: 0},
            {x: 10, y: 0},
            {x: 11, y: 0},
            {x: 6, y: 1},
            {x: 8, y: 1},
            {x: 6, y: 3},
            {x: 7, y: 3},
            {x: 8, y: 3},
            {x: 2, y: 4},
            {x: 3, y: 4},
            {x: 7, y: 4},
            {x: 8, y: 4},
            {x: 12, y: 4},
            {x: 13, y: 4},
            {x: 2, y: 6},
            {x: 3, y: 6},
            {x: 5, y: 6},
            {x: 6, y: 6},
            {x: 9, y: 6},
            {x: 10, y: 6},
            {x: 12, y: 6},
            {x: 13, y: 6},
            {x: 3, y: 9},
            {x: 4, y: 9},
            {x: 5, y: 9},
            {x: 6, y: 9},
            {x: 9, y: 9},
            {x: 10, y: 9},
            {x: 11, y: 9},
            {x: 12, y: 9},
        ];

        const verticalWallsCoordinates: ICoordinate[] = [
            {x: 2, y: 1},
            {x: 2, y: 2},
            {x: 2, y: 3},
            {x: 2, y: 4},
            {x: 3, y: 1},
            {x: 3, y: 2},
            {x: 3, y: 7},
            {x: 3, y: 8},
            {x: 4, y: 4},
            {x: 4, y: 5},
            {x: 4, y: 8},
            {x: 4, y: 9},
            {x: 5, y: 2},
            {x: 5, y: 3},
            {x: 7, y: 5},
            {x: 7, y: 6},
            {x: 7, y: 7},
            {x: 8, y: 2},
            {x: 8, y: 3},
            {x: 10, y: 4},
            {x: 10, y: 5},
            {x: 10, y: 8},
            {x: 10, y: 9},
            {x: 11, y: 1},
            {x: 11, y: 2},
            {x: 11, y: 7},
            {x: 11, y: 8},
            {x: 12, y: 1},
            {x: 12, y: 2},
            {x: 12, y: 3},
            {x: 12, y: 4},
        ];

        horizontalWallsCoordinates.forEach((i: ICoordinate) => {
            this.horizontalWalls[i.x][i.y] = true;
        })

        verticalWallsCoordinates.forEach((i: ICoordinate) => {
            this.verticalWalls[i.x][i.y] = true;
        })
    }
    private IsOutOfRange(x: number, y: number)
    { return x < 0 || y < 0 || x >= this.Width || y >= this.Height; }

    private HasHorizontalWall(x: number, y: number): boolean {
        // Check if there is a horizontal wall below the specified position
        return this.horizontalWalls[x] && this.horizontalWalls[x][y];
    }

    private HasVerticalWall(x: number, y: number): boolean {
        // Check if there is a vertical wall to the right of the specified position
        return this.verticalWalls[x] && this.verticalWalls[x][y];
    }

    // ======= IField ============

    public get Width(): number
    { return 16; }

    public get Height(): number
    { return 12; }

    public IsCanMove(x: number, y: number, direction: eDirection): boolean {
        let newPosition = Direction.GetNextPosition(x, y, direction);

        // Check if the new position is out of range or has a wall in the movement direction
        switch (direction) {
            case eDirection.UP:
                return !this.IsOutOfRange(newPosition.x, newPosition.y) && !this.HasHorizontalWall(newPosition.x, newPosition.y);
            case eDirection.DOWN:
                return !this.IsOutOfRange(newPosition.x, newPosition.y) && !this.HasHorizontalWall(x, y);
            case eDirection.LEFT:
                return !this.IsOutOfRange(newPosition.x, newPosition.y) && !this.HasVerticalWall(newPosition.x, newPosition.y);
            case eDirection.RIGHT:
                return !this.IsOutOfRange(newPosition.x, newPosition.y) && !this.HasVerticalWall(x, y);
            default:
                return false;
        }
    }
}