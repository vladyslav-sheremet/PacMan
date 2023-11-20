import { Direction, eDirection } from "../../../Direction";

export interface IField
{
    get Width(): number;
    get Height(): number;

    IsCanMove(x: number, y: number, direction: eDirection): boolean;
}

// ################################

export class Field implements IField
{
    private IsOutOfRange(x: number, y: number)
    { return x < 0 || y < 0 || x >= this.Width || y >= this.Height; }

    // ======= IField ============

    public get Width(): number
    { return 16; }

    public get Height(): number
    { return 12; }

    public IsCanMove(x: number, y: number, direction: eDirection): boolean
    {
        let newPosition = Direction.GetNextPosition(x, y, direction);
        return !this.IsOutOfRange(newPosition.x, newPosition.y);
    }
}