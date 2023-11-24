import { Event, IEvent } from "../../Common/Event";

export interface IEventManager
{
    get OnCreatePacMan(): IEvent<[x: number, y: number]>;
    get OnUpdatePacManPosition(): IEvent<[x: number, y: number]>;

    get OnCreateCoin(): IEvent<[x: number, y: number]>;
    get OnSetCoinPosition(): IEvent<[x: number, y: number]>;

    get OnCreateCherry(): IEvent<[x: number, y: number]>;
    get OnSetCherryPosition(): IEvent<[x: number, y: number]>;

    get OnCreateGhost(): IEvent<[x: number, y: number]>;
    get OnUpdateGhostPosition(): IEvent<[x: number, y: number]>;
}

export interface IEventManagerWritable
{
    CreatePacMan(x: number, y: number): void;
    UpdatePacManPosition(x: number, y: number): void;

    CreateCoin(x: number, y: number, context: any): void;
    SetCoinPosition(x: number, y: number): void;

    CreateCherry(x: number, y: number): void;
    SetCherryPosition(x: number, y: number): void;

    CreateGhost(x: number, y: number): void;
    UpdateGhostPosition(x: number, y: number): void;
}

// #######################################

export class EventManager implements IEventManager, IEventManagerWritable
{
    private _onCreatePacMan = new Event<[x: number, y: number]>();
    private _onUpdatePacManPosition = new Event<[x: number, y: number]>();

    private _onCreateCoin = new Event<[x: number, y: number]>();
    private _onSetCoinPosition = new Event<[x: number, y: number]>();

    private _onCreateCherry = new Event<[x: number, y: number]>();
    private _onSetCherryPosition = new Event<[x: number, y: number]>();

    private _onCreateGhost = new Event<[x: number, y: number]>();
    private _onUpdateGhostPosition = new Event<[x: number, y: number]>();

    // ========= IEventManager ===========

    public get OnCreatePacMan(): IEvent<[x: number, y: number]>
    { return this._onCreatePacMan; }

    public get OnUpdatePacManPosition(): IEvent<[x: number, y: number]>
    { return this._onUpdatePacManPosition; }

    public get OnCreateCoin(): IEvent<[x: number, y: number]>
    { return this._onCreateCoin; }

    public get OnSetCoinPosition(): IEvent<[x: number, y: number]>
    { return this._onSetCoinPosition; }

    public get OnCreateCherry(): IEvent<[x: number, y: number]>
    { return this._onCreateCherry; }

    public get OnSetCherryPosition(): IEvent<[x: number, y: number]>
    { return this._onSetCherryPosition; }

    public get OnCreateGhost(): IEvent<[x: number, y: number]>
    { return this._onCreateGhost; }

    public get OnUpdateGhostPosition(): IEvent<[x: number, y: number]>
    { return this._onUpdateGhostPosition; }

    // ======== IEventManagerWritable =====

    public CreatePacMan(x: number, y: number): void
    { this._onCreatePacMan.Invoke(x, y); }

    public UpdatePacManPosition(x: number, y: number): void
    { this._onUpdatePacManPosition.Invoke(x, y); }

    public CreateCoin(x: number, y: number, context: any): void
    { this._onCreateCoin.Invoke(x, y); }
    // { this._onCreateCoin.Add(() => ({x, y}), context.Coin());
    // console.log(context.Coin())}

    public SetCoinPosition(x: number, y: number): void
    { this._onSetCoinPosition.Invoke(x, y); }
    // { this._onSetCoinPosition.Remove(() => ({x, y})); }

    public CreateCherry(x: number, y: number): void
    { this._onCreateCherry.Invoke(x, y); }

    public SetCherryPosition(x: number, y: number): void
    { this._onSetCherryPosition.Invoke(x, y); }

    public CreateGhost(x: number, y: number): void
    { this._onCreateGhost.Invoke(x, y); }

    public UpdateGhostPosition(x: number, y: number): void
    { this._onUpdateGhostPosition.Invoke(x, y); }
}