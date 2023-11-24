import { IEventManagerWritable } from "../EventManager";
import { Field, IField } from "./Internal/Field";
import { ICellObject, CellObject } from "./Internal/CellObject";

export interface IContext
{
    get EventManager(): IEventManagerWritable;

    get Field(): IField;

    CreatePacMan(x: number, y: number): ICellObject;
    get PacMan(): ICellObject;

    CreateCoin(x: number, y: number): ICellObject[];
    Coin(): ICellObject[];

    CreateCherry(x: number, y: number): ICellObject;
    get Cherry(): ICellObject;

    CreateGhost(x: number, y: number): ICellObject;
    get Ghost(): ICellObject;
}

// ##############################

export class Context implements IContext
{
    private readonly _eventManager: IEventManagerWritable;
    private readonly _field: IField;
    private _pacMan!: ICellObject;
    public _coin: ICellObject[] = [];
    private _cherry!: ICellObject;
    private _ghost!: ICellObject;

    // ==========================

    public constructor(eventManager: IEventManagerWritable)
    {
        this._eventManager = eventManager;
        this._field = new Field();
    }

    // ===== IContext ==========

    public get EventManager(): IEventManagerWritable
    { return this._eventManager; }

    public get Field(): IField
    { return this._field; }

    public CreatePacMan(x: number, y: number): ICellObject
    {
         this._pacMan = new CellObject(x, y); 
         return this._pacMan;
    }

    public get PacMan(): ICellObject
    { return this._pacMan; }

    public CreateCoin(x: number, y: number): ICellObject[]
    {
        // this._coin = new CellObject(x, y);
        this._coin.push(new CellObject(x, y));
        return this._coin;
    }

    public Coin(): ICellObject[]
    { return this._coin; }

    public CreateCherry(x: number, y: number): ICellObject
    {
        this._cherry = new CellObject(x, y);
        return this._cherry;
    }

    public get Cherry(): ICellObject
    { return this._cherry; }

    public CreateGhost(x: number, y: number): ICellObject
    {
        this._ghost = new CellObject(x, y);
        return this._ghost;
    }

    public get Ghost(): ICellObject
    { return this._ghost; }
}