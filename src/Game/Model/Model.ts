import { Action } from "../../Common/Action";
import { eDirection } from "../Direction";
import { CmdCreatePacMan } from "./Commands/CmdCreatePacMan";
import { CmdMovePacMan } from "./Commands/CmdMovePacMan";
import { Context, IContext } from "./Context/Context";
import { EventManager, IEventManager, IEventManagerWritable } from "./EventManager";
import { ITurn, ITurnInternal, Turn } from "./Turn";

export interface IModel
{
    get EventManager(): IEventManager;

    Init(): void;
    Update(direction: eDirection): void;
}

// ###################################

export class Model implements IModel
{
    private readonly _eventManager: EventManager;
    private readonly _context: IContext;

    // ================================

    public constructor()
    {
        this._eventManager = new EventManager();
        this._context = new Context(this._eventManager);
    }

    // ================================

    private CreateAndExecuteTurn(onInitTurn: Action<[ITurn]>) : void
    {
        const turn: ITurnInternal = new Turn();
        onInitTurn.Invoke(turn);
        turn.Exec(this._context);
    }

    // ========= IModel ===============

    public get EventManager(): IEventManager
    { return this._eventManager; }

    public Init(): void
    {
        this.CreateAndExecuteTurn(new Action((turn: ITurn) =>
        {
            turn.Push(new CmdCreatePacMan(0, 0));
        },
        this));
    }

    public Update(direction: eDirection): void
    {
        this.CreateAndExecuteTurn(new Action((turn: ITurn) =>
        {
            turn.Push(new CmdMovePacMan(direction));
        },
        this));
    }
}