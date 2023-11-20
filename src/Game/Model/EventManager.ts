import { Event, IEvent } from "../../Common/Event";

export interface IEventManager
{
    get OnCreatePacMan(): IEvent<[x: number, y: number]>;
    get OnUpdatePacManPosition(): IEvent<[x: number, y: number]>;
}

export interface IEventManagerWritable
{
    CreatePacMan(x: number, y: number): void;
    UpdatePacManPosition(x: number, y: number): void;
}

// #######################################

export class EventManager implements IEventManager, IEventManagerWritable
{
    private _onCreatePacMan = new Event<[x: number, y: number]>();
    private _onUpdatePacManPosition = new Event<[x: number, y: number]>();

    // ========= IEventManager ===========

    public get OnCreatePacMan(): IEvent<[x: number, y: number]>
    { return this._onCreatePacMan; }

    public get OnUpdatePacManPosition(): IEvent<[x: number, y: number]>
    { return this._onUpdatePacManPosition; }

    // ======== IEventManagerWritable =====

    public CreatePacMan(x: number, y: number): void
    { this._onCreatePacMan.Invoke(x, y); }

    public UpdatePacManPosition(x: number, y: number): void
    { this._onUpdatePacManPosition.Invoke(x, y); }
}