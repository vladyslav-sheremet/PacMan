export interface ICellObject
{
    get X(): number;
    get Y(): number;

    UpdatePosition(x: number, y: number): void;
    SetPosition(x: number, y: number): void;
}

// ##############################

export class CellObject implements ICellObject
{
    _x: number;
    _y: number;

    // =========================

    public constructor(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    // ===== IPacMan ===========

    public get X(): number
    { return this._x; }

    public get Y(): number
    { return this._y; }

    public UpdatePosition(x: number, y: number): void
    {
        this._x = x;
        this._y = y;
    }

    public SetPosition(x: number, y: number): void
    {
        this._x = x;
        this._y = y;
    }
}